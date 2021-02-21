<template lang="pug">
  form(@submit="searchSubmit" :class="{'search-field--focused': isFocused}").search-field
    .search-field__inner
      input.search-field__input(
        placeholder="Найти товар"
        v-model="search"
        @focus="handleFocus"
        @keydown="inputKeydown"
        ref="input"
        v-debounce:500ms="handleInput"
      )
    transition(name="fade")
      SearchSuggest(:searchResults="searchResults" v-if="showResults && searchEnd" @item-click="itemClick").search-field__results
    button(type="button" @click="handleClear").search-field__clear Отмена
    button(type="submit").search-field__submit-button.button Найти
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';
import clickOutside from '@/utils/clickOutside';
import SearchSuggest from '@/components/SearchSuggest.vue';
import { ISearchSuggest, SearchItem } from '@/models/models';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { SearchSuggestResponse } from '@/models/responses';

const MIN_SEARCH_LENGTH = 3;
@Component({
  components: { SearchSuggest },
})
export default class SearchField extends Vue {
  @Watch('$route') routeChange() {
    this.isFocused = false;
    this.search = '';
    this.lastSearch = '';
  }

  get searchValid() {
    return this.search && this.search.trim().length >= MIN_SEARCH_LENGTH;
  }

  get showResults() {
    return this.isFocused && this.searchResults && this.searchValid;
  }

  search = '';

  lastSearch = '';

  currentFocus = -1;

  input: any = null;

  searchEnd = false;

  searchResults: ISearchSuggest | null = null;

  isFocused = false;

  handleInput() {
    const val = this.search;
    if (this.searchValid && val.trim() !== this.lastSearch.trim()) {
      this.searchEnd = false;
      this.searchResults = null;
      this.currentFocus = -1;
      createRequest('GET', endpoints.search.suggest(val))
        .then((res: SearchSuggestResponse) => {
          this.searchResults = res.data.data;
          this.lastSearch = val;
          this.searchEnd = true;
        });
    }
  }

  searchSubmit(event) {
    event.preventDefault();
    if (this.search && this.search.length) {
      router.push({ path: '/search', query: { q: this.search } });
    }
    (this.$refs.input as any).blur();
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

  itemClick(data: { item: SearchItem }) {
    const { item } = data;
    this.search = item.title;
    this.handleBlur();
  }

  doFocus() {
    if (this.input) {
      this.input.focus();
      this.handleFocus();
    }
  }

  inputKeydown(e) {
    if (!this.search) {
      this.searchEnd = false;
      this.searchResults = null;
    }
    if (this.searchValid && this.search.trim() !== this.lastSearch.trim()) {
      this.searchResults = null;
      this.searchEnd = false;
    }
    if (!this.searchResults) {
      return;
    }
    const list = document.querySelector('.search-suggest');
    let items;
    if (list) {
      items = list.querySelectorAll('.search-suggest__item-wrapper .search-suggest__inner-item');
    }
    if (e.keyCode === 40) {
      this.currentFocus += 1;
      this.addActive(items);
    } else if (e.keyCode === 38) {
      this.currentFocus -= 1;
      this.addActive(items);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (items) {
          items[this.currentFocus].click();
        }
      }
    }
  }

  addActive(listElements) {
    if (!listElements) return;
    this.removeActive(listElements);
    if (this.currentFocus >= listElements.length) {
      this.currentFocus = 0;
    }
    if (this.currentFocus < 0) {
      this.currentFocus = (listElements.length - 1);
    }
    const el = listElements[this.currentFocus];
    if (el) {
      el.classList.add('autocomplete-active');
      this.scrollToActive(el);
    }
  }

  scrollToActive(el) {
    const list: HTMLElement | null = document.querySelector('.search-suggest');
    if (!list) {
      return;
    }
    const listHeight = list.offsetHeight;
    const listScroll = list.scrollTop;
    const elPosition = el.offsetTop;
    const bottom = listHeight + listScroll;

    if (elPosition < listScroll || elPosition > bottom) {
      list.scrollTop = elPosition;
    }
  }

  removeActive(listElements) {
    Array.from(listElements).forEach((el: any) => {
      el.classList.remove('autocomplete-active');
    });
  }

  mounted() {
    this.search = this.$route.query.q as string;
    this.input = this.$refs.input;
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

<style lang="scss">
  .search-field {
    .fade-leave-active {
      display: none;
    }
  }
</style>
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
      position: absolute;
      left: -11px;
      top: calc(100% + 9px);
      height: calc(100vh - 30px);
      width: calc(100% + 27px);
      z-index: 20;
      overflow: auto;

      @include tablet() {
        max-height: 70vh;
        width: 100%;
        top: 100%;
        left: 0;
        height: auto;
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
