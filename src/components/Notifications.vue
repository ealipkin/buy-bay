<template lang="pug">
  div(v-if="unreadNotifications.length || readNotifications.length").notifications
    .notifications__header Уведомления
    .notifications__inner
      ul(v-if="unreadNotifications && unreadNotifications.length").notifications__list
        li(v-for="item in unreadNotifications")
          router-link(:to="`/${item.link}?notification=${item.id}`").notifications__item.notifications__item--link
            span.notifications__icon
              template(v-if="item.code === NOTIFICATIONS_TYPES.MESSAGE")
                include ../assets/icons/mail.svg
              template(v-if="item.code === NOTIFICATIONS_TYPES.GROUP")
                include ../assets/icons/check.svg
              template(v-if="item.code === NOTIFICATIONS_TYPES.DELIVERY")
                include ../assets/icons/delivery.svg
            span.notifications__info
              span.notifications__title {{item.title}}
              span.notifications__text {{item.text}}
      template(v-if="readNotifications && readNotifications.length")
        .notifications__divider прочитанные уведомления
      ul(v-if="readNotifications && readNotifications.length").notifications__list
        li(v-for="item in readNotifications").notifications__item
          span.notifications__icon
            template(v-if="item.code === NOTIFICATIONS_TYPES.MESSAGE")
              include ../assets/icons/mail.svg
            template(v-if="item.code === NOTIFICATIONS_TYPES.GROUP")
              include ../assets/icons/check.svg
            template(v-if="item.code === NOTIFICATIONS_TYPES.DELIVERY")
              include ../assets/icons/delivery.svg
          span.notifications__info
            span.notifications__title {{item.title}}
            span.notifications__text {{item.text}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NOTIFICATIONS_TYPES } from '@/models/enums';
import { NotificationItem } from '@/models/models';

@Component
export default class Notifications extends Vue {
  @Prop() public readNotifications!: NotificationItem[];

  @Prop() public unreadNotifications!: NotificationItem[];

  NOTIFICATIONS_TYPES = NOTIFICATIONS_TYPES;
}
</script>

<style scoped lang="scss">
  .notifications {
    width: 377px;
    box-sizing: border-box;
    text-align: left;

    &__inner {
      max-height: 500px;
      overflow: auto;
    }

    &__header {
      font-size: 16px;
      font-weight: bold;
      color: #222222;
      box-shadow: inset 0 -1px 0 0 #dfdfdf;
      padding: 12px 23px 16px;
    }

    &__item {
      display: flex;
      padding: 13px 23px 17px;
      box-shadow: inset 0 -1px 0 0 #ece7e7;
      align-items: center;
      color: black;
      text-decoration: none;

      &--link:hover {
        background-color: #f7f7fa;
      }
    }

    &__list:last-child &__item:last-child {
      box-shadow: none;
    }

    &__icon {
      min-width: 32px;
      max-width: 35px;
    }

    &__list {
      @include clearList();
    }

    &__icon {
      margin-right: 26px;
    }

    &__title {
      display: block;
      margin-bottom: 2px;
      font-size: 14px;
      color: #222222;
    }

    &__divider {
      background-color: #f7f7fa;
      font-size: 12px;
      color: #7b8197;
      padding: 6px 1px 9px 24px;
    }

    &__text {
      font-size: 14px;
      color: #7b8197;
    }
  }
</style>
