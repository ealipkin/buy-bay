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
        .header-main__user-wrap
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

    @include mobile() {
      outline: 1px solid red;
    }
  }

  .header-top {
    padding: 18px 0;
    background-color: #f5f7fb;

    @include mobile() {
      display: none;
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
    align-items: center;
    padding: 12px 10px;
    //@media(max-width: 970px) {
    //  flex-wrap: wrap;
    //}

    &__logo {
      margin-right: 55px;
      @include mobile() {
        margin-right: 15px;
      }
    }

    &__logo-img {
      @include mobile() {
        width: 97px;
      }
    }

    &__user-block {
      margin-left: auto;
      align-items: center;
      display: flex;
      @media(max-width: 970px) {
        margin-left: 0;
      }

      @include mobile() {
        display: none;
      }
    }

    &__user-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }

    &__user-block-favorites{
      text-decoration: none;
      position: relative;
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      svg {
        display: flex;
      }
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
  }

  .input-search {
    display: flex;
    height: 44px;
    @include mobile() {
      height: 28px;
      width: 100%;
    }
    //@media(max-width: 970px) {
    //  order: 1;
    //  margin-left: auto;
    //  margin-right: auto;
    //  margin-top: 13px;
    //}

    @include laptop() {
      order: unset;
    }

    &__inner {
      border: 2px solid #496cff;
      border-radius: 4px 0 0 4px;
      display: flex;
      position: relative;

      @include mobile() {
        border: none;
        width: 100%;
      }

      @include laptop() {
        flex-grow: 1;
      }

      &::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 12px;
        width: 16px;
        height: 16px;
        background-image: url('../assets/icons/find.svg');

        @include mobile() {
          top: 7px;
        }
      }
    }

    &__input {
      border: none;
      border-right: 1px solid #ece1e1;
      padding: 0 10px 0 43px;
      max-width: 307px;
      min-width: 200px;

      @include mobile() {
        border: 1px solid #496cff;
        border-radius: 14px;
        width: 100%;
      }

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

      @media(max-width: 970px) {
        display: none;
      }

      @include mobile() {
        display: none;
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

      @include mobile() {
        display: none;
      }
    }
  }

  .header-bottom {
    display: flex;

    &__navigation-list {
      display: flex;
      padding: 0;
      list-style-type: none;

      @include mobile() {
        overflow: hidden;
      }
    }

    &__navigation-list-item {
      &:not(:last-child) {
        margin-right: 40px;
      }
      @include mobile() {
        flex-shrink: 0;
      }
    }

    &__navigation-list-text {
      font-size: 14px;
      color: #222222;
      text-decoration: none;
    }
  }

</style>
