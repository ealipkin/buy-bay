<template lang="pug">
  ul.catalog-nav
    li(v-for="(item, index) in items" :key="index").catalog-nav__item
      router-link(:to="item.main.href").catalog-nav__link.catalog-nav__link--main {{item.main.title}}
      ul(v-if="item.links && item.links.length").catalog-nav__sub-list
        li(v-for="subItem in item.links").catalog-nav__sub-item
          router-link(:to="subItem.href").catalog-nav__link {{subItem.title}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MenuChildItem } from '@/utils/models';

@Component
export default class CatalogMenu extends Vue {
  @Prop() public items!: MenuChildItem[];
}
</script>

<style scoped lang="scss">
  .catalog-nav {
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
