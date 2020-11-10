<template lang="pug">
  .order
    .order__breadcrumbs
      Breadcrumbs(:links="breadCrumbs")
    .order__main
      .order__product
        h2.order__product-title Фото камера сумка через плечоФото камера сумка через плечоФото камера сумка через плечоФото камера сумка через плечоФото камера сумка через плечо

      .order__status
        h3.order__status-title Статус заказа

      .order__delivery-address
        h3.order__address-title Адрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставкиАдрес доставки

      .order__dilivery-time
        h3.order__time-title Бесплатная доставка 15-60 дней

      .order__chat
        h3.order__chat-title Связь с продавцом

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateGroups, generateProducts } from '@/utils/data';
import ItemPreview from '@/components/ItemPreview.vue';
import ItemInfo from '@/components/ItemInfo.vue';
import ItemGroups from '@/components/ItemGroups.vue';
import ItemDescription from '@/components/ItemDescription.vue';
import ItemShopCard from '@/components/ItemShopCard.vue';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    DeliveryInfo,
    ItemShopCard,
    ItemInfo,
    ItemPreview,
    ItemGroups,
    ItemDescription,
  },
})
export default class Order extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/profile', label: 'Мой профиль' },
    { href: '/profile/orders', label: 'Мои заказы' },
    { href: '/profile/orders/:id', label: 'order title?', current: true },
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

  item = generateProducts(1).pop();

  groups = generateGroups(12);

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss" scoped>
  .order {
    @include container();
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 85px;

    &__product,
    &__status,
    &__delivery-address,
    &__dilivery-time,
    &__chat {
      background-color: #fff;
      border-radius: 8px;
      padding: 30px;

    }

    &__product {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    &__status {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    &__delivery-address {
      grid-column: 1 / 2;
      grid-row: 3 / 5;
    }

    &__dilivery-time {
      grid-column: 2 / 3;
      grid-row: 2 / 4;
    }

    &__chat {
      grid-column: 1 / 2;
      grid-row: 5 / auto;
    }

    // &__item {
    //   margin-left: -15px;
    //   margin-right: -15px;

    //   @include tablet() {
    //     margin-left: 0;
    //     margin-right: 0;
    //   }
    // }

    // &__delivery {
    //   background: white;
    //   margin-top: 16px;
    // }

    &__main {
      /*display: flex;*/

      @include tablet() {
        // display: flex;
        display: grid;
        grid-template-columns: 686px 438px;
        grid-template-rows: auto auto auto auto auto;
        grid-gap: 16px;
        align-items: flex-start;

      }
    }

    // &__left-col {
    //   @include tablet() {
    //     /*width: calc(100% - 300px - 15px);*/
    //     width: 1px;
    //     flex: 1;
    //     margin-right: 10px;
    //     max-width: 686px;
    //   }

    //   @include laptop() {
    //     margin-right: 16px;
    //   }
    // }

    // &__aside {
    //   @include tablet() {
    //     width: 300px;
    //   }

    //   @include laptop() {
    //     width: 438px;
    //   }
    // }

    &__breadcrumbs {
      display: none;

      @include tablet() {
        display: flex;
      }
    }
  }

        //- .order__left-col
      //-   ItemPreview(:item="item").order__item.order__item--preview
      //-   ItemDescription(:item="item" v-if="!isMobile").order__item.order__item--description
      //- .order__aside
      //-   ItemInfo(:item="item").order__item.order__item--info
      //-   ItemGroups(:groups="groups").order__item.order__item--groups
      //-   ItemDescription(:item="item" v-if="isMobile").order__item.order__item--description
      //-   ItemShopCard(v-if="item.shop" :shop="item.shop").order__item.order__item--shop
      //-   DeliveryInfo(:deliveryItem="item.delivery").order__delivery.order__item.order__item--delivery
</style>
