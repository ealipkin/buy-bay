<template lang="pug">
  .my-groups
    .page.page--aside-tablet
      Breadcrumbs(:links="Breadcrumbs").my-groups__breadcrumbs
      .page__layout
        .page__aside.my-groups__aside
          h1.page__title Мои группы
          ProfileNav

        .page__content
          TabsNav(:tabs="tabs" @change="selectTab").tabs-nav--inner
          MyList(:my-orders="myOrders").my-groups__my-list

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import TabsNav from '@/components/TabsNav.vue';
import MyList from '@/components/MyList.vue';
import { BreadcrumbLink } from '@/utils/models';

import { generateOrders } from '@/utils/data';

@Component({
  components: {
    Breadcrumbs,
    ProfileNav,
    TabsNav,
    MyList,
  },
})
export default class MyGroups extends Vue {
  Breadcrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/my-profile', label: 'Мой профиль' },
    { label: 'Мои группы', current: true },
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
}

</style>
