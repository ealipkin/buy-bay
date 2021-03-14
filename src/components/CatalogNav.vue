<template lang="pug">
  ul.catalog-nav
    li(v-for="(category, index) in items" :key="index").catalog-nav__item
      router-link(:to="category.href" :class="{'catalog-nav__link--main': category.items.length}").catalog-nav__link {{category.label}}
      ul(v-if="category.items && category.items.length").catalog-nav
        li(v-for="(subCategory, subIndex) in category.items" :key="subIndex").catalog-nav__item
          router-link(:to="subCategory.href" :class="{'catalog-nav__link--main': subCategory.items.length}").catalog-nav__link {{subCategory.label}}
          ul(v-if="subCategory.items && subCategory.items.length").catalog-nav
            li(v-for="(item, i) in subCategory.items" :key="i" ).catalog-nav__item
              router-link(:to="item.href" :class="{'catalog-nav__link--main': item.items.length}").catalog-nav__link {{item.label}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICategoryItem } from '@/models/models';

@Component
export default class CatalogNav extends Vue {
  @Prop() public items!: ICategoryItem[];
}
</script>

<style scoped lang="scss">
  .catalog-nav {
    .catalog-nav {
      box-shadow: none;
    }

    border-radius: 8px;
    box-shadow: 0 2px 14px 0 #1e27330c;
    background-color: #ffffff;
    @include clearList();
    padding: 19px 23px 77px;

    ul {
      @include clearList();
    }

    &__link {
      text-decoration: none;
      font-size: 14px;
      font-style: normal;
      line-height: 2.29;
      color: #222222;

      &--main {
        font-weight: bold;
      }
    }

    &__sub-list {
      margin-top: 9px;
    }

    &__item {
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
