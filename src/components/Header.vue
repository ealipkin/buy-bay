<template lang="pug">
  header.header
    .header-top
      .header-top__inner.container
        a.header-top__text Групповые покупки без наценок
        .header-top__list
          a.header-top__list-item Доставка
          a.header-top__list-item Гарантия и возврат
          a.header-top__list-item Помощь
    .header-main.container
      a.header-main__logo
        img.header-main__logo-img(src="http://placehold.it/130x40")

      form.header-main__input-search.input-search
        .input-search__inner
          input.input-search__input(placeholder="Поиск товара")
          button(type="button").input-search__category-button Выбрать категорию
            include ../assets/icons/check-mark.svg
        button(type="submit").input-search__submit-button Найти

      .header-main__user-block
        a.header-main__user-block-text Регистрация
        a.header-main__user-block-text.header-main__user-block-text--login Войти

    .header-bottom.container
      ul.header-bottom__navigation-list
        li(v-for="item in navigationList").header-bottom__navigation-list-item
          a(:href="item.href").header-bottom__navigation-list-text {{item.text}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  navigationList = [
    {
      text: 'Гаджеты',
      href: '/',
    },
    {
      text: 'Смартфоны',
      href: '/',
    },
    {
      text: 'Женский гардероб',
      href: '/',
    },
    {
      text: 'Электроника',
      href: '/',
    },
    {
      text: 'Детские товары',
      href: '/',
    },
    {
      text: 'Хобби',
      href: '/',
    },
    {
      text: 'Дача',
      href: '/',
    },
  ]
}
</script>

<style scoped lang="scss">
  .header {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
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
    }

    &__list {
      display: flex;
      margin-left: auto;
    }

    &__list-item {
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
    padding: 13px 0;

    &__logo {
      margin-right: 55px;
    }

    &__user-block {
      margin-left: auto;
      align-items: center;
      display: flex;
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
