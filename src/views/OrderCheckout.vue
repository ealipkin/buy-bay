<template lang="pug">
  .order-checkout
    .order-checkout__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    h1.order-checkout__title Оформление заказа
    .order-checkout__main
      .order-checkout__left-col
        .order-checkout__info.order-checkout__item
          h2.order-checkout__info-title Адрес доставки
          span.order-checkout__info-text Пожалуйста, добавьте недостающие данные

        form.order-checkout__form
          fieldset.order-checkout__item.order-checkout__fieldset.order-checkout__recipient
            Recipient

          fieldset.order-checkout__item.order-checkout__fieldset.order-checkout__destination
            Destination

          .order-checkout__item.order-checkout__item--last
            button(type="submit").order-checkout__form-submit Продолжить

      .order-checkout__aside
        OrderInfo(:item="item" v-if="!isMobile" :type="'checkout'").order-checkout__product.order-checkout__item.order-info--checkout
        DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").order-checkout__delivery.order-checkout__item

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import Recipient from '@/components/Recipient.vue';
import Destination from '@/components/Destination.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    OrderInfo,
    Recipient,
    Destination,
  },
})
export default class OrderCheckout extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/category', label: 'Мужской гардероб' },
    { href: '/category', label: 'Сумки и рюкзаки' },
    { href: '/product/:id/checkout', label: 'order title?', current: true },
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
  .order-checkout {
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
      padding: 16px;
      padding-bottom: 24px;
      background-color: #fff;

      &--last {
        margin-top: -12px;
        padding-bottom: 50px;

        @include tablet() {
          margin-top: 0;
          padding: 0;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      @include tablet() {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
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
        background-color: #fff;
        padding: 32px 43px 42px 40px;
        border-radius: 8px;
        border: 1px solid $grey-6;
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
        width: 452px;
      }
    }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }

    &__info {
      @include tablet() {
        margin-bottom: 32px;
        padding: 0;
      }
    }

    &__info-title {
      margin: 0;
      margin-bottom: 4px;
      font-size: 18px;
      font-weight: bold;
      color: $black-1;
    }

    &__info-text {
      font-size: 12px;
      color: $black-1;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__product {
      border-radius: 8px;
      border: 1px solid $grey-6;
    }

    &__fieldset {
      border: none;

      @include tablet() {
        padding: 0;
      }
    }

    &__recipient {
      margin-bottom: 55px;
    }

    &__destination {
      @include tablet() {
        margin-bottom: 80px;
      }
    }

    &__form-submit {
      @include clearButton();
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      padding: 17px;
      padding-bottom: 19px;
      display: block;
      text-align: center;
      background-color: $blue;
      border-radius: 8px;
      width: 100%;

      @include tablet() {
        max-width: 289px;
        margin-left: auto;
      }
    }

    &__delivery {
      border-radius: 8px;
      border: 1px solid $grey-6;
      margin-top: 12px;
    }

  }
</style>
