<template lang="pug">
  .group-action
    Timer(:time="shareTimer").group-action__timer
    h2.group-action__title Купить вне группы
    span.group-action__price {{divideNumberWithSpaces(selfPrice)}} ₽
    router-link(:to="`/product/${product.id}/payment`").button.button--big Купить одному

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SHARE_TIMER } from '@/utils/constants';
import { divideNumberWithSpaces } from '@/utils/common';
import Timer from '@/components/Timer.vue';
import { Product } from '@/utils/models';

@Component({
  components: {
    Timer,
  },
})
export default class GroupAction extends Vue {
  @Prop() public selfPrice!: number;

  @Prop() public product!: Product;

  shareTimer = SHARE_TIMER;

  divideNumberWithSpaces = (number) => divideNumberWithSpaces(number);
}
</script>

<style scoped lang="scss">
  .group-action {
    background-color: #fff;
    padding: 16px;
    padding-bottom: 32px;

    @include tablet() {
      padding: 40px 50px;
    }

    &__timer {
      margin-bottom: 24px;

      @include tablet() {
        margin-bottom: 34px;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 14px;
      color: $black-1;
      margin: 0;
      margin-bottom: 10px;
      display: block;
      text-align: center;

      @include tablet() {
        margin-bottom: 2px;
      }
    }

    &__price {
      font-weight: 600;
      font-size: 24px;
      color: $black-1;
      margin-bottom: 14px;
      display: block;
      text-align: center;

      @include tablet() {
        font-size: 32px;
        margin-bottom: 24px;
      }
    }

    &__button {
      @include clearButton();
      background-color: $blue;
      border-radius: 8px;
      text-align: center;
      padding: 13px 10px 16px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      display: block;
      width: 100%;

      @include tablet() {
        font-size: 18px;
        padding: 18px 15px 20px;
      }
    }
  }
</style>
