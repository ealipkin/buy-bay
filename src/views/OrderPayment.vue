<template lang="pug">
  .order-payment
    template(v-if="loaded")
      template(v-if="orderData")
        h1.order-payment__title Оформление заказа
        ValidationObserver(v-slot="{ validate }")
          form(@submit.prevent="validate().then(submitNewAddress)")
            .order-payment__main
              .order-payment__left-col
                .order-payment__info.order-payment__item
                  h2.order-payment__info-title Оформелние заказа
                  span.order-payment__info-text Пожалуйста, добавьте недостающие данные

                div(v-if="addresses && addresses.length").order-payment__address.order-payment__item
                  h3.order-payment__address-title Адреса доставки
                  ul.order-payment__address-list
                    li(v-for="item in addresses" :key="item.id").order-payment__address-item
                      AddressItem(:item="item" @select="handleSelectAddress" @remove="removeAddress" @edit="handleAddressEdit")
                  button(type="button" @click="openAddressModal(null)").link + Добавить адрес
                div(v-else)
                  h3.order-payment__address-title Адрес доставки
                  p.order-payment__address-text Пожалуйста, добавьте недостающие данные

                  fieldset.modal__form-fieldset
                    Recipient(:addressItem="addressItem").modal__recipient

                  fieldset.modal__form-fieldset
                    Destination(:addressItem="addressItem").modal__destination

                .order-payment__cards.order-payment__item
                  h3.order-payment__cards-title Мои карты
                  ul.order-payment__cards-list
                    li(v-for="item in cards" :key="item.id").order-payment__cards-item
                      CreditCardItem(:item="item" @remove="handleRemoveCard" @select="handleSelectCard")
                  button(type="button" @click="handleAddCard").link + Добавить карту

                .order-payment__item.order-payment__item--last
                  Loader(v-if="submitted").order-payment__submit-loader.inline-loader
                  button(v-if="addresses && addresses.length" type="button" :disabled="orderDisabled" @click="handleOrder").order-payment__button.button Оплатить
                  button(v-if="!addresses || !addresses.length" type="submit" :disabled="submitted").order-payment__button.button Продолжить

              .order-payment__aside
                OrderInfo(:item="order" :orderData="orderData" :options="orderOptions" v-if="order && !isMobile" :type="'checkout'").order-payment__product.order-payment__item.order-info--checkout
                DeliveryInfo(:deliveryItem="orderData.delivery" v-if="orderData.delivery && !isMobile").order-payment__delivery.order-payment__item

        AddressModal(ref="addressModal" @update="handleUpdateAddress" @add="handleAddAddress")
        CreditCardModal(ref="creditCardModal")
        ConfirmationModal(ref="confirmationModal" @confirm="removeConfirm" @cancel="removeCancel")
      template(v-else)
        h1.order-payment__title Заказ не найден
    Loader(v-else)
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { createProfileUser } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import OrderInfo from '@/components/OrderInfo.vue';
import CreditCardItem from '@/components/CreditCardItem.vue';
import AddressModal from '@/components/AddressModal.vue';
import CreditCardModal from '@/components/CreditCardModal.vue';
import { CardItem, UserAddressItem } from '@/models/models';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import Loader from '@/components/Loader.vue';
import {
  OrderAddAddressResponse,
  OrderCardsResponse,
  OrderPaymentResponse,
  OrderPayResponse,
  ProfileAddressResponse,
} from '@/models/responses';
import AddressItem from '@/components/AddressItem.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import Toasted from '@/components/Toasted.vue';
import $store from '@/store';
import { ORDER_STATUSES, PAY_STATUSES } from '@/models/enums';
import router from '@/router';
import { OrderData, OrderPaymentOption, Product } from '@/models/order';
import Recipient from '@/components/Recipient.vue';
import Destination from '@/components/Destination.vue';

enum ITEMS_TYPES {
  CARD = 'card',
  ADDRESS = 'address',
}

@Component({
  components: {
    Destination,
    Recipient,
    ConfirmationModal,
    AddressItem,
    Loader,
    DeliveryInfo,
    OrderInfo,
    CreditCardItem,
    AddressModal,
    CreditCardModal,
    Toasted,
  },
})
export default class OrderPayment extends Vue {
  @Watch('isAuthorized') isAuthorizedChanged(val) {
    if (val) {
      this.$nextTick(() => {
        this.loadOrder();
      });
    }
  }

