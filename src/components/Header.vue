<template lang="pug">
  header.header
    div.header__mobile-nav
      MobileNav(@toggle-notifications="toggleNotifications")
      Notifications(:notifications="notifications" v-if="showNotifications").header__mobile-notifications
    .header-top
      .header-top__inner.container
        .header-top__text Групповые покупки без наценок
        .header-top__list
          router-link(to="#").header-top__list-item Доставка
          router-link(to="#").header-top__list-item Гарантия и возврат
          router-link(to="#").header-top__list-item Помощь

    div(:class="{'header-main--search-focused': searchFocused}").header-main.container
      div(v-if="showProfileHeader").header-main__profile-page
        router-link(to='/profile').header-main__profile-link {{profilePage}}
        button(type="button" @click="handleProfileSearch").header-main__profile-search
          include ../assets/icons/search.svg

      router-link(to='/').header-main__logo
        include ../assets/icons/kupide-logo.svg

      SearchField(@focus="searchFocused = true" @blur="searchFocused = false" ref="search").header-main__input-search

      .header-main__user-block
        router-link(to="/profile/favourites").notification-button.header__fav-btn
          span.notification-button__icon
            include ../assets/icons/heart.svg
            span.notification-button__number 23
          p.notification-button__text Избранное
        div(v-if="!showLogin").header-main__user-wrap
          button(type="button" @click="openLoginModal('register')").header-main__user-block-text Регистрация
          button(type="button" @click="openLoginModal('login')").button.button--secondary Войти

        div(v-if="showLogin").header-main__user-wrap
          .header__item
            Popper(popper trigger="clickToToggle" :options="{placement: 'bottom'}" ref="notificationsPopper")
              button(type="button" slot="reference").notification-button.header__notification-toggle
                span.notification-button__icon
                  include ../assets/icons/bell.svg
                  span.notification-button__number 9
                p.notification-button__text Уведомления
              .popper.header__dropdown
                Notifications(:notifications="notifications").header__notifications

          Popper(popper trigger="clickToToggle" :options="{placement: 'bottom-end'}" )
            button(type="button" slot="reference").header__user-btn
              span.header__user-name {{user.name}}
              span.header__user-avatar
                img(:src="user.avatar")
            .popper.header__dropdown
              ProfileNav(:items="profileMenuItems")

    .header-inner
      HeaderShopCard(:shop="selectedShop" v-if="selectedShop")
    .header-bottom
      MainNav(v-if="mainMenu" :main-menu="mainMenu").container
    .container
    LoginModal(ref="loginModal" @login-success="loginSuccess" @register-success="registerSuccess")
</template>

<script lang="ts">
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

import MainNav from '@/components/MainNav.vue';
import HeaderShopCard from '@/components/HeaderShopCard.vue';
import LoginModal from '@/components/LoginModal.vue';
import Notifications from '@/components/Notifications.vue';
import { getRandomNumberBetween } from '@/utils/data';
import { NOTIFICATIONS, PROFILE_MENU_ITEMS } from '@/utils/constants';
import { NotificationItem } from '@/utils/models';
import ProfileNav from '@/components/ProfileNav.vue';
import MobileNav from '@/components/MobileNav.vue';
import { Action } from 'vuex-class';
import SearchField from '@/components/SearchField.vue';

@Component({
  components: {
    SearchField,
    MobileNav,
    ProfileNav,
    Notifications,
    LoginModal,
    HeaderShopCard,
    MainNav,
    Popper,
  },
  computed: {
    ...mapGetters({
      selectedShop: 'app/getSelectedShop',
      profilePage: 'app/getProfilePage',
      mainMenu: 'app/getMainMenu',
    }),
  },
})
export default class Header extends Vue {
  @Action('app/fetchMenu') fetchMenu;

  isAuthenticated = false;

  showNotifications = false;

  searchFocused = false;

  body: HTMLBodyElement | null = null;

  user = {
    name: 'Владимир',
    avatar: `https://picsum.photos/id/${getRandomNumberBetween(0, 100)}/100`,
  };

  selectedShop;

  profilePage;

  notifications: NotificationItem[] = NOTIFICATIONS;

  profileMenuItems = PROFILE_MENU_ITEMS;

  get showProfileHeader() {
    const res = !this.searchFocused && this.profilePage;
    console.log(res);
    return res;
  }

  get showLogin() {
    return this.isAuthenticated;
  }

  set showLogin(value) {
    this.isAuthenticated = value;
  }

  openLoginModal(type) {
    const modalComponent: any = this.$refs.loginModal;
    modalComponent.showModal(type);
  }

