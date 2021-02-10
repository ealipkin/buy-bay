<template lang="pug">
  table.order-result-table
    tbody(v-if="options && options.length")
      tr(v-for="option in options").order-result-table__row
        td.order-result-table__data {{option.property.title}}
        td(v-if="option.isDate").order-result-table__data {{ option.propValue.title | dateFormat('DD MMMM YYYY') }}
        td(v-if="!option.isDate").order-result-table__data {{ option.propValue.title }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OrderPaymentOption } from '@/models/order';

@Component
export default class OrderResultTable extends Vue {
  @Prop() public options!: OrderPaymentOption[];

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
