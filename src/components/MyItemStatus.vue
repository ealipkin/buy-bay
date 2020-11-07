<template lang="pug">
  span(v-if="status === ORDER_STATUSES.PENDING").item-status
    img(v-for="user in users" :src="user.avatar").item-status__img
    span участников: {{users.length}} из {{maxUsers}}

  span(v-else-if="status === ORDER_STATUSES.SUCCESS").item-status.item-status--success
    img(src="@/assets/icons/my-success.svg").item-status__img
    span Заказ доставлен

  span(v-else-if="status === ORDER_STATUSES.SEND").item-status.item-status--success
    img(src="@/assets/icons/my-success.svg").item-status__img
    span Заказ отправлен

  span(v-else-if="status === ORDER_STATUSES.FULFILL").item-status.item-status--success
    img(src="@/assets/icons/my-success.svg").item-status__img
    span Группа сформирована

  span(v-else-if="status === ORDER_STATUSES.REJECT").item-status.item-status--fail
    img(src="@/assets/icons/my-failed.svg").item-status__img
    span Заказ отменен

  span(v-else).item-status.item-status--fail
    img(src="@/assets/icons/my-failed.svg").item-status__img
    span Группа не сформирована
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ORDER_STATUSES } from '@/utils/models';

@Component
export default class MyItemStatus extends Vue {
  @Prop() public users!: object[];

  @Prop() public status!: string;

  @Prop() public maxUsers!: number;

  ORDER_STATUSES = ORDER_STATUSES;
}
</script>

<style lang="scss">
  .item-status{
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
