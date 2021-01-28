<template lang="pug">
  .profile.profile-page
    .page.page--aside-tablet
      .page__layout
        .page__aside.profile__aside
          h1.page__title Мой профиль
          ProfileNav(:items="profileMenuItems")
        template(v-if="!loaded")
          div(v-if="isAuthorized && user").page__content.profile__content
            UserInfo(:user="user").profile__item.profile__user-info
            ProfileNav(:items="profileMenuItems").profile__item.profile__nav-mobile-only
            Contacts(:user="user").profile__item.profile__contacts
            .profile__address.profile__item
              h3.profile__address-title Адреса доставки
              ul.profile__address-list
                li(v-for="(item) in user.addresses" :key="item.id").profile__address-item
                  AddressItem(:item="item" @remove="removeAddress" @edit="openAddressEditor")
              button(type="button" @click="openAddressModal(null)").link + Добавить адрес

            .profile__cards.profile__item
              h3.profile__cards-title Мои карты
              ul.profile__cards-list
                li(v-for="(item) in user.cards" :key="item.id").profile__cards-item
                  CreditCardItem(:item="item" @change="cardChange" @remove="removeCard")

              button(type="button" @click="handleAddCard").link + Добавить карту
          div(v-if="!isAuthorized").page__content.profile__content
            h1.empty-message Войдите в учетную запись чтобы редактировать данные профиля
        Loader(v-else)
    AddressModal(ref="addressModal")
    CreditCardModal(ref="creditCardModal")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
import { endpoints } from '@/config';

@Component({
  components: {
    Loader,
    ProfileNav,
    UserInfo,
    Contacts,
    AddressItem,
    CreditCardItem,
    AddressModal,
    CreditCardModal,
  },
  computed: {
    ...mapGetters({
      user: 'profile/getProfile',
      loaded: 'profile/getProfileLoaded',
    }),
  },
})
export default class Profile extends Vue {
  profileMenuItems = PROFILE_MENU_ITEMS;

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  openAddressModal(data) {
    const modalComponent: any = this.$refs.addressModal;
    modalComponent.showModal({ ...data });
  }

  openAddressEditor(address: AddressItem) {
    this.openAddressModal(address);
  }

  handleAddCard() {
    createRequest('POST', endpoints.card.create)
      .then((res) => {
        const url = res.data.data.confirmation_url;
        window.location.href = url;
      });
  }

  openCreditCardModal() {
    const modalComponent: any = this.$refs.creditCardModal;
    modalComponent.showModal();
  }

  async mounted() {
    if (this.isAuthorized) {
      $store.dispatch('profile/loadProfile');
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
