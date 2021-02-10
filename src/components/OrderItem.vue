<template lang="pug">
  li.order
    router-link(:to="link").order__img
      img(:src="image")
    div(v-if="orderItem").order__content
      span(v-if="date").order__date {{date | dateFormat('DD MMMM YYYY')}}
      router-link(:to="link").order__title {{orderItem.title | truncate(45)}}
      .order__info
        OrderStatus(:order="order").order__status
        OrderTimer(v-if="isGroup" :time="orderItem.time")
      span.order__box
        include ../assets/icons/group-button.svg
        span.order__price {{divideNumberWithSpaces(orderItem.selfPrice)}} ₽
        router-link(:to="link" v-if="!hideButton").button.order__button {{buttonText}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import OrderTimer from '@/components/OrderTimer.vue';
import OrderStatus from '@/components/OrderStatus.vue';

import { divideNumberWithSpaces } from '@/utils/common';
import { OrderData } from '@/models/order';
import { Product } from '@/models/product';

@Component({
  components: {
    OrderTimer,
    OrderStatus,
  },
})
export default class OrderItem extends Vue {
  @Prop() public order!: OrderData;

  @Prop() public link!: string;

  @Prop() public buttonText!: string;

  @Prop() public isGroup!: boolean;

  @Prop() public hideButton!: boolean;

  get orderItem(): Product | null {
    return (this.order && this.order.orderItems && this.order.orderItems.length) ? this.order.orderItems[0].product : null;
  }

  get image(): string | null {
    return (this.orderItem && this.orderItem) ? this.orderItem.images.preview : null;
  }

  get date() {
    const date = this.order && this.order.order && this.order.order.created_at;
    return date && new Date(date);
  }

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

    @include laptop() {
      min-height: 200px;
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
      display: flex;
    }

    &__img {
      margin-right: 16px;
      width: 90px;
      height: auto;
      flex-shrink: 0;
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
      @include link();
      @include laptop() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
      }
    }

    &__status {
      margin-bottom: 13px;
      display: block;

      @include laptop() {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }

    &__box {
      display: flex;

      svg {
        display: none;
      }

      @include laptop() {
        min-height: 40px;
        align-items: center;
        margin-top: 20px;

        svg {
          display: block;
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
      color: $blue;
      font-size: 14px;
      font-weight: 600;

      @include laptop() {
        font-size: 24px;
        color: $black-1;
        vertical-align: middle;
        margin-right: 32px;
        position: relative;
      }
    }

    &__button {
      display: none;
      @include laptop() {
        display: block;
        font-size: 14px;
        font-weight: bold;
        padding: 9px 10px 12px;
        border-radius: 4px;
      }
    }

  }
</style>
