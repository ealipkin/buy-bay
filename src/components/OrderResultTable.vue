<template lang="pug">
  table.order-result-table
    tbody
      tr(v-for="metaItem in metaValues").order-result-table__row
        td.order-result-table__data {{metaItem.title}}
        td.order-result-table__data {{metaItem.value.label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductMeta } from '@/models/product';

@Component
export default class OrderResultTable extends Vue {
  @Prop() public meta!: ProductMeta;

  metaValues = Object.values(this.meta);
}
</script>

<style scoped lang="scss">
  .order-result-table {
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
