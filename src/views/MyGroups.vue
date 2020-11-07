<template lang="pug">
  .my-groups
    .page.page--aside-tablet
      Breadcrumbs(:links="Breadcrumbs").my-groups__breadcrumbs
      .page__layout
        .page__aside.my-groups__aside
          h1.page__title Мои группы
          ProfileNav(:items="profileMenuItems")

        .page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          ul.my-groups__list
            MyItem(v-for="order in myOrders" :order="order" :key="order.id").my-groups__item
          Pagination(:moreCount="100").my-groups__pagination

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import MyItem from '@/components/MyItem.vue';
import Pagination from '@/components/Pagination.vue';
import { BreadcrumbLink } from '@/utils/models';
import { PROFILE_MENU_ITEMS } from '@/utils/constants';

import { generateOrders } from '@/utils/data';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    MyItem,
    Pagination,
  },
})
export default class MyGroups extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { label: 'Мои группы', current: true },
  ];

  myOrders = generateOrders(10);

  profileMenuItems = PROFILE_MENU_ITEMS;

  selectedTab = 1;

  tabs = [
    {
      id: 1,
      label: 'Активные',
      isActive: true,
    },
    {
      id: 2,
      label: 'Прошедшие',
    },
  ];

  selectTab(tabId) {
    this.selectedTab = tabId;
  }
}
</script>

<style lang="scss" scoped>
.my-groups {
  @include container();
  padding-top: 16px;
  padding-bottom: 10px;
  background-color: #fff;

  @include laptop() {
    background-color: $grey-3;
    padding-bottom: 155px;
  }

  &__breadcrumbs {
    display: none;

    @include tablet() {
      display: flex;
    }
  }

  &__aside {
    display: none;

    @include tablet() {
      display: block;
    }
  }

  &__list {
    @include clearList();
    margin-bottom: 92px;
  }

  &__item {
    margin-bottom: 20px;

    @include laptop() {
      margin-bottom: 16px;
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  &__pagination {
    display: none;

    @include laptop() {
      display: flex;
    }
  }
}

</style>
