<template lang="pug">
  ul.search-suggest
    li(v-for="category in items" v-if="category.items.length").search-suggest__item
      .search-suggest__title {{category.title}}
      ul.search-suggest__items-list
        li(v-for="item in category.items").search-suggest__item-wrapper
          router-link(:to="`/${category.route}/${item.id}`").search-suggest__inner-item
            div(v-if="item.image" :class="{'search-suggest__image-container--rounded': item.type === itemTypes.BRAND}" ).search-suggest__image-container
              img(:src="item.image").search-suggest__image
            .search-suggest__info
              span(:class="{'search-suggest__item-title--big': item.type === itemTypes.CATEGORY}").search-suggest__item-title {{item.title}}
              .search-suggest__description
                span(v-if="item.price").search-suggest__price {{getPrice(item.price)}}
                span(v-if="item.groups").search-suggest__groups {{item.groups}} {{getGroupsText(item.groups)}}
    li(v-if="!items.length").search-suggest__inner-item._empty
      .search-suggest__item-title Ничего не найдено
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import { declOfNum, getPrice } from '@/utils/common';
import { SEARCH_ITEM_TYPE } from '@/models/enums';
import { ISearchSuggest, SearchItem } from '@/models/models';

const routesMap = {
  brands: 'brand',
  products: 'product',
  categories: 'category',
};

const titlesMap = {
  brands: 'Бренды',
  products: 'Товары',
  categories: 'Категории',
};

@Component
export default class Main extends Vue {
  @Prop() public searchResults!: ISearchSuggest;

  get items() {
    const orderedMap = {
      brands: this.searchResults.brands,
      products: this.searchResults.products,
      categories: this.searchResults.categories,
    };
    return Object.entries(orderedMap).filter((entry) => entry[1].length).map((entry) => ({
      route: routesMap[entry[0]],
      title: titlesMap[entry[0]],
      items: entry[1],
    }));
  }

  itemTypes = SEARCH_ITEM_TYPE;

  getPrice = getPrice;

  getGroupsText(count: number) {
    return declOfNum(count, ['группа', 'группы', 'групп']);
  }

  clickClick(item: SearchItem) {
    this.$emit('item-click', { item });
    const { currentRoute } = this.$router;
    const currentQuery = currentRoute.query.q;
    if (currentQuery !== item.title) {
      router.push({ path: '/search', query: { q: item.title } });
    }
  }
}
</script>

<style scoped lang="scss">
  .search-suggest {
    background-color: #f5f7fb;
    @include clearList();

    @include tablet() {
      border-radius: 4px;
      box-shadow: 0 2px 25px 0 #5d6cac4d;
    }

    &__item {
      background-color: white;

      padding: 13px 16px 0;
      margin-bottom: 7px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__items-list {
      @include clearList();
    }

    &__inner-item {
      display: flex;
      align-items: center;
      cursor: pointer;

      margin-left: -16px;
      margin-right: -16px;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 12px;
      padding-top: 12px;
      text-decoration: none;

      &:hover, &.autocomplete-active {
        background-color: $grey-7;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__title {
      font-size: 12px;
      color: #8e8e8e;
      margin-bottom: 3px;

      @include tablet() {
        font-size: 14px;
        margin-bottom: 6px;
      }
    }

    &__image-container {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;

      &--rounded {
        border-radius: 50%;
      }
    }

    &__image {
      display: block;
      max-width: 100%;

    }

    &__item-title {
      font-size: 12px;
      color: #222222;

      @include tablet() {
        font-size: 14px;
      }

      &--big {
        font-size: 14px;
        color: #222222;
      }
    }

    &__price {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }

    &__groups {
      font-size: 14px;
      color: #8e8e8e;
      margin-left: 24px;
    }
    ._empty {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
