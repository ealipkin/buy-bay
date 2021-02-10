<template lang="pug">
  div(v-if="item").item-detail
    .item-detail__breadcrumbs
      Breadcrumbs(:links="item.breadcrumbs")
    .item-detail__main
      .item-detail__left-col
        ItemPreview(:item="item").item-detail__item.item-detail__item--preview
        ItemDescription(:item="item" v-if="!isMobile").item-detail__item.item-detail__item--description
      .item-detail__aside
        ItemInfo(:item="item").item-detail__item.item-detail__item--info
        ItemGroups(v-if="groups && groups.length" :groups="groups").item-detail__item.item-detail__item--groups
        ItemDescription(:item="item" v-if="isMobile").item-detail__item.item-detail__item--description
        ItemShopCard(v-if="item.brand" :shop="item.brand").item-detail__item.item-detail__item--shop
        DeliveryInfo(v-if="item.delivery" :deliveryItem="item.delivery").item-detail__delivery.item-detail__item.item-detail__item--delivery

    div(v-if="similarItems").item-detail__section
      .item-detail__title Похожие товары
      SimilarSlider(:items="similarItems")
      Pagination(moreCount="50").item-detail__pagination
    SeoTexts(:block="seo").item-detail__seo
  Loader(v-else)
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Slick from 'vue-slick';
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
import Pagination from '@/components/Pagination.vue';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import Loader from '@/components/Loader.vue';
import SimilarSlider from '@/components/SimilarSlider.vue';
import { Product } from '@/models/product';
import { BreadcrumbLink, SeoBlock } from '@/models/models';

interface ProductPage extends Product {
  seo_block: SeoBlock;
  breadcrumbs: BreadcrumbLink[];
}

const PRODUCT_SLIDER_SETTINGS = {
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
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: '1296',
      settings: {
        dots: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
  ],
};

@Component({
  components: {
    SimilarSlider,
    Loader,
    Pagination,
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
  @Watch('$route') routeChange() {
    this.init();
  }

  breadCrumbs: BreadcrumbLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/category', label: 'Мужской гардероб' },
    { href: '/category', label: 'Сумки и рюкзаки' },
    { href: '/', label: 'Рюкзаки', current: true },
  ];

  get isMobile() {
    return this.window.width < breakPoints.tablet;
  }

  get isTablet() {
    return this.window.width >= breakPoints.tablet && this.window.width < breakPoints.laptop;
  }

  seo: SeoBlock | null = null;

  item: Product | null = null;

  window = {
    width: 0,
    height: 0,
  };

  get groups() {
    return this.item && this.item.group && this.item.group.data;
  }

  similarItems: Product[] | null = null;

  sliderSettings = PRODUCT_SLIDER_SETTINGS;

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  mounted() {
    this.init();
  }

  init() {
    const productId = this.$route.params.id;
    this.seo = null;
    this.item = null;
    this.similarItems = null;
    createRequest('get', `${endpoints.product}/${productId}`)
      .then((res) => {
        const response: ProductPage = res.data.data;
        if (response) {
          this.seo = response.seo_block;
          this.item = response;
        }
      });
    createRequest('get', `${endpoints.product}/${productId}/related`)
      .then((res) => {
        this.similarItems = res.data.data;
      });
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
      /*padding: 0 15px;*/
      margin-top: 26px;

      @include laptop() {
        margin-top: 63px;
      }
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

    &__pagination {
      margin-top: 15px;
      @include laptop() {
        display: none;
      }
    }
  }
</style>
