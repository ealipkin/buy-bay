<template lang="pug">
  table.order-table
    tbody
      tr(v-for="option in options").order-table__row
        td.order-table__data {{option.title}}
        td.order-table__data {{selectedValue(option).label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductOption } from '@/utils/models';

@Component
export default class OrderTableFull extends Vue {
  @Prop() public options!: ProductOption[];

  selectedValue = (option) => option.values.find((value) => value.selected);
}
</script>

<style scoped lang="scss">
  .order-table {
    border-collapse: collapse;

    &__data {
      padding: 6px 0;
      font-size: 12px;
      color: $grey-2;
      white-space: nowrap;
      vertical-align: top;

      &:nth-of-type(2) {
        padding-left: 27px;
        color: $black-1;
        white-space: normal;
      }
    }
  }
</style>
