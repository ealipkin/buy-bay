<template lang="pug">
  div(v-if="loaded && orderData").order-detail
    .order-detail__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    h1.order-detail__title Заказ № {{orderData.order.id}} отправлен продавцом
    .order-detail__main
      .order-detail__left-col
        OrderInfo(:item="order" :options="orderOptions" :hideStatus="false").order-detail__product.order-detail__item
        OrderStatusCard(:order="orderData" :options="orderOptions" v-if="isMobile").order-detail__status.order-detail__item
        DeliveryAddress(:contacts="item.contacts").order-detail__address.order-detail__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="isMobile").order-detail__delivery.order-detail__item
        Chat(:users="item.users" :options="orderOptions" :messages="item.messages").order-detail__item
      .order-detail__aside
        OrderStatusCard(:order="orderData" :options="orderOptions" v-if="!isMobile").order-detail__status.order-detail__item
        DeliveryInfo(:deliveryItem="orderData.delivery" v-if="!isMobile").order-detail__delivery.order-detail__item

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import DeliveryAddress from '@/components/DeliveryAddress.vue';
import OrderStatusCard from '@/components/OrderStatusCard.vue';
import Chat from '@/components/Chat.vue';
import { BreadcrumbLink } from '@/models/models';
import { OrderData, OrderPaymentOption } from '@/models/order';
import { OrderPaymentResponse } from '@/models/responses';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import router from '@/router';
import { Product } from '@/models/product';
import { ORDER_STATUSES } from '@/models/enums';

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
  loaded = false;
  orderId: string | null = null;
  orderData: OrderData | null = null;

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { href: '/profile/orders', label: 'Мои заказы' },
  ];

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  }

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  get order(): Product | null {
    return this.orderData && this.orderData.orderItems && this.orderData.orderItems[0].product;
  }

  get orderOptions(): OrderPaymentOption[] | null {
    return this.orderData && this.orderData.orderItems && this.orderData.orderItems[0].orderProductOptions;
  }

  window = {
    width: 0,
    height: 0,
  };

  item = generateProducts(1).pop();

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  mounted() {
    this.orderId = this.$route.params.id as string;
    if (!this.isAuthorized || !this.orderId) {
      router.push({ path: '/' });
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.getOrder()
      .then((res) => {
        const orderData = res.data.data;
        if (orderData.order_status.id === ORDER_STATUSES.PAYMENT_WAITING || orderData.order_status.id === ORDER_STATUSES.IN_PROCESS) {
          router.push({ path: `/order/${this.orderId}` });
          return;
        }
        this.orderData = orderData;
        this.loaded = true;

        this.breadCrumbs.push({
          href: '/profile/orders/:id',
          label: this.item ? `Заказ № ${this.orderData.order.id}` : '',
          current: true
        });
        console.log('this.orderData -> ', this.orderData);
      })
      .catch(() => {
        router.push({ path: '/' });
      });
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }


  getOrder(): Promise<OrderPaymentResponse> {
    return createRequest('GET', endpoints.order.get(this.orderId));
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

    &__title {
      display: none;

      @include tablet() {
        font-size: 32px;
        margin: 0;
        margin-bottom: 24px;
        font-weight: 600;
        color: $black-1;
        display: block;
      }
    }

    &__item {
      margin-bottom: 12px;
      margin-left: -15px;
      margin-right: -15px;

      &:last-child {
        margin-bottom: 0;
      }

      @include tablet() {
        margin-left: 0;
        margin-right: 0;
        border-radius: 8px;
        border: 1px solid $grey-6;
      }
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
