<template lang="pug">
  .my-orders
    .page.page--aside-tablet
      Breadcrumbs(:links="Breadcrumbs").my-orders__breadcrumbs
      .page__layout
        .page__aside.my-orders__aside
          h1.page__title Мои заказы
          ProfileNav

        .page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          ul.my-orders__list
            MyItem(v-for="order in myOrders" :order="order" :key="order.id").my-orders__item

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import MyItem from '@/components/MyItem.vue';
import { BreadcrumbLink } from '@/utils/models';

import { generateOrders } from '@/utils/data';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    MyItem,
  },
})
export default class MyOrders extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/my-profile', label: 'Мой профиль' },
    { label: 'Мои заказы', current: true },
  ];

  myOrders = generateOrders(10);

  selectedTab = 1;

  tabs = [
    {
      id: 1,
      label: 'Активные',
      isActive: true,
    },
    {
      id: 2,
      label: 'Завершенные',
    },
  ];

  selectTab(tabId) {
    this.selectedTab = tabId;
  }
}
</script>

<style lang="scss" scoped>
.my-orders {
  @include container();
  padding-top: 16px;
  background-color: #fff;

  @include laptop() {
    background-color: $grey-3;
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
    padding-bottom: 92px;
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
}

</style>
