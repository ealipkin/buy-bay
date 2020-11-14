<template lang="pug">
  .mobile-nav
    ul.mobile-nav__list
      li(v-for="(item, index) in items").mobile-nav__item
        router-link(v-if="item.href" :to="item.href" :class="{'mobile-nav__link--active': item.isActive}" :data-index="index").mobile-nav__link
          template(v-if="item.icon === 'shop'")
            include ../assets/icons/shop.svg
          template(v-if="item.icon === 'docs'")
            include ../assets/icons/docs.svg
          template(v-if="item.icon === 'bell'")
            include ../assets/icons/bell.svg
          template(v-if="item.icon === 'heart'")
            include ../assets/icons/heart.svg
          template(v-if="item.icon === 'user'")
            include ../assets/icons/user.svg
          span(v-if="item.count").mobile-nav__count {{item.count}}

        button(v-else @click="item.action" type="button" :class="{'mobile-nav__link--active': item.isActive}" :data-index="index").mobile-nav__link
          template(v-if="item.icon === 'shop'")
            include ../assets/icons/shop.svg
          template(v-if="item.icon === 'docs'")
            include ../assets/icons/docs.svg
          template(v-if="item.icon === 'bell'")
            include ../assets/icons/bell.svg
          template(v-if="item.icon === 'heart'")
            include ../assets/icons/heart.svg
          template(v-if="item.icon === 'user'")
            include ../assets/icons/user.svg
          span(v-if="item.count").mobile-nav__count {{item.count}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NotificationItem } from '@/utils/models';

@Component({
  components: {},
})
export default class MobileNav extends Vue {
  @Prop() public notifications!: NotificationItem[];

  toggleNotifications(event) {
    const { target } = event;
    const link = target.closest('.mobile-nav__link');
    const { index } = link.dataset;
    const item = this.items[index];
    const active = item.isActive;
    this.items.forEach((item) => item.isActive = false);
    Vue.set(this.items, index, { ...item, isActive: !active });
    this.$emit('toggle-notifications');
  }

  items = [
    {
      href: '#',
      title: '',
      icon: 'shop',
    },
    {
      href: '#',
      title: '',
      icon: 'docs',
    },
    {
      count: 9,
      title: 'Уведомления',
      icon: 'bell',
      action: this.toggleNotifications,
      isActive: false,
    },
    {
      href: '/profile/favourites',
      title: 'Избранное',
      icon: 'heart',
    },
    {
      href: '/profile',
      title: 'Профиль',
      icon: 'user',
    },
  ];
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
