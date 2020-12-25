<template lang="pug">
  form(@submit="searchSubmit" :class="{'search-field--focused': isFocused}").search-field
    .search-field__inner
      input.search-field__input(placeholder="Найти товар" v-model="search" @focus="handleFocus" ref="input" @blur="handleBlur")
    ul(v-if="showResults").search-field__results
      li(v-for="item in searchResults" @click="itemClick(item)").search-field__item {{item}}
    button(type="button" @click="handleClear").search-field__clear Отмена
    button(type="submit").search-field__submit-button.button Найти
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import clickOutside from '@/utils/clickOutside';

const MIN_SEARCH_LENGTH = 3;

@Component
export default class SearchField extends Vue {
  @Prop() public prop!: boolean;

  get showResults() {
    return this.isFocused && this.search && this.search.length >= MIN_SEARCH_LENGTH;
  }

  search = '';

  searchResults = ['iPhone X', 'iPhone XR 64 Gb', 'Чехол iPhone XR ', 'Аксессуары iPhone', 'Наушники для iPhone', 'Наушники для iPhone', 'iPhone X', 'iPhone XR 64 Gb', 'Чехол iPhone XR ', 'Аксессуары iPhone', 'Наушники для iPhone', 'Наушники для iPhone'];

  isFocused = false;

  searchSubmit(event) {
    event.preventDefault();
    if (this.search && this.search.length) {
      router.push({ path: '/search', query: { q: this.search } });
    }
    (this.$refs.input as any).blur();
  }

  itemClick(item) {
    this.handleBlur();
    this.search = item;
    router.push({ path: '/search', query: { q: item } });
  }

  handleFocus() {
    this.isFocused = true;
    this.$emit('focus');
    document.body.classList.add('_hidden');
  }

  handleBlur() {
    this.isFocused = false;
    this.$emit('blur');
    document.body.classList.remove('_hidden');
  }

  handleClear() {
    this.search = '';
    this.handleBlur();
  }

  doFocus() {
    const input: HTMLElement | null = this.$el.querySelector('.search-field__input');
    if (input) {
      input.focus();
      this.handleFocus();
    }
  }

  mounted() {
    this.search = this.$route.query.q as string;
    clickOutside(this.$el, (e) => {
      const isProfileSearch = e.target.closest('.header-main__profile-search');
      const isPrevent = isProfileSearch;
      if (!isPrevent) {
        this.handleBlur();
      }
    });
  }
}
</script>

<style scoped lang="scss">
  .search-field {
    position: relative;
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

    &__clear {
      @include clearButton();
      font-size: 12px;
      color: #7b8197;
      display: none;
      margin-left: 17px;
    }

    &__results {
      @include clearList();

      position: absolute;
      left: -11px;
      top: calc(100% + 9px);
      height: calc(100vh - 48px);
      width: calc(100% + 27px);
      background: white;
      z-index: 10;
      overflow: auto;

      @include tablet() {
        max-height: 70vh;
        width: 100%;
        left: 0;
      }
    }

    &__item {
      font-size: 14px;
      color: #222222;
      padding: 14px 19px 16px;
      border-bottom: 1px solid #ededed;

      &:last-child {
        border-bottom: none;
      }
    }

    &--focused & {
      &__clear {
        @media (max-width: 767px) {
          display: block;
        }
      }
    }
  }
</style>
