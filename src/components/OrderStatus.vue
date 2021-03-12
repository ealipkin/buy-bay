<template lang="pug">
  span(v-if="order")
    template
      span(:class="{'order-status--fail': status.is_bad, 'order-status--success': !status.is_bad}").order-status
        img(v-if="status.is_bad" src="@/assets/icons/fail.svg").order-status__img
        img(v-if="!status.is_bad" src="@/assets/icons/success.svg").order-status__img
        span {{status.title}}
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

  get status() {
    return this.order && this.order.group ? this.order.group.group_status : this.order.order_status;
  }
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
