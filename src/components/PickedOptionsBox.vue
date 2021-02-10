<template lang="pug">
  div(v-if="options && options.length").picked-options-box
    p(v-for="option in options").picked-options-box__item
      span.picked-options-box__title {{option.property.title}}
      span.picked-options-box__label {{option.propValue.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OrderPaymentOption } from '@/models/order';

@Component
export default class PickedOptionsBox extends Vue {
  @Prop() public options!: OrderPaymentOption[];
}
</script>

<style scoped lang="scss">
  .picked-options-box {
    font-size: 14px;
    color: $black-1;
    display: none;
    flex-wrap: wrap;

    @include tablet() {
      display: flex;
    }

    &--group {
      display: flex;
      width: 100%;

      @include tablet() {
        display: none;
      }

      .picked-options-box__item {
        padding-right: 39px;

        &:last-child {
          padding-right: 0;
        }
      }
    }

    &--group & {
      &__title {
        font-size: 12px;
        font-weight: normal;
        color: #7b8197;
        margin-bottom: 4px;
      }

      &__label {
        font-size: 14px;
        font-weight: 600;
        color: #222222;
      }
    }

    &__item {
      margin: 0;
      padding-right: 15px;
      margin-bottom: 15px;

      @include laptop() {
        padding-right: 50px;
      }

      &:last-child {
        padding-right: 0;
      }
    }

    &__title {
      font-weight: bold;
      display: block;
      margin-bottom: 7px;
    }
  }
</style>
