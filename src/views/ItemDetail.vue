<template lang="pug">
  div.item-detail
    Breadcrumbs(:links="breadCrumbs").item-detail__breadcrumbs
    .item-detail__main
      .item-detail__left-col
        ItemPreview(:item="item").item-detail__item.item-detail__item--preview
        ItemDescription(:item="item" v-if="!isMobile").item-detail__item.item-detail__item--description
      .item-detail__aside
        ItemInfo(:item="item").item-detail__item.item-detail__item--info
        ItemGroups(:groups="groups").item-detail__item.item-detail__item--groups
        ItemDescription(:item="item" v-if="isMobile").item-detail__item.item-detail__item--description
        ItemShopCard(v-if="item.shop" :shop="item.shop").item-detail__item.item-detail__item--shop
        DeliveryInfo(:deliveryItem="item.delivery").item-detail__delivery.item-detail__item.item-detail__item--delivery

    .item-detail__section
      .item-detail__title Похожие товары
      Slick(ref="slick" :options="sliderSettings").similar-slider
        div(v-for="item in similarItems"  :key="item.id").similar-slider__wrapper
          CatalogCardItem(:item="item").catalog-card--similar.similar-slider__slide

    SeoTexts(:texts="seoBlockDescription").item-detail__seo

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import { generateGroups, generateProducts } from '@/utils/data';
import ItemPreview from '@/components/ItemPreview.vue';
import ItemInfo from '@/components/ItemInfo.vue';
import ItemGroups from '@/components/ItemGroups.vue';
import ItemDescription from '@/components/ItemDescription.vue';
import ItemShopCard from '@/components/ItemShopCard.vue';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import { breakPoints } from '@/utils/constants';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { BreadcrumbLink } from '@/utils/models';

@Component({
  components: {
    Breadcrumbs,
    SeoTexts,
    CatalogCardItem,
    DeliveryInfo,
    ItemShopCard,
    ItemInfo,
    ItemPreview,
    ItemGroups,
    ItemDescription,
    Slick,
  },
})
export default class ItemDetail extends Vue {
  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/product/123', label: 'Мужской гардероб' },
    { href: '/product/123', label: 'Сумки и рюкзаки' },
    { href: '/', label: 'Рюкзаки', current: true },
  ];

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  };

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  window = {
    width: 0,
    height: 0
  };

  item = generateProducts(1).pop();
  groups = generateGroups(12);
  similarItems = generateProducts(8);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  sliderSettings = {
    mobileFirst: true,
    arrows: false,
    responsive: [
      {
        breakpoint: '300',
        settings: 'unslick',
      },
      {
        breakpoint: '767',
        settings: {
          dots: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: '1296',
        settings: {
          dots: false,
          arrows: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
  .item-detail {
    @include container();
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 85px;

    &__item {
      margin-left: -15px;
      margin-right: -15px;

      @include tablet() {
        margin-left: 0;
        margin-right: 0;
      }
    }

    &__delivery {
      background: white;
      margin-top: 16px;
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: #222222;
      margin-bottom: 33px;

      @include laptop() {
        font-size: 32px;
      }
    }

    &__section {
      margin-top: 63px;
      /*padding: 0 15px;*/
    }

    &__main {
      /*display: flex;*/

      @include tablet() {
        display: flex;
      }
    }

    &__left-col {
      @include tablet() {
        /*width: calc(100% - 300px - 15px);*/
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

    &__seo {
      margin-top: 30px;

      @include laptop() {
        margin-top: 134px;
      }
    }
  }
</style>
