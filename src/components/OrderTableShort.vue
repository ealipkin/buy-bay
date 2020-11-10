<template lang="pug">
  table.order-table
    tbody
      tr.order-table__row
        td(v-for="title in titles").order-table__data {{title}}
      tr.order-table__row
        td(v-for="value in values").order-table__data {{value}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductOption } from '@/utils/models';

@Component
export default class OrderTableShort extends Vue {
  @Prop() public options!: ProductOption[];

  @Prop() public optionIds!: string[];

  optionsToRender = this.optionIds.map((id) => this.options.find((option) => option.id === id));

  titles = this.optionsToRender.map((option: any) => option.title);

  values = this.optionsToRender.map((option: any) => option.values.find((value) => value.selected).label);
}
</script>

<style scoped lang="scss">
  .order-table {
    border-collapse: collapse;

    &__row {
      font-size: 14px;
      color: $black-1;

      &:first-child {
        font-weight: bold;
      }
    }

    &__data {
      padding-right: 15px;

      @include laptop() {
        padding-right: 50px;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