  lastRemovedItem: { type: ITEMS_TYPES; id: any } | null = null;

  addressItem = {};

  window = {
    width: 0,
    height: 0,
  };

  orderData: OrderData | null = null;

  addresses: UserAddressItem[] | null = null;

  cards: CardItem[] | null = null;

  orderId: string | number | null = null;

  user = createProfileUser(null, 1);

  loaded = false

  submitted = false;

  get orderDisabled() {
    console.log(this.orderData);
    if (!this.orderData || !this.orderData.order) {
      return true;
    }
    const { order } = this.orderData;
    const hasActiveAddress = order.user_address_id;
    return !hasActiveAddress || this.submitted;
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

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  submitNewAddress(valid) {
    if (valid) {
      this.submitted = true;
      this.addAddress({ address: (this.addressItem as UserAddressItem) })
        .then((res: OrderAddAddressResponse) => res.data.data.user_address_id)
        .then((addressId) => this.selectAddress(addressId))
        .then(this.handleOrder);
    }
  }

  handleAddressEdit(address: AddressItem) {
    this.openAddressModal(address);
  }

  openAddressModal(data) {
    const modalComponent: any = this.$refs.addressModal;
    const address = data ? { ...data } : null;
    modalComponent.showModal(address);
  }

  openConfirmationModal() {
    const modalComponent: any = this.$refs.confirmationModal;
    modalComponent.showModal();
  }

  addAddress(data: { address: UserAddressItem }): Promise<OrderAddAddressResponse> {
    delete data.address.created_at;
    delete data.address.updated_at;
    return createRequest('POST', endpoints.order.addAddress(this.orderId), data.address);
  }

  handleAddAddress(data: { address: UserAddressItem }) {
    this.addAddress(data).then(() => this.handleAddAddressSuccess());
  }

  handleUpdateAddress(data: { address: UserAddressItem }) {
    delete data.address.created_at;
    delete data.address.updated_at;
    createRequest('POST', endpoints.address.update(data.address.id), data.address).then(() => this.handleAddAddressSuccess(true));
  }

  handleAddAddressSuccess(isEdit?) {
    const toast: any = this.$refs.toasted;
    const message = isEdit ? 'Адрес успешно обновлен' : 'Адрес успешно добавлен';
    toast.showSuccess(message);
    this.updateAddresses();
  }

  removeAddress(id: string) {
    this.lastRemovedItem = { type: ITEMS_TYPES.ADDRESS, id };
    this.openConfirmationModal();
  }

  selectAddress(addressId) {
    const data = {
      oid: this.orderId,
      user_address_id: addressId,
    };
    return createRequest('POST', endpoints.order.selectAddress, data);
  }

  handleSelectAddress(address: UserAddressItem) {
    this.submitted = true;
    this.selectAddress(address.id).then(this.updateOrder);
  }

  // openCreditCardModal() {
  // const modalComponent: any = this.$refs.creditCardModal;
  // modalComponent.showModal();
  // }

  handleAddCard() {
    createRequest('POST', endpoints.card.create)
      .then((res) => {
        window.location.href = res.data.data.confirmation_url;
      });
  }

  handleSelectCard(card: CardItem) {
    const { pid } = card;
    this.submitted = true;
    createRequest('POST', endpoints.order.selectCard(this.orderId), { pid }).then(this.updateOrder);
  }

  handleRemoveCard(card: CardItem) {
    this.lastRemovedItem = { type: ITEMS_TYPES.CARD, id: card.id };
    this.openConfirmationModal();
  }

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  getAddress() {
    return createRequest('GET', endpoints.profile.addresses);
  }

  getCards() {
    return createRequest('GET', endpoints.order.cards);
  }

  getOrder(): Promise<OrderPaymentResponse> {
    return createRequest('GET', endpoints.order.get(this.orderId));
  }

  updateAddresses() {
    this.getAddress().then((res: ProfileAddressResponse) => {
      this.addresses = res.data.data;
    });
  }

  updateCards() {
    this.getCards().then((res) => {
      this.cards = res.data.data;
    });
  }

  updateOrder() {
    this.getOrder()
      .then((res) => {
        this.submitted = false;
        this.orderData = res.data.data;
      });
  }

  loadOrder() {
    this.orderId = this.$route.params.id;
    const orderRequest = this.getOrder();
    const addressesRequest = this.getAddress();
    const cardsRequest = this.getCards();
    Promise.all([orderRequest, addressesRequest, cardsRequest])
      .then((data) => {
        const orderRes: OrderPaymentResponse = data[0];
        const orderData = orderRes.data.data;
        const orderStatus = orderData.order.order_status_id;
        const isWaiting = orderStatus === ORDER_STATUSES.PAYMENT_WAITING;
        const isInProcess = orderStatus === ORDER_STATUSES.IN_PROCESS;
        const canProceed = !orderStatus || isInProcess || isWaiting;
        if (!canProceed) {
          router.push({ path: `/profile/orders/${this.orderId}` });
          return null;
        }
        return data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        const [
          orderRes,
          addressesRes,
          cardsRes,
        ]: [OrderPaymentResponse, ProfileAddressResponse, OrderCardsResponse] = data;

        const orderData = orderRes.data.data;
        this.orderData = orderData;
        const selectedAddress = orderData.order.user_address_id;
        const selectedCard = orderData.order.payment_card_id;
        const addresses = addressesRes.data.data;
        addresses.forEach((address) => {
          address.isActive = String(address.id) === String(selectedAddress);
        });
        this.addresses = addresses;
        const cards = cardsRes.data.data;
        cards.forEach((card) => {
          card.is_active = String(card.id) === String(selectedCard);
        });
        this.cards = cards;
        this.loaded = true;
      });
  }

  removeConfirm() {
    if (!this.lastRemovedItem) {
      return;
    }
    if (this.lastRemovedItem.type === ITEMS_TYPES.ADDRESS) {
      createRequest('DELETE', endpoints.order.deleteAddress(this.lastRemovedItem.id, this.orderId))
        .then(this.handleRemoveAddressSuccess)
        .then(this.updateOrder);
    } else {
      createRequest('DELETE', endpoints.order.deleteCard(this.lastRemovedItem.id, this.orderId))
        .then(this.handleRemoveCardSuccess)
        .then(this.updateOrder);
    }
  }

  removeCancel() {
    this.lastRemovedItem = null;
  }

  handleRemoveCardSuccess() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Карта успешно удалена');
    $store.dispatch('profile/loadProfile');
    this.updateCards();
  }

