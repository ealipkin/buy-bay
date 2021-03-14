<template lang="pug">
  .group-action
    template(v-if="group.is_complete")
      .group-action__ended Время истекло
      h2.group-action__title Купить вне группы
      span.group-action__price {{divideNumberWithSpaces(product.selfPrice)}} ₽
      router-link(:to="`/product/${product.id}`").button.button--big Купить одному
    Timer(v-else :left-time="shareTimer").group-action__timer
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { divideNumberWithSpaces } from '@/utils/common';
import Timer from '@/components/Timer.vue';
import { Group, Product } from '@/models/order';

@Component({
  components: {
    Timer,
  },
})
export default class GroupAction extends Vue {
  @Prop() public product!: Product;

  @Prop() public group!: Group;

  get shareTimer() {
    return this.group && this.group.time;
  }

  divideNumberWithSpaces = (number) => divideNumberWithSpaces(number);
}
</script>

<style scoped lang="scss">
  .group-action {
    background-color: #fff;
    padding: 16px;
    padding-bottom: 32px;

    @include tablet() {
      padding: 20px 30px;
    }

    @include laptop() {
      padding: 40px 50px;
    }

    &__ended {
      font-weight: bold;
      font-size: 20px;
      color: $black-1;
      margin: 0;
      margin-top: 10px;
      margin-bottom: 5px;
      text-align: center;
    }

    &__title {
      font-weight: bold;
      font-size: 14px;
      color: $black-1;
      margin: 0;
      margin-top: 24px;
      margin-bottom: 10px;
      display: block;
      text-align: center;

      @include tablet() {
        margin-bottom: 2px;
        margin-top: 34px;
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
