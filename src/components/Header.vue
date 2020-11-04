<template lang="pug">
  header.header
    .header-top
      .header-top__inner.container
        .header-top__text Групповые покупки без наценок
        .header-top__list
          router-link(to="#").header-top__list-item Доставка
          router-link(to="#").header-top__list-item Гарантия и возврат
          router-link(to="#").header-top__list-item Помощь
    .header-main.container
      router-link(to='/').header-main__logo
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 43"><g fill="none" fill-rule="evenodd"><path fill="#303459" fill-rule="nonzero" d="M102.996 31c2.002 0 3.548-.444 4.638-1.33 1.09-.888 1.636-2.153 1.636-3.797 0-1.229-.336-2.187-1.007-2.875-.671-.687-1.72-1.137-3.143-1.349v-.073c1.212-.195 2.134-.637 2.765-1.324.63-.688.946-1.549.946-2.582 0-1.514-.517-2.645-1.55-3.394-1.034-.748-2.654-1.123-4.86-1.123h-4.894V31h5.469zm-.293-9.9h-3.931v-6.848h3.601c1.7 0 2.98.269 3.84.806.858.537 1.287 1.4 1.287 2.588 0 1.188-.38 2.06-1.141 2.618-.761.557-1.98.836-3.656.836zm.268 8.801h-4.199V22.2h3.93c3.484 0 5.225 1.225 5.225 3.674 0 2.686-1.652 4.028-4.956 4.028zM110.124 31l2.49-6.299h7.251L122.343 31h1.404l-7.031-17.92h-.793L108.745 31h1.38zm9.326-7.422h-6.384l2.502-6.409c.26-.634.501-1.342.72-2.124.286.896.53 1.595.733 2.1l2.43 6.433zM128.068 31v-6.897l5.945-10.95h-1.343l-5.224 9.766-5.2-9.766h-1.429l5.97 11.048V31h1.281zm-77.145 0c2.019 0 3.616-.456 4.792-1.367 1.176-.912 1.764-2.181 1.764-3.809 0-1.147-.25-2.067-.751-2.759-.5-.691-1.317-1.163-2.448-1.416v-.122a2.996 2.996 0 001.996-1.233c.5-.683.75-1.558.75-2.624 0-1.57-.57-2.716-1.714-3.436-1.144-.72-2.98-1.08-5.512-1.08h-5.554V31h6.677zm-.695-10.779H48.03v-3.967h1.99c1.082 0 1.874.148 2.374.445.5.298.751.788.751 1.471 0 .733-.23 1.258-.69 1.575-.46.317-1.202.476-2.227.476zm.268 7.654H48.03v-4.65h2.344c2.116 0 3.174.74 3.174 2.22 0 .823-.248 1.433-.745 1.832-.496.399-1.265.598-2.307.598zm16.25 3.37c1.523 0 2.841-.265 3.956-.794 1.115-.53 1.967-1.29 2.557-2.283.59-.993.885-2.148.885-3.467V13.153h-3.772v10.901c0 1.384-.278 2.399-.836 3.046-.557.647-1.454.97-2.691.97-1.278 0-2.194-.321-2.747-.964-.553-.643-.83-1.652-.83-3.027V13.153h-3.772v11.5c0 2.042.635 3.651 1.904 4.827 1.27 1.176 3.052 1.764 5.347 1.764zM84.525 31v-6.946l5.92-10.9h-4.077l-3.723 7.348-3.7-7.349h-4.1l5.92 11.023V31h3.76z"/><path fill="#496CFF" d="M21.268 3.077L1.698 22.744a.999.999 0 00.708 1.706H6.14a2 2 0 011.874 2.7l-4.35 11.63a.999.999 0 001.637 1.065l19.952-19.583a1 1 0 00-.7-1.714h-3.78a2 2 0 01-1.892-2.648l4.041-11.793a1 1 0 00-1.655-1.03z"/></g></svg>

      form(@submit="searchSubmit").header-main__input-search.input-search
        .input-search__inner
          input.input-search__input(placeholder="Найти товар" v-model="search")
          button(type="button").input-search__category-button Выбрать категорию
            include ../assets/icons/check-mark.svg
        button(type="submit").input-search__submit-button.button Найти

      .header-main__user-block
        router-link(to="#").header-main__user-block-favorites
          span.header-main__favorites-icon
            include ../assets/icons/heart.svg
            span.header-main__favorites-number 23
          p.header-main__favorites-text Избранное
        .header-main__user-wrap
          button(type="button" @click="openLoginModal()").header-main__user-block-text Регистрация
          button(type="button" @click="openLoginModal()").header-main__user-block-text.header-main__user-block-text--login Войти
    .header-inner
      HeaderShopCard(:shop="selectedShop" v-if="selectedShop")
    .header-bottom
      MainNav.container

    LoginModal(ref="loginModal")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';
