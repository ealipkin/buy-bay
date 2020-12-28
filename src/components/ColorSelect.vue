<template lang="pug">
  .color-select
    .color-select__items
      label(v-for="(color, index) in colors" :class="{'color-select__label--visible': (index) < visibleCount}").color-select__label
        input(type="checkbox" :checked="color.selected").visually-hidden
        span(:style="{backgroundColor: color.color}").color-select__item
    div(v-if="colors.length > visibleCount" @click="showAll").color-select__show-all Показать еще
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ColorSelect extends Vue {
  @Prop() public colors!: { id: string | number; color: string; selected: boolean }[];

  visibleCount = 6;

  showAll() {
    this.visibleCount = this.colors.length + 1;
  }
}
</script>

<style scoped lang="scss">
  .color-select {

    &__items {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    &__label {
      display: none;

      margin-bottom: 9px;
      margin-right: 15px;

      &:nth-child(6n) {
        margin-right: 0;
      }

      &--visible {
        display: flex;
        margin-right: 15px;

        &:nth-child(6n) {
          margin-right: 15px;
        }

      }
    }

    &__item {
      cursor: pointer;
      width: 26px;
      height: 26px;
      display: block;
      border-radius: 50%;
    }

    input:checked + &__item {
      background: url(../assets/icons/checkbox.svg) no-repeat center 55%;
    }

    &__show-all {
      font-size: 14px;
      color: #7b8197;
      margin-top: 19px;
      text-align: center;
    }
  }
</style>
