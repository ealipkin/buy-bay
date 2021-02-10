<template lang="pug">
  span(v-if="order")
    template
      span(v-if="order.order_status.id === orderStatuses.IN_PROCESS").order-status.order-status--fail
        img(src="@/assets/icons/fail.svg").order-status__img
        span {{order.order_status.title}}
      span(v-else-if="order.order_status.id === orderStatuses.PAYMENT_WAITING").order-status.order-status--fail
        img(src="@/assets/icons/fail.svg").order-status__img
        span {{order.order_status.title}}
      span(v-else).order-status.order-status--success
        img(src="@/assets/icons/success.svg").order-status__img
        span {{order.order_status.title}}
    //template
      template(v-if="isGroup")
        span(v-if="time && users.length < maxUsers").order-status
          .order-status__images
            img(v-for="user in reversedUsers" :src="user.avatar").order-status__img.order-status__img--avatar
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
import { OrderUser } from '@/models/models';
import { ORDER_STATUSES } from '@/models/enums';
import { OrderData } from '@/models/order';

@Component
export default class OrderStatus extends Vue {
  @Prop() public order!: OrderData;

  orderStatuses = ORDER_STATUSES;
  //
  // get reversedUsers() {
  //   return this.users && this.users.slice().reverse();
  // }
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

    &__images {
      display: flex;
      flex-direction: row-reverse;

      @include laptop() {
        margin-right: 26px;
      }
    }

    &__img {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 8px;
      position: relative;
      z-index: 2;

      &--avatar {
        margin-right: -9px;
      }

      @include laptop() {
        width: 24px;
        height: 24px;
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
