<template lang="pug">
  .order-info
    img(:src="item.images.preview").order-info__img
    .order-info__box
      h2.order-info__title {{item.title}}

      span.order-info__orders
        img(src="../assets/icons/order-package.svg")
        span Заказов: {{divideNumberWithSpaces(this.item.orders)}}
      Rate(:rate="item.rate").order-info__rate

      PickedOptionsBox(:options="item.options").order-info__picked-options

      span.order-info__label Групповая цена
      span.order-info__price {{divideNumberWithSpaces(item.groupPrice)}} ₽

    PickedOptionsBox(:options="item.options").order-info__picked-options.picked-options-box--group
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { divideNumberWithSpaces } from '@/utils/common';
import { Product } from '@/utils/models';
import Rate from '@/components/Rate.vue';
import PickedOptionsBox from '@/components/PickedOptionsBox.vue';

@Component({
  components: {
    Rate,
    PickedOptionsBox,
  },
})
export default class OrderInfo extends Vue {
  @Prop() public item!: Product;

  divideNumberWithSpaces = (number) => divideNumberWithSpaces(number);
}
</script>

<style scoped lang="scss">
  .order-info {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 20px 16px 24px;
    background-color: #fff;

    @include tablet() {
      justify-content: space-between;
      padding: 40px;
    }

    &__img {
      width: 90px;
      height: auto;

      @include tablet() {
        order: 1;
        width: 24.8%;
      }

      @include desktop() {
        width: 170px;
      }
    }

    &__box {
      padding-left: 16px;
      max-width: 60%;

      @include tablet() {
        padding-left: 0;
        padding-right: 16px;
      }
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      color: $black-1;
      margin: 0;
      margin-bottom: 7px;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 22px;
      }
    }

    &__picked-options {
      margin-bottom: 24px;
    }

    &--group > .picked-options-box--group {
      margin: 0;
      margin-top: 24px;
    }

    &__label {
      font-size: 12px;
      color: $grey-2;
      margin-bottom: 2px;
      display: block;

      @include tablet() {
        font-size: 14px;
        font-weight: bold;
        color: $black-1;
        margin-bottom: 6px;
      }
    }

    &__price {
      font-size: 18px;
      font-weight: 600;
      color: $blue;

      @include tablet() {
        font-size: 32px;
      }
    }

    &__orders {
      display: none;

      @include tablet() {
        font-size: 14px;
        line-height: normal;
        letter-spacing: normal;
        color: #7b8197;
        display: inline-flex;
        align-items: center;
        margin-right: 26px;
        margin-bottom: 24px;

        img {
          margin-right: 12px;
        }
      }
    }

    &__rate {
      display: none;

      @include tablet() {
        display: inline-flex;
      }
    }
  }
</style>
