<template lang="pug">
.my-profile
  .page.page--aside-tablet
    Breadcrumbs.my-profile__breadcrumbs(:links="Breadcrumbs")
    .page__layout
      .page__aside.my-profile__aside
        h1.page__title Мой профиль
        ProfileNav(:items="profileMenuItems")

      .page__content.my-profile__content
        UserInfo(:user="user").my-profile__item.my-profile__user-info
        ProfileNav(:items="profileMenuItems").my-profile__item.my-profile__nav-mobile-only
        MyContacts(:contacts="user.contacts").my-profile__item.my-profile__contacts
        .my-profile__address.my-profile__item
          h3.my-profile__address-title Адреса доставки
          ul.my-profile__address-list
            AddressItem(:item="item" v-for="item in user.receivers").my-profile__address-item
          span.link + Добавить адрес

        .my-profile__cards.my-profile__item
          h3.my-profile__cards-title Мои карты
          ul.my-profile__cards-list
            CreditCardItem(:item="item" v-for="item in user.cards").my-profile__cards-item

          span.link + Добавить карту
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import UserInfo from '@/components/UserInfo.vue';
import MyContacts from '@/components/MyContacts.vue';
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
    MyContacts,
    AddressItem,
    CreditCardItem,
  },
})
export default class MyGroups extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль', current: true },
  ];

  profileMenuItems = PROFILE_MENU_ITEMS;

  user = createProfileUser(null, 1);
}
</script>

<style lang="scss" scoped>
.my-profile {
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
