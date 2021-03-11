<template lang="pug">
  .profile.profile-page
    .page.page--aside-tablet
      .page__layout
        .page__aside.profile__aside
          h1.page__title Мой профиль
          ProfileNav(:items="profileMenuItems")
        template(v-if="!loaded")
          div(v-if="isAuthorized && user").page__content
            .profile__content
              UserInfo(:user="user").profile__item.profile__user-info
              ProfileNav(:items="profileMenuItems").profile__item.profile__nav-mobile-only
              Contacts(:user="user").profile__item.profile__contacts
              .profile__address.profile__item
                h3.profile__address-title Адреса доставки
                ul.profile__address-list
                  li(v-for="(item) in user.addresses" :key="item.id").profile__address-item
                    AddressItem(:item="item" @edit="openAddressEditor" @remove="handleAddressRemove" @select="handleAddressSelect")
                button(type="button" @click="openAddressModal(null)").link + Добавить адрес

              .profile__cards.profile__item
                h3.profile__cards-title Мои карты
                ul.profile__cards-list
                  li(v-for="(item) in user.cards" :key="item.id").profile__cards-item
                    CreditCardItem(:item="item" @remove="handleRemoveCard" @select="handleSelectCard")

                button(type="button" @click="handleAddCard").link + Добавить карту
            SeoBlock(:block="user.seo_block")
          div(v-if="!isAuthorized").page__content.profile__content
            h1.empty-message Войдите в учетную запись чтобы редактировать данные профиля
        Loader(v-else)
    AddressModal(ref="addressModal" @update="handleUpdateAddress" @add="handleAddAddress")
    CreditCardModal(ref="creditCardModal")
    ConfirmationModal(ref="confirmationModal" @confirm="removeConfirm" @cancel="removeCancel")
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import ProfileNav from '@/components/ProfileNav.vue';
import UserInfo from '@/components/UserInfo.vue';
import Contacts from '@/components/Contacts.vue';
import AddressItem from '@/components/AddressItem.vue';
import CreditCardItem from '@/components/CreditCardItem.vue';
import AddressModal from '@/components/AddressModal.vue';
import CreditCardModal from '@/components/CreditCardModal.vue';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';
import Loader from '@/components/Loader.vue';
import $store from '@/store';
import { mapGetters } from 'vuex';
import { createRequest } from '@/services/http.service';
import { endpoints, YOOKASSA_ID } from '@/config';
import { CardItem, UserAddressItem } from '@/models/models';
import Toasted from '@/components/Toasted.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import SeoBlock from '@/components/SeoBlock.vue';

enum ITEMS_TYPES {
  CARD = 'card',
  ADDRESS = 'address',
}

declare const YooMoneyCheckoutUI;

@Component({
  components: {
    SeoBlock,
    ConfirmationModal,
    Loader,
    ProfileNav,
    UserInfo,
    Contacts,
    AddressItem,
    CreditCardItem,
    AddressModal,
    CreditCardModal,
    Toasted,
  },
  computed: {
    ...mapGetters({
      user: 'profile/getProfile',
      loaded: 'profile/getProfileLoaded',
    }),
  },
})
export default class Profile extends Vue {
  @Watch('isAuthorized') isAuthorizedChanged(val) {
    if (val) {
      this.$nextTick(() => {
        $store.dispatch('profile/loadProfile');
      });
    }
  }

  yooKassa: any = null;

  yooKassaModal: HTMLElement | null = null;

  profileMenuItems = PROFILE_MENU_ITEMS;

  lastRemovedItem: { type: ITEMS_TYPES; id: any } | null = null;

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  openAddressModal(data) {
    const modalComponent: any = this.$refs.addressModal;
    modalComponent.showModal({ ...data });
  }

  openAddressEditor(address: AddressItem) {
    console.log(address);
    this.openAddressModal(address);
  }

