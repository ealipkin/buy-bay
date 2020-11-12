<template lang="pug">
  .order-detail
    .order-detail__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .order-detail__main
      .order-detail__left-col
        OrderInfo(:item="item").order-detail__product.order-detail__item
        OrderStatusCard(:item="item" v-if="isMobile").order-detail__status.order-detail__item
        DeliveryAddress(:contacts="item.contacts").order-detail__address.order-detail__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="isMobile").order-detail__delivery.order-detail__item
        Chat(:users="item.users" :messages="item.messages").order-detail__item
      .order-detail__aside
        OrderStatusCard(:item="item" v-if="!isMobile").order-detail__status.order-detail__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").order-detail__delivery.order-detail__item

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateGroups, generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import DeliveryAddress from '@/components/DeliveryAddress.vue';
import OrderStatusCard from '@/components/OrderStatusCard.vue';
import Chat from '@/components/Chat.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    OrderInfo,
    OrderStatusCard,
    DeliveryAddress,
    Chat,
  },
})
export default class OrderDetail extends Vue {
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
  .order-detail {
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