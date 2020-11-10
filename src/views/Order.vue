<template lang="pug">
  .order
    .order__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .order__main
      .order__left-col
        OrderProduct(:item="item").order__product.order__item
        OrderStatusFull(:item="item" v-if="isMobile").order__status.order__item
        DeliveryAddress(:contacts="item.contacts").order__address.order__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="isMobile").order__delivery.order__item
        Chat(:users="item.users" :messages="item.messages").order__item
      .order__aside
        OrderStatusFull(:item="item" v-if="!isMobile").order__status.order__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").order__delivery.order__item.order__item--delivery

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateGroups, generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderProduct from '@/components/OrderProduct.vue';
import DeliveryAddress from '@/components/DeliveryAddress.vue';
import OrderStatusFull from '@/components/OrderStatusFull.vue';
import Chat from '@/components/Chat.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    OrderProduct,
    OrderStatusFull,
    DeliveryAddress,
    Chat,
  },
})
export default class Order extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { href: '/profile/orders', label: 'Мои заказы' },
    { href: '/profile/orders/:id', label: 'order title?', current: true },
  ];

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  }

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  window = {
    width: 0,
    height: 0,
  };

  item = generateProducts(1).pop();

  groups = generateGroups(12);

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss" scoped>
  .order {
    @include container();
    padding-left: 15px;
    padding-right: 15px;

    @include tablet() {
      padding-bottom: 85px;
    }

    &__item {
      margin-left: -15px;
      margin-right: -15px;

      @include tablet() {
        margin-left: 0;
        margin-right: 0;
        border-radius: 8px;
        border: 1px solid $grey-6;
      }
    }

    &__product {
      margin-bottom: 12px;
    }

    &__status {
      margin-bottom: 12px;
    }

    &__address {
      margin-bottom: 12px;
    }

    &__delivery {
      margin-bottom: 12px;
    }

    &__main {

      @include tablet() {
        display: flex;
      }
    }

    &__left-col {
      @include tablet() {
        width: 1px;
        flex: 1;
        margin-right: 10px;
        max-width: 686px;
      }

      @include laptop() {
        margin-right: 16px;
      }
    }

    &__aside {
      @include tablet() {
        width: 300px;
      }

      @include laptop() {
        width: 438px;
      }
    }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }
  }
</style>