  async handleAddCard() {
    this.initYooKassa();
    const modal = new YooMoneyCheckoutUI(YOOKASSA_ID, {
      language: 'ru',
      domSelector: '.$addCard',
      amount: 1,
    });
    modal.open();
    modal.on('yc_success', async (res) => {
      const { paymentToken } = res.data.response;
      const createRes = await createRequest('POST', endpoints.card.create, { paymentToken });
      const { pid, confirmation_url } = createRes.data.data;
      if (confirmation_url) {
        window.location.href = confirmation_url;
      } else {
        await createRequest('GET', endpoints.card.getByPid(pid))
          .then(() => {
            this.$root.$emit('show-toast', {
              message: 'Карта успешно добавлена',
            });
            $store.dispatch('profile/loadProfile');
          })
          .catch((err) => {
            const { message } = err.data;
            this.$root.$emit('show-toast', {
              message,
              type: 'error',
            });
          }).finally(() => {
            modal.chargeSuccessful();
            modal.close();
          });
      }
    });

    if (this.yooKassaModal) {
      this.yooKassaModal.classList.add('yookasssa-add-card');
      this.yooKassaModal.classList.remove('yookasssa-payment');
      const title = this.yooKassaModal.querySelector('.yoomoney-checkout-bank-card__logo');
      if (title) {
        title.innerHTML = 'Добавить карту';
      }
    }
  }

  initYooKassa() {
    const exist = document.querySelector('.yoomoney-checkout-ui_status_created');
    if (exist) {
      exist.remove();
    }
    this.yooKassa = (window as any).YooMoneyCheckoutUI(YOOKASSA_ID);
    this.yooKassaModal = document.querySelector('.yoomoney-checkout-cardpayment__window');
  }

  openCreditCardModal() {
    const modalComponent: any = this.$refs.creditCardModal;
    modalComponent.showModal();
  }

  openConfirmationModal() {
    const modalComponent: any = this.$refs.confirmationModal;
    modalComponent.showModal();
  }

  handleAddressRemove(id) {
    this.lastRemovedItem = { type: ITEMS_TYPES.ADDRESS, id };
    this.openConfirmationModal();
  }

  handleAddressSelect(address: UserAddressItem) {
    const newAddress: UserAddressItem = {
      ...address,
      isActive: true,
    };
    delete newAddress.created_at;
    delete newAddress.updated_at;
    createRequest('POST', endpoints.address.update(newAddress.id), newAddress);
  }

  handleRemoveAddressSuccess() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Адрес успешно удален');
    $store.dispatch('profile/loadProfile');
  }

  handleAddAddress(data: { address: UserAddressItem }) {
    delete data.address.created_at;
    delete data.address.updated_at;
    createRequest('PUT', endpoints.address.create, data.address).then(() => this.handleAddAddressSuccess());
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
    $store.dispatch('profile/loadProfile');
  }

  handleRemoveCard(card: CardItem) {
    this.lastRemovedItem = { type: ITEMS_TYPES.CARD, id: card.id };
    this.openConfirmationModal();
  }

  handleSelectCard(card: CardItem) {
    createRequest('GET', endpoints.card.setActive(card.id));
  }

  handleRemoveCardSuccess() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Карта успешно удалена');
    $store.dispatch('profile/loadProfile');
  }

  removeConfirm() {
    if (!this.lastRemovedItem) {
      return;
    }
    if (this.lastRemovedItem.type === ITEMS_TYPES.ADDRESS) {
      createRequest('DELETE', endpoints.address.get(this.lastRemovedItem.id)).then(this.handleRemoveAddressSuccess);
    } else {
      createRequest('DELETE', endpoints.card.edit(this.lastRemovedItem.id)).then(this.handleRemoveCardSuccess);
    }
  }

  removeCancel() {
    this.lastRemovedItem = null;
  }

  async mounted() {
    if (this.isAuthorized) {
      $store.dispatch('profile/loadProfile');
      $store.dispatch('app/updateProfileCounts');
    } else {
      this.$root.$emit('show-login-modal');
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    @include container();
    padding-bottom: 10px;

    @include laptop() {
      background-color: $grey-3;
      padding-bottom: 155px;
    }

    &__nav-mobile-only {
      @include tablet() {
        display: none;
      }
    }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }

    &__aside {
      display: none;

      @include tablet() {
        display: block;
      }
    }

    &__content {
      @include tablet() {
        background-color: #fff;
        border-radius: 8px;
        padding: 32px 40px 115px;
        margin-top: 53px;
      }
    }

    &__item {
      margin-right: -10px;
      margin-left: -10px;
      margin-bottom: 12px;
      border-radius: 0;

      @include tablet() {
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 0;
      }
    }

    &__user-info {
      @include tablet() {
        margin-bottom: 58px;
      }
    }

    &__contacts {
      @include tablet() {
        margin-bottom: 68px;
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

  }
</style>
