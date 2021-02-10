<template lang="pug">
  div(v-if="order").order-status-card
    h3.order-status-card__title Статус заказа
    OrderStatus(:order="order" :optionalText="'продавцом'").order-status-card__status.order-status--big

    p.order-status-card__text Это означает, что скоро, посылка дойдет до вас. Если это уже произошло, вы можете оставить отзыв

    OrderResultTable(:options="enrichedOptions").order-status-card__table
    //router-link(to="#").order-status-card__link Пожаловаться

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import OrderStatus from '@/components/OrderStatus.vue';
import OrderResultTable from '@/components/OrderResultTable.vue';
import { OrderData, OrderPaymentOption } from '@/models/order';

@Component({
  components: {
    OrderStatus,
    OrderResultTable,
  },
})
export default class OrderStatusCard extends Vue {
  @Prop() public order!: OrderData;

  @Prop() public options!: OrderPaymentOption[];

  enrichedOptions: OrderPaymentOption[] | [] = [];

  mounted() {
    this.enrichedOptions = [
      {
        property: { title: 'Дата заказа' },
        propValue: { title: new Date(this.order.order.created_at) },
        isDate: true,
      },
      {
        property: { title: 'Номер' },
        propValue: { title: String(this.order.order.id) },
      },
      {
        property: { title: 'Статус' },
        propValue: { title: this.order.order_status.title },
      },
      ...this.options,
    ];
  }
}
</script>

<style scoped lang="scss">
  .order-status-card {
    padding: 24px 16px;
    background-color: #fff;

    @include tablet() {
      padding: 32px;
      padding-bottom: 50px;
    }

    &__title {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      color: $black-1;
      margin-bottom: 16px;

      @include tablet() {
        font-size: 18px;
        margin-bottom: 32px;
      }
    }

    &__status {
      margin-bottom: 16px;

      @include tablet() {
        margin-bottom: 24px;
      }
    }

    &__text {
      font-size: 12px;
      color: $grey-2;
      margin: 0;
      margin-bottom: 20px;
      margin-top: 17px;

      @include tablet() {
        font-size: 14px;
        margin-bottom: 40px;
      }
    }

    &__table {
      margin-bottom: 24px;

      @include tablet() {
        display: none;
      }
    }

    &__link {
      font-size: 12px;
      color: $blue;

      @include tablet() {
        font-size: 14px;
      }
    }
  }
</style>
