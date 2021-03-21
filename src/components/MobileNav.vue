<template lang="pug">
  .mobile-nav
    ul.mobile-nav__list
      li.mobile-nav__item
        router-link(to="/" title="Главная").mobile-nav__link
          include ../assets/icons/shop.svg
      li.mobile-nav__item
        router-link(to="/catalog" title="Каталог").mobile-nav__link
          include ../assets/icons/docs.svg
      li.mobile-nav__item
        button(@click="toggleNotifications").mobile-nav__link
          include ../assets/icons/bell.svg
          span.mobile-nav__count {{unreadNotifications.length || 0}}
      li.mobile-nav__item
        router-link(to="/profile/favourites" title="Избранное").mobile-nav__link
          include ../assets/icons/heart.svg

      li.mobile-nav__item
        router-link(to="/profile" title="Профиль" v-if="isAuthorized").mobile-nav__link
          include ../assets/icons/user.svg
        button(@click="login" v-if="!isAuthorized").mobile-nav__link
          include ../assets/icons/user.svg

</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import router from '@/router';
import { NotificationItem } from '@/models/models';
import { mapGetters } from 'vuex';

@Component({
  components: {},
  computed: {
    ...mapGetters({
      unreadNotifications: 'app/getUnreadNotifications',
    }),
  },
})
export default class MobileNav extends Vue {
  @Watch('$route') routeChange() {
    this.waitForAuth = false;
  }

  @Watch('isAuthorized') isAuthorizedChanged(val) {
    if (val && this.waitForAuth) {
      router.push({ path: '/profile' });
    }
  }

  @Prop() public notifications!: NotificationItem[];

  waitForAuth = false;

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  toggleNotifications(event) {
    this.$emit('toggle-notifications');
  }

  login() {
    this.$emit('show-login');
    this.waitForAuth = true;
  }
}
</script>

<style scoped lang="scss">
  .mobile-nav {

    &__list {
      @include clearList();
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      padding: 10px 22px;
      box-shadow: 0 -2px 8px 0 #00000019;
      background-color: #ffffff;
    }

    &__link {
      @include clearButton();
      position: relative;
      outline: none;
      width: 24px;
      display: block;
      color: $iconGray;

      svg {
        width: 100%;
      }

      &--active {
        color: $blue;
      }
    }

    &__link.router-link-exact-active {
      color: $blue;
    }

    &__count {
      top: -7px;
      margin-left: -10px;
      position: absolute;
      text-align: center;
      padding-top: 1px;
      left: 100%;
      font-size: 14px;
      color: #ffffff;
      background-color: $blue;
      height: 19px;
      min-width: 19px;
      border-radius: 19px;
      display: block;
    }
  }
</style>
