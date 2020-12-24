<template lang="pug">
  ul.breadcrumbs(v-if="links && links.length")
    li.breadcrumbs__item(v-for="link in links" :key="link.title")
      span(v-if="link.current").breadcrumbs__link.breadcrumbs__link--current  {{link.title || link.label}}
      router-link(v-else :to="link.link || link.href").breadcrumbs__link  {{link.title || link.label}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BreadcrumbLink } from '@/utils/models';

@Component({})
export default class Breadcrumbs extends Vue {
  @Prop() public links!: BreadcrumbLink[];
}

</script>

<style lang="scss" scoped>
  .breadcrumbs {
    @include clearList();
    display: flex;
    flex-wrap: nowrap;
    margin-top: 21px;
    margin-bottom: 31px;
    width: 100%;

    &__link {
      font-size: 14px;
      color: $grey-2;
      text-decoration: none;

      &:before {
        content: '/';
        margin-right: 7px;
      }
    }

    &__item {
      margin-right: 10px;
      white-space: nowrap;

      &:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__item:first-child &__link:before {
      display: none;
    }
  }
</style>
