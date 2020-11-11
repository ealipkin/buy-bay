<template lang="pug">
  .picked-options-box
    p(v-for="[title, label] in entries").picked-options-box__item
      span.picked-options-box__title {{title}}
      span.picked-options-box__label {{label}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductOption } from '@/utils/models';

@Component
export default class PickedOptionsBox extends Vue {
  @Prop() public options!: ProductOption[];

  entries = this.options.map((option: any) => [option.title, option.values.find((value) => value.selected).label]);
}
</script>

<style scoped lang="scss">
  .picked-options-box {
    font-size: 14px;
    color: $black-1;
    display: flex;
    flex-wrap: wrap;

    &__item {
      margin: 0;
      padding-right: 15px;

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
