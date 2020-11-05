<template lang="pug">
  ul.my-list
    li(v-for="order in myOrders").my-list__item.order
      img(:src="order.image").order__img
      span.order__content
        span.order__date {{order.date}}
        h3.order__title {{order.title | truncate(45)}}
        MyParty(:users="order.users" :status="order.status" :maxUsers="order.maxUsers").order__party

        MyItemTimer(:time="order.time")
        span.order__box
          include ../assets/icons/group-button.svg
          span.order__price {{divideNumberWithSpaces(order.price)}} ₽
          button(type="button").order__button Пригласить друзей
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MyItemTimer from '@/components/MyItemTimer.vue';
import MyParty from '@/components/MyParty.vue';

import { divideNumberWithSpaces } from '@/utils/common';

@Component({
  components: {
    MyItemTimer,
    MyParty,
  },
})
export default class MyList extends Vue {
  @Prop() public myOrders!: object[];

  divideNumberWithSpaces(number) {
    return divideNumberWithSpaces(number);
  }
}
</script>

<style lang="scss">
  .my-list {
    @include clearList();
    padding-bottom: 92px;

    &__item {
      margin-bottom: 20px;

      @include laptop() {
        margin-bottom: 16px;
      }

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
      }
    }
  }

  .order {
    display: flex;
    align-items: flex-start;
    padding-bottom: 28px;
    border-bottom: 1px solid $grey-4;

    @include laptop() {
      padding-bottom: 0;
      border-bottom: 0;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      overflow: hidden;
      max-width: 100%;
    }

    &__img {
      margin-right: 16px;
      width: 90px;
      height: auto;

      @include laptop() {
        width: 200px;
        margin-right: 35px;
      }
    }

    &__content {
      padding-right: 28px;

      @include laptop() {
        padding: 18px 20px 25px 0;
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

      @include laptop() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
      }
    }

    &__party {
      margin-bottom: 13px;

      @include laptop() {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }

    &__box {
      display: none;

      @include laptop() {
        display: block;
        margin-top: 26px;

        svg {
          color: rgba(0, 0, 0, 0.7);
          width: 20px;
          height: 16px;
          margin-right: 10px;
          vertical-align: middle;
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
        @include clearButton();

        background-color: $blue;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        padding: 9px 10px 12px;
        border-radius: 4px;
      }
    }
  }
</style>
