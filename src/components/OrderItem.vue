<template lang="pug">
  li.order
    router-link(:to="link").order__img
      img(:src="order.image")
    div.order__content
      span.order__date {{order.date}}
      router-link(:to="link").order__title {{order.title | truncate(45)}}
      .order__info
        OrderStatus(:users="order.users" :status="order.status" :maxUsers="order.maxUsers" :time="order.time" :isGroup="isGroup").order__status
        OrderTimer(v-if="isGroup" :time="order.time")
      span.order__box
        include ../assets/icons/group-button.svg
        span.order__price {{divideNumberWithSpaces(order.price)}} ₽
        router-link(:to="link").button {{buttonText}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import OrderTimer from '@/components/OrderTimer.vue';
import OrderStatus from '@/components/OrderStatus.vue';

import { divideNumberWithSpaces } from '@/utils/common';
import { ORDER_STATUSES } from '@/utils/models';

@Component({
  components: {
    OrderTimer,
    OrderStatus,
  },
})
export default class OrderItem extends Vue {
  @Prop() public order!: object;

  @Prop() public link!: string;

  @Prop() public buttonText!: string;

  @Prop() public isGroup!: boolean;

  ORDER_STATUSES = ORDER_STATUSES;

  divideNumberWithSpaces(number) {
    return divideNumberWithSpaces(number);
  }
}
</script>

<style lang="scss">
  .order {
    display: flex;
    padding-bottom: 28px;
    border-bottom: 1px solid $grey-4;
    min-height: 200px;

    @include laptop() {
      padding-bottom: 0;
      border-bottom: 0;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      overflow: hidden;
      max-width: 100%;
    }

    &__link {
      display: block;
    }

    &__info {
      min-height: 28px;
    }

    &__img {
      margin-right: 16px;
      width: 90px;
      height: auto;
      display: block;

      @include laptop() {
        width: 200px;
        margin-right: 35px;
      }

      img {
        max-width: 100%;
        display: block;
      }
    }

    &__content {
      padding-right: 28px;

      @include laptop() {
        padding: 18px 20px 0 0;
      }
    }

    &__date {
      display: none;

      @include laptop() {
        display: block;
        font-size: 14px;
        color: $grey-2;
        margin-bottom: 12px;
      }
    }

    &__title {
      font-size: 14px;
      color: $black-1;
      margin: 0;
      margin-bottom: 7px;
      font-weight: 600;
      text-decoration: none;
      display: block;

      @include laptop() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
      }
    }

    &__status {
      margin-bottom: 13px;

      @include laptop() {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }

    &__box {
      display: none;

      @include laptop() {
        min-height: 40px;
        display: flex;
        align-items: center;
        margin-top: 20px;

        svg {
          opacity: 0.4;
          color: #341c05;
          width: 20px;
          height: 16px;
          margin-right: 10px;
          vertical-align: middle;

          path {
            color: #341c05;
          }
        }
      }
    }

    &__price {
      @include laptop() {
        font-size: 24px;
        color: $black-1;
        font-weight: 600;
        vertical-align: middle;
        margin-right: 32px;
        position: relative;
      }
    }

    &__button {
      @include laptop() {
        font-size: 14px;
        font-weight: bold;
        padding: 9px 10px 12px;
        border-radius: 4px;
      }
    }
  }
</style>
