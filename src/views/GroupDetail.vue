<template lang="pug">
  .group-detail
    .group-detail__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    h1.group-detail__title Группа на покупку {{item.title}}
    .group-detail__main
      .group-detail__left-col
        OrderInfo(:item="item" :hideStatus="true").group-detail__product.group-detail__item.order-info--group
        GroupInfo(:users="users").group-detail__info.group-detail__item
        GroupAction(:selfPrice="item.selfPrice" v-if="isMobile" :product="item").group-detail__action.group-detail__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="isMobile").group-detail__delivery.group-detail__item
      .group-detail__aside
        GroupAction(:selfPrice="item.selfPrice" v-if="!isMobile" :product="item").group-detail__action.group-detail__item
        DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").group-detail__delivery.group-detail__item

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateGroups, generateUsers, generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import GroupInfo from '@/components/GroupInfo.vue';
import GroupAction from '@/components/GroupAction.vue';
import { BreadcrumbLink, Product } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    OrderInfo,
    GroupInfo,
    GroupAction,
  },
})
export default class GroupDetail extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { href: '/profile/groups', label: 'Мои группы' },
  ];

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  }

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  window = {
    width: 0,
    height: 0,
  };

  item: Product | undefined = generateProducts(1).pop();

  groups = generateGroups(12);

  users = generateUsers(4);

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  mounted() {
    this.breadCrumbs.push({
      href: '/profile/groups/:id',
      label: `Группа на покупку ${this.item ? this.item.title : ''}`,
      current: true,
    });
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss" scoped>
  .group-detail {
    @include container();
    padding-left: 15px;
    padding-right: 15px;

    @include tablet() {
      padding-bottom: 85px;
    }

    &__item {
      margin-bottom: 12px;
      margin-left: -15px;
      margin-right: -15px;

      &:last-child {
        margin-bottom: 0;
      }

      @include tablet() {
        margin-left: 0;
        margin-right: 0;
        border-radius: 8px;
        border: 1px solid $grey-6;
      }
    }

    &__title {
      display: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include tablet() {
        font-size: 32px;
        margin: 0;
        margin-bottom: 24px;
        font-weight: 600;
        color: $black-1;
        display: block;
      }
    }

    &__main {

      @include tablet() {
        display: flex;
      }
    }

    &__left-col {
      @include tablet() {
        width: 1px;
        flex: 1;
        margin-right: 10px;
        max-width: 686px;
      }

      @include laptop() {
        margin-right: 16px;
      }
    }

    &__aside {
      @include tablet() {
        width: 300px;
      }

      @include laptop() {
        width: 438px;
      }
    }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }
  }
</style>
