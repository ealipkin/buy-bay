<template lang="pug">
  .main-nav
    .main-nav__inner
      button(type="button" @click="toggleMenu").main-nav__menu-toggle
        span(:class="{'main-nav__burger--opened': isMenuVisible}").main-nav__burger
          span
        span Все категории
      .main-nav__list-wrapper
        .main-nav__list-inner
          ul.main-nav__list
            li(v-for="item in navigationList").main-nav__item
              router-link(:to="item.href").main-nav__link {{item.title}}
    CatalogMenu(:links="menuItems" :class="{'main-nav__menu--visible': isMenuVisible}").main-nav__menu

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MENU_ITEMS } from '@/utils/constants';
import CatalogMenu from '@/components/CatalogMenu.vue';
import clickOutside from '@/utils/clickOutside';

@Component({
  components: { CatalogMenu },
})
export default class MainNav extends Vue {
  isMenuVisible = false;

  menuItems = MENU_ITEMS;

  navigationList = this.menuItems.filter((item) => item.inGeneralMenu);

  mounted() {
    const menu = this.$el.querySelector('.main-nav__menu');
    clickOutside(menu, (e) => {
      const body = document.querySelector('body');
      const isMenuToggle = e.target.closest('.main-nav__menu-toggle');
      if (this.isMenuVisible && !isMenuToggle) {
        this.isMenuVisible = false;
        (body as HTMLBodyElement).classList.remove('_hidden');
      }
    });
  }

  toggleMenu() {
    const body = document.querySelector('body');
    this.isMenuVisible = !this.isMenuVisible;
    if (this.isMenuVisible) {
      (body as HTMLBodyElement).classList.add('_hidden');
    } else {
      (body as HTMLBodyElement).classList.remove('_hidden');
    }
  }
}
</script>

<style scoped lang="scss">
  .main-nav {
    font-family: inherit;
    padding-top: 8px;
    padding-bottom: 10px;
    font-size: 12px;
    color: #222222;

    @include tablet() {
      font-size: 14px;
    }

    @include laptop() {
      padding-top: 13px;
      padding-bottom: 17px;
    }

    &__inner {
      display: flex;
      align-items: center;
      white-space: nowrap;
      margin-left: 1px;
    }

    &__menu-toggle {
      outline: none;
      background: none;
      border: none;
      font-family: inherit;
      display: flex;
      align-items: center;
      padding: 0;

      font-weight: bold;
      margin-right: 18px;

      @include tablet() {
        margin-right: 41px;
      }
    }

    &__list {
      @include clearList();
      display: flex;
      align-items: center;
      overflow: auto;
      padding-bottom: 20px;

      &-wrapper {
        flex: 1;
        width: 1%;
        overflow: hidden;
        margin-right: -10px;
        @include laptop() {
          margin-right: 0;
        }
      }

      &-inner {
        margin-bottom: -20px;
      }
    }

    &__burger {
      display: block;
      width: 20px;
      height: 12px;
      background: none;
      position: relative;
      padding: 0;
      flex-shrink: 0;
      color: inherit;
      border: none;
      margin-right: 12px;
      cursor: pointer;

      @include tablet() {
        margin-left: 3px;
        margin-right: 16px;
      }

      span, &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 1px;
        background: currentColor;
        width: 100%;
        height: 2px;
      }

      &:before {
        content: '';
        position: absolute;
        border-radius: 1px;
        background: currentColor;
        width: 100%;
        height: 2px;
        transform: none;
        top: 0;
        left: 0;
      }

      &:after {
        transform: none;
        bottom: 0;
        left: 0;
        top: auto;
      }
    }

    &__burger--opened {
      &:after, &:before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      span {
        display: none;
      }
    }

    &__link {
      font-size: 12px;
      color: #222222;
      text-decoration: none;
    }

    &__item {
      margin-right: 18px;

      @include laptop() {
        margin-right: 42px;
      }
    }

    &__menu {
      display: none;

      &--visible {
        display: block;
      }
    }

  }
</style>
