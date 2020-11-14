<template lang="pug">
.profile
  .page.page--aside-tablet
    Breadcrumbs.profile__breadcrumbs(:links="Breadcrumbs")
    .page__layout
      .page__aside.profile__aside
        h1.page__title Мой профиль
        ProfileNav(:items="profileMenuItems")

      .page__content.profile__content
        UserInfo(:user="user").profile__item.profile__user-info
        ProfileNav(:items="profileMenuItems").profile__item.profile__nav-mobile-only
        Contacts(:contacts="user.contacts").profile__item.profile__contacts
        .profile__address.profile__item
          h3.profile__address-title Адреса доставки
          ul.profile__address-list
            li(v-for="(item, i) in user.addresses" :key="item.id").profile__address-item
              AddressItem(:item="item" :i="i" @change="addressChange" @remove="removeAddress" @edit="openAddressEditor")
          button(type="button" @click="addAddress").link + Добавить адрес

        .profile__cards.profile__item
          h3.profile__cards-title Мои карты
          ul.profile__cards-list
            li(v-for="(item, i) in user.cards" :key="item.id").profile__cards-item
              CreditCardItem(:item="item" :i="i" @change="cardChange" @remove="removeCard")

          button(type="button" @click="addCard").link + Добавить карту
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import UserInfo from '@/components/UserInfo.vue';
import Contacts from '@/components/Contacts.vue';
import AddressItem from '@/components/AddressItem.vue';
import CreditCardItem from '@/components/CreditCardItem.vue';
import { BreadcrumbLink } from '@/utils/models';
import { createProfileUser } from '@/utils/data';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    UserInfo,
    Contacts,
    AddressItem,
    CreditCardItem,
  },
})
export default class Profile extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль', current: true },
  ];

  profileMenuItems = PROFILE_MENU_ITEMS;

  user = createProfileUser(null, 1);

  addAddress = () => {
    console.log('addAddress');
  }

  addressChange = ({ item, index }) => {
    if (item.isActive) {
      return;
    }

    this.user.addresses.forEach((address) => address.isActive = false);
    item.isActive = true;
    Vue.set(this.user.addresses, index, item);
  }

  removeAddress = (id: string) => {
    this.user.addresses = this.user.addresses.filter((address) => address.id !== id);
  }

  openAddressEditor = (id: string) => {
    console.log('edit address:', id);
  }

  addCard = () => {
    console.log('addCard');
  }

  cardChange = ({ item, index }) => {
    if (item.isActive) {
      return;
    }

    this.user.cards.forEach((card) => card.isActive = false);
    item.isActive = true;
    Vue.set(this.user.cards, index, item);
  }

  removeCard = (id: string) => {
    this.user.cards = this.user.cards.filter((card) => card.id !== id);
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
