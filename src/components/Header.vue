<template lang="pug">
  header.header
    .header-top
      .header-top__inner.container
        a(href="#").header-top__text Групповые покупки без наценок
        .header-top__list
          a(href="#").header-top__list-item Доставка
          a(href="#").header-top__list-item Гарантия и возврат
          a(href="#").header-top__list-item Помощь
    .header-main.container
      a(href="#").header-main__logo
        img.header-main__logo-img(src="http://placehold.it/130x40")

      form.header-main__input-search.input-search
        .input-search__inner
          input.input-search__input(placeholder="Поиск товара")
          button(type="button").input-search__category-button Выбрать категорию
            include ../assets/icons/check-mark.svg
        button(type="submit").input-search__submit-button Найти

      .header-main__user-block
        a(href="#").header-main__user-block-favorites
          include ../assets/icons/heart.svg
          span.header-main__favorites-number 23
          p.header-main__favorites-text избранное
        a.header-main__user-block-text Регистрация
        a.header-main__user-block-text.header-main__user-block-text--login Войти

    .header-bottom.container
      ul.header-bottom__navigation-list
        li(v-for="item in navigationList").header-bottom__navigation-list-item
          a(:href="item.href").header-bottom__navigation-list-text {{item.title}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MENU_ITEMS } from '@/utils/constants';

@Component
export default class Header extends Vue {
  menuItems = MENU_ITEMS;

  navigationList = MENU_ITEMS.filter((item) => item.inGeneralMenu);
}
</script>

<style scoped lang="scss">
@import "src/scss/_mixins.scss";

  .header {
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);

    @include tablet() {
      outline: 2px solid red;
    }
  }

  .header-top {
    padding: 18px 0;
    background-color: #f5f7fb;

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
    align-items: center;
    padding: 12px 10px;

    &__logo {
      margin-right: 55px;
    }

    &__user-block {
      margin-left: auto;
      align-items: center;
      display: flex;
    }

    &__user-block-favorites{
      text-decoration: none;
      position: relative;
      margin-right: 30px;
    }

    &__favorites-number {
      position: absolute;
      top: -6px;
      right: 7px;
    }

    &__favorites-text {
      font-size: 12px;
      color: #496cff;
      margin-top: 3px;
      margin-bottom: 0;
    }

    &__favorites-number {
      font-size: 12px;
      font-weight: bold;
      padding: 4px;
      width: 24px;
      height: 19px;
      border-radius: 9px;
      color: #ffffff;
      background-color: #496cff;
    }

    &__user-block-text {
      font-size: 14px;
      color: #6c6c6c;
      font-weight: bold;

      &--login {
        color: #222222;
        background-color: #f5f5f5;
        padding: 11px 27px;
        border-radius: 4px;

        margin-left: 25px;
      }
    }
  }

  .input-search {
    display: flex;
    height: 44px;

    &__inner {
      border: 2px solid #496cff;
      border-radius: 4px 0 0 4px;
      display: flex;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 12px;
        width: 16px;
        height: 16px;
        background-image: url('../assets/icons/find.svg');
      }
    }

    &__input {
      border: none;
      border-right: 1px solid #ece1e1;
      padding: 0 10px 0 43px;
      width: 307px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-size: 14px;
        color: #8e8e8e;
      }
    }

    &__category-button {
      background-color: transparent;
      border: none;
      width: 194px;
      font-size: 14px;
      color: rgba(34, 34, 34, 0.9);
      padding: 6px 18px 6px 15px;

      svg {
        margin-left: 18px;
      }

      &:focus {
        outline: none;
      }
    }

    &__submit-button {
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
      padding: 0 27px;
      border: none;
      opacity: 0.9;
      border-radius: 0 4px 4px 0;
      background-color: #355cff;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }

  .header-bottom {
    display: flex;

    &__navigation-list {
      display: flex;
      padding: 0;
      list-style-type: none;
    }

    &__navigation-list-item {
      &:not(:last-child) {
        margin-right: 40px;
      }
    }

    &__navigation-list-text {
      font-size: 14px;
      color: #222222;
      text-decoration: none;
    }
  }

</style>