  handleRemoveAddressSuccess() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Адрес успешно удален');
    this.updateAddresses();
  }

  handleOrder() {
    this.submitted = true;
    createRequest('POST', endpoints.order.pay(this.orderId))
      .then((res: OrderPayResponse) => {
        console.log('handleOrder -> ', res);
        const { confirmation_url, status } = res.data.data;
        if (confirmation_url) {
          window.location.href = confirmation_url;
        }
        if (status === PAY_STATUSES.SUCCEEDED) {
          router.push({ path: '/success', query: { oid: String(this.orderId) } });
        }
        if (status === PAY_STATUSES.CANCELED) {
          router.push({ path: `/profile/orders/${this.orderId}` });
        }
        this.submitted = false;
      })
      .finally(() => {
        this.submitted = false;
      });
  }

  mounted() {
    if (this.isAuthorized) {
      this.loadOrder();
    } else {
      this.loaded = true;
      this.$root.$emit('show-login-modal');
    }
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
    padding-top: 15px;

    @include tablet() {
      padding-top: 25px;
      padding-bottom: 85px;
    }
    @include laptop() {
      padding-top: 50px;
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
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
      font-size: 18px;
      padding: 17px;
      padding-bottom: 19px;
      border-radius: 8px;
      width: 100%;

      @include tablet() {
        max-width: 289px;
      }
    }

    &__delivery {
      border-radius: 8px;
      border: 1px solid $grey-6;
      margin-top: 12px;
    }

    &__submit-loader {
      margin-right: 20px;
    }

    &__address-title + &__address-text {
      margin-top: -15px;
    }

    &__address-text {
      margin-top: 0;
      margin-bottom: 30px;
    }

  }
</style>
