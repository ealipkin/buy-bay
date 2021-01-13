<template lang="pug">
  .order-payment
    .order-payment__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    h1.order-payment__title Оформление заказа
    .order-payment__main
      .order-payment__left-col
        .order-payment__info.order-payment__item
          h2.order-payment__info-title Оформелние заказа
          span.order-payment__info-text Пожалуйста, добавьте недостающие данные

        .order-payment__address.order-payment__item
          h3.order-payment__address-title Адреса доставки
          ul.order-payment__address-list
            li(v-for="(item, i) in user.addresses" :key="item.id").order-payment__address-item
              AddressItem(:item="item" :i="i" @change="addressChange" @remove="removeAddress" @edit="openAddressEditor")
          button(type="button" @click="openAddressModal").link + Добавить адрес

        .order-payment__cards.order-payment__item
          h3.order-payment__cards-title Мои карты
          ul.order-payment__cards-list
            li(v-for="(item, i) in user.cards" :key="item.id").order-payment__cards-item
              CreditCardItem(:item="item" :i="i" @change="cardChange" @remove="removeCard")
          button(type="button" @click="openCreditCardModal").link + Добавить карту

        .order-payment__item.order-payment__item--last
          button(type="button").order-payment__button Оплатить

      .order-payment__aside
        OrderInfo(:item="item" v-if="!isMobile" :type="'checkout'").order-payment__product.order-payment__item.order-info--checkout
        DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").order-payment__delivery.order-payment__item

    AddressModal(ref="addressModal")
    CreditCardModal(ref="creditCardModal")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateProducts, createProfileUser } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import AddressItem from '@/components/AddressItem.vue';
import CreditCardItem from '@/components/CreditCardItem.vue';
import AddressModal from '@/components/AddressModal.vue';
import CreditCardModal from '@/components/CreditCardModal.vue';
import { BreadcrumbLink } from '@/models/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    OrderInfo,
    AddressItem,
    CreditCardItem,
    AddressModal,
    CreditCardModal,
  },
})
export default class OrderPayment extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/category', label: 'Мужской гардероб' },
    { href: '/category', label: 'Сумки и рюкзаки' },
    { href: '/product/:id/payment', label: 'Рюкзак', current: true },
  ];

  user = createProfileUser(null, 1);

  openAddressModal() {
    const modalComponent: any = this.$refs.addressModal;
    modalComponent.showModal();
  }

  addressChange({ item, index }) {
    if (item.isActive) {
      return;
    }

    this.user.addresses.forEach((address) => address.isActive = false);
    Vue.set(this.user.addresses, index, { ...item, isActive: true });
  }

  removeAddress(id: string) {
    this.user.addresses = this.user.addresses.filter((address) => address.id !== id);
  }

  openAddressEditor(id: string) {
    console.log('edit address:', id);
  }

  openCreditCardModal() {
    const modalComponent: any = this.$refs.creditCardModal;
    modalComponent.showModal();
  }

  cardChange({ item, index }) {
    if (item.isActive) {
      return;
    }

    this.user.cards.forEach((card) => card.isActive = false);
    Vue.set(this.user.cards, index, { ...item, isActive: true });
  }

  removeCard(id: string) {
    this.user.cards = this.user.cards.filter((card) => card.id !== id);
  }

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
  .order-payment {
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
        display: none;
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

    &__address {
      padding: 16px;
      padding-bottom: 24px;
      background-color: #fff;
    }

    &__address-title {
      margin: 0;
      margin-bottom: 19px;
      font-size: 16px;
      color: $black-1;
      font-weight: 600;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 24px;
      }
    }

    &__address-list {
      @include clearList();
      margin-bottom: 24px;
    }

    &__address-item {
      margin-bottom: 13px;

      @include tablet() {
        margin-bottom: 8px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__cards {
      padding: 16px;
      padding-bottom: 24px;
      background-color: #fff;
    }

    &__cards-title {
      margin: 0;
      margin-bottom: 19px;
      font-size: 16px;
      color: $black-1;
      font-weight: 600;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 24px;
      }
    }

    &__cards-list {
      @include clearList();
      margin-bottom: 24px;
    }

    &__cards-item {
      margin-bottom: 12px;

      @include tablet() {
        margin-bottom: 8px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__product {
      border-radius: 8px;
      border: 1px solid $grey-6;
    }

    &__button {
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
