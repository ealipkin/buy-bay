<template lang="pug">
  .group-detail.profile-page
    .container
      .order-detail__breadcrumbs
        Breadcrumbs(:links="breadCrumbs")
      h1.group-detail__title Группа на покупку&nbsp;
        router-link(v-if="product" :to="`/product/${product.id}`").group-detail__title-link {{product.title}}
      .group-detail__main
        .group-detail__left-col
          OrderInfo(v-if="order" :item="order" :order-data="orderData" :options="orderOptions" :hideStatus="true" :hideTitle="true").group-detail__product.group-detail__item.order-info--group
          GroupInfo(v-if="orderData" :orderData="orderData.orderInfo" :group="orderData.group" @leave="handleLeaveGroup").group-detail__info.group-detail__item
          GroupAction(v-if="isMobile && product" :product="product" :group="orderData.group").group-detail__action.group-detail__item
          DeliveryInfo(:deliveryItem="orderData.delivery" v-if="isMobile && orderData").group-detail__delivery.group-detail__item
        .group-detail__aside
          GroupAction(v-if="!isMobile && product" :selfPrice="product.selfPrice" :product="product" :group="orderData.group").group-detail__action.group-detail__item
          DeliveryInfo(:deliveryItem="orderData.delivery" v-if="!isMobile && orderData").group-detail__delivery.group-detail__item

      section(v-if="similarItems && similarItems.length").group-detail__section
        .section-header.section-header--offset-2
          .section-title Похожие товары
          //router-link(to="#").link._hide-desktop Показать еще
        .container
          SimilarSlider(:items="similarItems").similar-slider--scroll
    ConfirmationModal(ref="confirmationModal" :maxWidth="500" @confirm="leaveConfirm" cancelText="Остаться" confirmText="Выйти" :text="confirmModalText")
</template>

Описание:

Кнопки:  и Остаться
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import OrderInfo from '@/components/OrderInfo.vue';
import GroupInfo from '@/components/GroupInfo.vue';
import GroupAction from '@/components/GroupAction.vue';
import SimilarSlider from '@/components/SimilarSlider.vue';
import SeoBlock from '@/components/SeoBlock.vue';
import { BreadcrumbLink } from '@/models/models';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import router from '@/router';
import { OrderPaymentResponse } from '@/models/responses';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { OrderData, OrderPaymentOption, Product } from '@/models/order';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

@Component({
  components: {
    ConfirmationModal,
    Breadcrumbs,
    SeoBlock,
    SimilarSlider,
    DeliveryInfo,
    OrderInfo,
    GroupInfo,
    GroupAction,
  },
})
export default class GroupDetail extends Vue {
  loaded = false;

  orderId: string | null = null;

  orderData: OrderData | null = null;

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { href: '/profile/orders', label: 'Мои заказы' },
  ];

  window = {
    width: 0,
    height: 0,
  };

  groupId: string | null = null;

  similarItems: Product[] | [] = []

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get confirmModalText(): string {
    if (!this.product) {
      return '';
    }
    return `Не стоит упускать возможность сэкономить ${this.product.selfPrice - this.product.groupPrice} ₽.<br>Если решите покинуть группу, мы вернём деньги в течение 14 дней.`;
  }

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  }

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  get product(): Product | null | undefined {
    const data: OrderData | null = this.orderData;
    const orderInfo = data && data.orderInfo;
    return orderInfo && orderInfo.orderItems && orderInfo.orderItems[0].product;
  }

  get order(): Product | null | undefined {
    const data: OrderData | null = this.orderData;
    const orderInfo = data && data.orderInfo;
    return orderInfo && orderInfo.orderItems && orderInfo.orderItems[0].product;
  }

  get orderOptions(): OrderPaymentOption[] | undefined | null {
    const data: OrderData | null = this.orderData;
    const orderInfo = data && data.orderInfo;
    return orderInfo && orderInfo.orderItems && orderInfo.orderItems[0].orderProductOptions;
  }

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  mounted() {
    this.groupId = this.$route.params.id as string;
    if (!this.isAuthorized || !this.groupId) {
      router.push({ path: '/' });
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.getGroup()
      .then((res: OrderPaymentResponse) => {
        const orderData: OrderData = res.data.data;
        const order: OrderData | undefined = orderData && orderData.orderInfo;
        const product: Product | undefined = order && order.orderItems[0].product;
        this.orderData = orderData;
        this.loaded = true;
        // console.log(product.title);
        this.breadCrumbs.push({
          href: '',
          label: product ? `Группа на покупку ${product.title}` : '',
          current: true,
        });
      })
      .catch(() => {
        router.push({ path: '/' });
      });

    createRequest('get', endpoints.group.related(this.groupId))
      .then((res) => {
        this.similarItems = res.data.data;
      });
  }

  getGroup(): Promise<OrderPaymentResponse> {
    return createRequest('GET', endpoints.group.get(this.groupId));
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleLeaveGroup() {
    this.openConfirmationModal();
  }

  openConfirmationModal() {
    const modalComponent: any = this.$refs.confirmationModal;
    modalComponent.showModal();
  }

  leaveConfirm() {
    return createRequest('GET', endpoints.group.leave(this.groupId)).then(() => {
      router.push({ path: '/' });
    });
  }
}
</script>

<style lang="scss" scoped>
  .group-detail {
    @include tablet() {
      padding-bottom: 85px;
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

    &__title-link {
      color: black;
      @include link();
    }

    &__title {
      display: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include tablet() {
        font-size: 32px;
        margin: 0;
        margin-bottom: 24px;
        font-weight: 600;
        color: $black-1;
        display: block;
      }
    }

    &__section {
      padding-top: 1px;
      background: white;
      margin-top: 15px;
      margin-bottom: 0;
      padding-bottom: 15px;

      @include laptop() {
        background: transparent;
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