  mounted() {
    // this.showLogin = true;
    this.body = document.querySelector('body');
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        (this.body as HTMLBodyElement).classList.remove('_hidden');
      }
    });
  }

  loginSuccess() {
    this.showLogin = true;
  }

  registerSuccess() {
    this.showLogin = true;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    (this.body as HTMLBodyElement).classList.toggle('_hidden', this.showNotifications);
  }

  handleProfileSearch() {
    (this.$refs.search as any).doFocus();
    setTimeout(() => {
      this.searchFocused = true;
    }, 0);
  }

  async created() {
    await this.fetchMenu();
  }
}
</script>

<style lang="scss">
  .header__dropdown {
    .profile-nav {
      min-width: 213px;
    }

    .profile-nav__item-count {
      display: none;
    }

    .profile-nav__item {
      &:after {
        display: none;
      }
    }

    .profile-nav__link {
      padding: 14px 26px 14px 17px;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background-color: #f7f7fa;
      }
    }
  }

  .header {
    .notifications__inner {
      max-height: none;
    }
  }
</style>
<style scoped lang="scss">
  @import "src/scss/_mixins.scss";

  .header {
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
    position: relative;

    /*
    position: sticky;
    top: 0;
    z-index: 100;
    */

    &__mobile-nav {
      @include tablet() {
        display: none;
      }
    }

    &__mobile-notifications {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      height: calc(100% - 49px);
      z-index: 1;
      background: white;
      @include tablet() {
        display: none;
      }
    }

    &__dropdown {
      margin-top: 25px;
    }

    &__notifications {
      overflow: hidden;
      border-radius: 8px;
    }

    &__notification-toggle {
    }

    &__fav-btn {
      margin-right: 15px;
      margin-left: 15px;
      @include tablet() {
        margin-left: 12px;
        margin-right: 37px;
      }
    }

    &__user-btn {
      @include clearButton();
      display: flex;
      align-items: center;
      margin-left: 34px;
    }

    &__user-name {
      font-size: 14px;
      font-weight: 600;
      color: #222222;
    }

    &__user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: block;
      margin: 0 0 0 15px;
      border: solid 1px #ffffff5e;

      img {
        max-width: 100%;
      }
    }
  }

  .header-top {
    padding: 16px 0;
    background-color: #f5f7fb;
    display: none;
    @include laptop() {
      display: block;
    }

    &__inner {
      display: flex;
    }

    &__text {
      font-size: 14px;
      color: #8a8a8a;
      text-decoration: none;
    }

    &__list {
      display: flex;
      margin-left: auto;
    }

    &__list-item {
      text-decoration: none;
      font-size: 14px;
      color: #8a8a8a;

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  .header-main {
    display: flex;
    padding: 8px 16px 9px 11px;
    box-shadow: inset 0 -1px 0 0 #00000014;
    position: relative;

    @include tablet() {
      align-items: center;
      padding-top: 15px;
      padding-bottom: 15px;
      justify-content: flex-start;
      padding-right: 6px;
    }

    @include laptop() {
      box-shadow: none;
      padding-top: 12px;
    }

    &__profile-page {
      position: absolute;
      width: 100%;
      height: 100%;
      text-decoration: none;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
      left: 0;
      top: 0;
      padding: 0 10px;
      box-shadow: inset 0 -1px 0 0 #00000014;
      @include tablet() {
        display: none;
      }
    }

    &__profile-link {
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      color: #222222;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        width: 21px;
        height: 20px;
        display: block;
        background: url(../assets/icons/arrow-back.svg) no-repeat center;
        background-size: 140%;
        margin-right: 28px;
      }
    }

    &__profile-search {
      @include clearButton();
      color: $blue;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    &__logo {
      display: flex;
      align-items: center;
      width: 120px;
      flex-shrink: 0;
      margin-right: 13px;

      svg {
        width: 100%;
        display: block;
      }

      @include laptop() {
        margin-left: -3px;
        width: 155px;
        margin-right: 52px;
      }
    }

    &__input-search {
      margin-top: 3px;
      @include laptop() {
        margin-top: 0;
      }
    }

    &__user-block {
      margin-left: auto;
      align-items: center;
      display: none;

      @include tablet() {
        display: flex;
      }
      @include laptop() {
        margin-left: 39px;
      }
    }

    &__user-wrap {
      display: flex;
      /*flex-wrap: wrap;*/
      align-items: center;
      justify-content: space-between;
    }

    &__user-block-text {
      cursor: pointer;
      @include clearButton();
      font-size: 14px;
      color: #6c6c6c;
      font-weight: bold;

      &:not(:last-child) {
        margin-right: 25px;
      }

      &--login {
        color: #222222;
        background-color: #f5f5f5;
        padding: 11px 27px;
        border-radius: 4px;
      }
    }

    &--search-focused & {
      &__logo {
        @media (max-width: 767px) {
          display: none;
        }
      }
    }
  }

  .header-bottom {

    box-shadow: inset 0 -1px 0 0 #00000014;

    &__navigation-list-text {
      font-size: 14px;
      color: #222222;
      text-decoration: none;
    }
  }

</style>
