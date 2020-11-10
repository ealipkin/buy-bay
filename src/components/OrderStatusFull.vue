<template lang="pug">
  .order-status-full
    h3.order-status-full__title Статус заказа
    OrderStatus(:status="item.status" :optionalText="'продавцом'").order-status-full__status.order-status--big

    p.order-status-full__text Это означает, что скоро, посылка дойдет до вас. Если это уже произошло, вы можете оставить отзыв

    OrderTableFull(:options="item.options").order-status-full__table
    router-link(to="#").order-status-full__link Пожаловаться

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '@/utils/models';
import OrderStatus from '@/components/OrderStatus.vue';
import OrderTableFull from '@/components/OrderTableFull.vue';

@Component({
  components: {
    OrderStatus,
    OrderTableFull,
  },
})
export default class OrderStatusFull extends Vue {
  @Prop() public item!: Product;
}
</script>

<style scoped lang="scss">
  .order-status-full {
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
