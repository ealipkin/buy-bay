<template lang="pug">
  span
    template(v-if="isGroup")
      span(v-if="time && users.length < maxUsers").order-status
        img(v-for="user in users" :src="user.avatar").order-status__img
        span участников: {{users.length}} из {{maxUsers}}

      span(v-if="time && users.length >= maxUsers").order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span Группа сформирована {{optionalText}}

      span(v-if="!time").order-status.order-status--fail
        img(src="@/assets/icons/fail.svg").order-status__img
        span Группа не сформирована {{optionalText}}

    template(v-else)
      span(v-if="status === orderStatuses.FULFILL").order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span Группа сформирована

      span(v-else-if="status === orderStatuses.PREPARED").order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span Заказ передан {{optionalText || 'продавцу'}}

      span(v-else-if="status === orderStatuses.SEND").order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span Заказ отправлен {{optionalText || 'продавцом'}}

      span(v-else-if="status === orderStatuses.CANCELLED").order-status.order-status--fail
        img(src="@/assets/icons/fail.svg").order-status__img
        span Заказ отменён {{optionalText || 'продавцом'}}

      span(v-else-if="status === orderStatuses.CANCELLED_BY_CUSTOMER").order-status.order-status--fail
        img(src="@/assets/icons/fail.svg").order-status__img
        span Заказ отменён {{optionalText || 'покупателем'}}

      span(v-else-if="status === orderStatuses.DELIVERED").order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span Заказ доставлен

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ORDER_STATUSES, OrderUser } from '@/utils/models';

@Component
export default class OrderStatus extends Vue {
  @Prop() public users!: OrderUser[];

  @Prop() public status!: string;

  @Prop() public maxUsers!: number;

  @Prop() public optionalText!: string;

  @Prop() public time!: string;

  @Prop() public isGroup!: string;

  orderStatuses = ORDER_STATUSES;
}
</script>

<style lang="scss">
  .order-status {
    font-size: 12px;
    color: $grey-2;
    display: flex;
    align-items: center;

    &--big {
      font-size: 14px;
    }

    @include laptop() {
      display: inline-flex;
      min-height: 24px;
      vertical-align: middle;
      font-size: 14px;
    }

    &--fail {
      color: $red-1;
      font-weight: bold;
    }

    &--success {
      color: $green-1;
      font-weight: bold;
    }

    &__img {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: -9px;
      position: relative;
      z-index: 2;

      &:nth-of-type(2) {
        z-index: 1;
      }

      &:last-of-type {
        margin-right: 8px;
        z-index: 0;
      }

      @include laptop() {
        width: 24px;
        height: 24px;

        &:last-of-type {
          margin-right: 16px;
        }
      }
    }

    &--big & {
      &__img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
