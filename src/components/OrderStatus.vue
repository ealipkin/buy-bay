<template lang="pug">
  span(v-if="status === ORDER_STATUSES.PENDING").order-status
    img(v-for="user in users" :src="user.avatar").order-status__img
    span участников: {{users.length}} из {{maxUsers}}

  span(v-else-if="status === ORDER_STATUSES.SUCCESS").order-status.order-status--success
    img(src="@/assets/icons/success.svg").order-status__img
    span Заказ доставлен

  span(v-else-if="status === ORDER_STATUSES.SEND").order-status.order-status--success
    img(src="@/assets/icons/success.svg").order-status__img
    span Заказ отправлен

  span(v-else-if="status === ORDER_STATUSES.FULFILL").order-status.order-status--success
    img(src="@/assets/icons/success.svg").order-status__img
    span Группа сформирована

  span(v-else-if="status === ORDER_STATUSES.REJECT").order-status.order-status--fail
    img(src="@/assets/icons/fail.svg").order-status__img
    span Заказ отменен

  span(v-else).order-status.order-status--fail
    img(src="@/assets/icons/fail.svg").order-status__img
    span Группа не сформирована
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ORDER_STATUSES } from '@/utils/models';

@Component
export default class OrderStatus extends Vue {
  @Prop() public users!: object[];

  @Prop() public status!: string;

  @Prop() public maxUsers!: number;

  ORDER_STATUSES = ORDER_STATUSES;
}
</script>

<style lang="scss">
  .order-status{
    font-size: 12px;
    color: $grey-2;
    display: flex;
    align-items: center;

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
  }
</style>