import router from '@/router';
import HeaderShopCard from '@/components/HeaderShopCard.vue';
import { mapGetters } from 'vuex';
import LoginModal from '@/components/LoginModal.vue';

@Component({
  components: { LoginModal, HeaderShopCard, MainNav },
  computed: {
    ...mapGetters({
      selectedShop: 'app/getSelectedShop',
    }),
  },
})
export default class Header extends Vue {
  search = '';

  selectedShop;

  searchSubmit(event) {
    event.preventDefault();
    console.log('searchSubmit');
    console.log(this.search);
    if (this.search && this.search.length) {
      router.push({ path: '/search', query: { q: this.search } });
    }
  }

  openLoginModal() {
    const modalComponent: any = this.$refs.loginModal;
    modalComponent.showModal();
  }

  mounted() {
    this.openLoginModal();
  }
}
</script>

<style scoped lang="scss">
  @import "src/scss/_mixins.scss";

  .header {
    background: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
    position: relative;
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
    padding: 8px 16px 3px 11px;
    box-shadow: inset 0 -1px 0 0 #00000014;

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

    &__logo {
      display: block;
      width: 102px;
      flex-shrink: 0;
      margin-right: 13px;

      @include laptop() {
        margin-left: -3px;
        width: 135px;
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
        margin-left: 35px;
      }
    }

    &__user-wrap {
      display: flex;
      /*flex-wrap: wrap;*/
      align-items: center;
      justify-content: space-between;
    }

    &__favorites-icon {
      display: block;
      margin: 0 auto;
      width: 28px;
      color: $blue;
      position: relative;
    }

    &__user-block-favorites {
      text-decoration: none;
      position: relative;
      margin-right: 15px;
      margin-left: 15px;
      text-align: center;

      svg {
        display: flex;
      }

      @include tablet() {
        margin-left: 12px;
        text-align: center;
        margin-top: 6px;
        margin-right: 37px;
      }
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
      height: 18px;
      border-radius: 9px;
      color: #ffffff;
      background-color: #496cff;
      position: absolute;
      padding: 0 6px;
      top: 2px;
      transform: translateY(-50%);
    }

    &__user-block-text {
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
  }

  .input-search {
    display: flex;
    height: 28px;
    box-sizing: border-box;
    width: 100%;
    @include tablet() {
      height: 44px;
    }

    &__inner {
      border-radius: 4px 0 0 4px;
      display: flex;
      position: relative;
      border: none;
      width: 100%;
      box-sizing: border-box;
      @include tablet() {
        height: 44px;
        border: 2px solid #496cff;
      }

      @include laptop() {
        flex-grow: 1;
      }

      &::before {
        content: '';
        position: absolute;
        left: 11px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 16px;
        background: url('../assets/icons/find.svg') no-repeat center;
        background-size: contain;

        @include laptop() {
          width: 16px;
        }
      }
    }

    &__input {
      padding: 2px 10px 4px 32px;
      border: 1px solid #496cff;
      border-radius: 14px;
      box-sizing: border-box;
      width: 100%;
      font-size: 12px;

      @include tablet() {
        border: none;
      }

      @include laptop() {
        padding-left: 43px;
        font-size: 14px;
      }

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #8e8e8e;
      }
    }

    &__category-button {
      background-color: transparent;
      border: none;
      width: 190px;
      font-size: 14px;
      color: rgba(34, 34, 34, 0.9);
      padding: 6px 18px 6px 15px;
      white-space: nowrap;
      border-left: 1px solid #ece1e1;

      svg {
        margin-left: 11px;
      }

      &:focus {
        outline: none;
      }

      display: none;

      @include laptop() {
        display: block;
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

      display: none;

      @include tablet() {
        display: block;
        height: 44px;
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
