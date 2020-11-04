<template lang="pug">
  .index.index--flex
    section.section.section--slider.container
      BigSlider
      FeaturesSlider.index__features-slider

    .container.index__tabs
      TabsNav(:tabs="tabs" v-on:change="selectTab")

    section.section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Популярные
        router-link(to="#").section-link Показать еще
      CatalogSlider(:items="popularItems" :class="{'tab--active': selectedTab === 1}" ref="slickPopular").tab

    section.section.section--white.section--categories
      .section__container
        .section-header
          .section-title Топ категории
          router-link(to="#").section-link Показать еще
        TopCategories(:categories="topCategories")

    section.section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Горящие группы
        router-link(to="#").section-link Показать еще
      CatalogSlider(:items="hotItems" :class="{'tab--active': selectedTab === 2}" ref="slickHot").tab

    Advantages(:advantagesList="advantagesList")

    section.section.section--catalog-slider
      .section-header.section-header--hide-desktop
        .section-title Бестселлеры
        router-link(to="#").section-link Показать еще
      CatalogSlider(:items="bestItems" :class="{'tab--active': selectedTab === 3}" ref="slickBest").tab

    section.section.section--brands
      .section__container
        .section-header
          .section-title Лучшие бренды
          router-link(to="#").section-link Показать еще
        Brands(:brands="brands")

    section.section.section--seo
      SeoTexts(:texts="seoBlockDescription").container.index__seo

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BigSlider from '@/components/BigSlider.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import Slick from 'vue-slick';
import CatalogSlider from '@/components/CatalogSlider.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import FeaturesSlider from '@/components/FeaturesSlider.vue';
import TopCategories from '@/components/TopCategories.vue';
import { generateProducts, getRandomNumberBetween } from '@/utils/data';
import TabsNav from '@/components/TabsNav.vue';
import Advantages from '@/components/Advantages.vue';
import { ADVANTAGES } from '@/utils/constants';

@Component({
  components: {
    Advantages,
    TabsNav,
    TopCategories,
    FeaturesSlider,
    SeoTexts,
    CatalogSlider,
    Brands,
    CatalogCardItem,
    BigSlider,
    Slick,
  },
})
export default class Index extends Vue {
  slidersMap = {};

  selectedTab = 1;

  popularItems = generateProducts(30);

  hotItems = generateProducts(30);

  bestItems = generateProducts(30);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

  topCategories = [
    {
      title: 'Спортивный инвентарь',
      src: require('../assets/images/top-01.png'),
      position: 'bottom',
      positionMobile: 'right-center',
      type: 'red',
      color: 'pink',
    },
    {
      title: 'Cмарфтоны',
      src: require('../assets/images/top-02.png'),
      position: 'center',
      positionMobile: 'center-bottom',
      type: 'brown',
      color: 'yellow',
    },
    {
      title: 'Компьютеры и офис',
      src: require('../assets/images/top-03.png'),
      position: 'top',
      positionMobile: 'right-top',
      type: 'blue',
      color: 'cyan',
    },
    {
      title: 'Женский гардероб',
      src: require('../assets/images/top-04.png'),
      position: 'bottom',
      positionMobile: 'center-bottom',
      type: 'light-blue',
      color: 'pink',
    },
    {
      title: 'Спортивный инвентарь',
      src: require('../assets/images/top-01.png'),
      position: 'bottom',
      positionMobile: 'right-center',
      type: 'red',
      color: 'cyan',
    },
    {
      title: 'Cмарфтоны',
      src: require('../assets/images/top-02.png'),
      position: 'center',
      positionMobile: 'center-bottom',
      type: 'brown',
      color: 'yellow',
    },
  ];

  advantagesList = ADVANTAGES;

  brands = [
    {
      id: 1,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 5,
      items: generateProducts(3),
    },
    {
      id: 2,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 4,
      items: generateProducts(3),
    },
    {
      id: 3,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 3,
      items: generateProducts(3),
    },
    {
      id: 4,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 2,
      items: generateProducts(3),
    },
  ];

  tabs = [
    {
      id: 1,
      label: 'Популярные товары',
      isActive: true,
    },
    {
      id: 2,
      label: 'Горящие группы',
    },
    {
      id: 3,
      label: 'Бестселлеры',
    },
  ];

  mounted() {
    this.slidersMap = {
      1: { ref: this.$refs.slickPopular, init: false },
      2: { ref: this.$refs.slickHot, init: false },
      3: { ref: this.$refs.slickBest, init: false },
    };
  }

  selectTab(tabId) {
    this.selectedTab = tabId;
    const targetSlider = this.slidersMap[tabId];
    if (!targetSlider.init) {
      this.$nextTick(() => {
        targetSlider.ref.reInit();
      });
      targetSlider.init = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    &--flex {
      @include desktop() {
        display: flex;
        flex-direction: column;
      }
    }

    &__tabs {
      order: -1;
      width: 100%;
      display: none;
      @include desktop() {
        display: flex;
        margin-top: 49px;
        margin-bottom: 50px;
      }
    }

    &__seo {
      color: #7b8197;
      padding: 16px;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
</style>
