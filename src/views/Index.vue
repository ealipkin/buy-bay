<template lang="pug">
  .index
    section.index__section.index__section--slider.container
      BigSlider
      FeaturesSlider.index__features-slider

    .container.index__tabs
      TabsNav(:tabs="tabs" v-on:change="selectTab")

    section.index__section.index__section--catalog-slider
      .index__section-header.index__section-header--hide-desktop
        .index__section-title Популярные
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="popularItems" :class="{'tab--active': selectedTab === 1}" ref="slickPopular").tab

    section.index__section.index__section--white.index__section--categories
      .index__container
        .index__section-header
          .index__section-title Топ категории
          router-link(to="#").index__link Показать еще
        TopCategories(:categories="topCategories")


    section.index__section.index__section--catalog-slider
      .index__section-header.index__section-header--hide-desktop
        .index__section-title Горящие группы
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="hotItems" :class="{'tab--active': selectedTab === 2}" ref="slickHot").tab

    section.advantages
      .container
        ul.advantages__list
          li(v-for="item in advantagesList").advantages__item
            span(v-bind:class=`'advantages__icon--'+ item.type`).advantages__icon
            div.advantages__inner
              h3.advantages__title {{ item.title }}
              p.advantages__text {{ item.text }}

    section.index__section.index__section--catalog-slider
      .index__section-header.index__section-header--hide-desktop
        .index__section-title Бестселлеры
        router-link(to="#").index__link Показать еще
      CatalogSlider(:items="bestItems" :class="{'tab--active': selectedTab === 3}" ref="slickBest").tab

    section.index__section.index__section--brands
      .index__container
        .index__section-header
          .index__section-title Лучшие бренды
          router-link(to="#").index__link Показать еще
        Brands(:brands="brands")

    section.index__section.index__section--seo
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

@Component({
  components: {
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

  advantagesList = [
    {
      type: 'cart',
      title: 'Ультра дискаунтер',
      text: 'Мы собрали супер товары из Китая по супер ценам',
    },
    {
      type: 'group',
      title: 'Вместе дешевле',
      text: 'Объединяйтесь с друзьями в группы и покупайте по супер цене',
    },
    {
      type: 'warranty',
      title: 'Гарантия',
      text: 'Мы стоим за вас стеной гарантируем возврат денег и бесплатную доставку',
    },
  ];

  brands = [
    {
      id: 1,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 5,
      items: generateProducts(3)
    },
    {
      id: 2,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 4,
      items: generateProducts(3)
    },
    {
      id: 3,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Adidas',
      category: 'Спортивные товары',
      rate: 3,
      items: generateProducts(3)
    },
    {
      id: 4,
      image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/60`,
      title: 'Calvin klein',
      category: 'Мужская и женская одежда',
      rate: 2,
      items: generateProducts(3)
    }
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
    }
  ];

  mounted() {
    this.slidersMap = {
      1: { ref: this.$refs.slickPopular, init: false },
      2: { ref: this.$refs.slickHot, init: false },
      3: { ref: this.$refs.slickBest, init: false },
    }
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
    @include desktop() {
      display: flex;
      flex-direction: column;
    }

    .tab {
      @include desktop() {
        display: none;
        &--active {
          display: block;
        }
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

    &__section {
      background: white;
      padding-bottom: 15px;
      margin-bottom: 15px;
      width: 100%;
      @include desktop() {
        background: transparent;
      }

      &--categories {
        @include desktop() {
          margin-top: 73px;
          padding-bottom: 70px;
        }
      }

      &--seo {
        @include desktop() {
          order: 2;
          margin-top: 31px;
          margin-bottom: 73px;
        }
      }

      &--slider {
        padding-top: 12px;

        @include desktop() {
          padding-top: 40px;
          order: -1;
        }
      }

      &--catalog-slider {
        @include desktop() {
          order: -1;
          margin: 0;
          padding: 0;
        }
      }

      &--offset {
      }

      &--white {
        @include laptop() {
          background: white;
        }
      }

      &-title {
        font-size: 16px;
        font-weight: 600;
        color: #222222;

        @include laptop() {
          font-size: 32px;
        }
      }

      &-header {
        display: flex;
        align-items: center;
        padding: 17px 12px;
        justify-content: space-between;
        @include desktop() {
          padding: 0;
          padding-top: 41px;
          margin-bottom: 68px;
        }

        &--hide-desktop {
          @include desktop() {
            display: none;
          }
        }
      }
    }

    &__section--brands & {
      @include desktop() {
        &__link {
          display: none;
        }

        &__section-header {
          margin-bottom: 39px;
        }
      }
    }

    &__container {
      @include desktop() {
        @include container();
      }
    }

    &__link {
      font-size: 12px;
      color: #496cff;

      @include laptop() {
        font-size: 14px;
      }

      @include desktop() {
        margin-top: 11px;
        margin-right: 16px;
      }
    }

    &__seo {
      color: #7b8197;
      padding: 16px;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  .advantages {
    padding-left: 10px;
    padding-right: 10px;
    background: white;
    padding-top: 20px;
    padding-bottom: 7px;
    margin-bottom: 14px;

    @include desktop() {
      order: 1;
      margin-top: 50px;
      padding-top: 64px;
      padding-bottom: 27px;
    }

    &__icon {
      width: 70px;
      min-height: 55px;
      margin-top: 4px;
      margin-right: 19px;
      box-sizing: border-box;
      margin-left: 7px;
      flex-shrink: 0;
      background: transparent no-repeat left center;
      @include tablet() {
        background-size: contain;
        margin: 0;
        margin-bottom: 15px;
        background-position: center;
      }
      @include laptop() {
        width: 110px;
        height: 100px;
      }

      @include desktop() {
        width: 110px;
        height: 110px;
      }

      &--cart {
        background-image: url(../assets/advantages/advantage-mobile-01.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-01.svg);
        }
      }

      &--group {
        background-image: url(../assets/advantages/advantage-mobile-02.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-02.svg);
        }
      }

      &--warranty {
        background-image: url(../assets/advantages/advantage-mobile-03.svg);
        @include tablet() {
          background-image: url(../assets/advantages/advantage-03.svg);
        }
      }
    }

    &__list {
      @include clearList();

      @include tablet() {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__item {
      display: flex;
      margin-bottom: 24px;
      align-items: center;

      @include tablet() {
        width: 33%;
        flex-direction: column;
        justify-content: flex-start;
        text-align: center;
      }
      @include laptop() {
        flex-direction: row;
        text-align: left;
        padding-left: 6px;
        align-items: center;
        width: 30%;
      }
    }

    &__img {
      margin-right: 35px;
    }

    &__inner {
      @include laptop() {
        margin-left: 39px;
        margin-top: -23px;
      }
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      color: #222222;
      margin: 0;
      margin-bottom: 6px;
      @include laptop() {
        font-size: 18px;
      }
    }

    &__text {
      margin: 0;
      font-size: 12px;
      color: #222222;
      padding-right: 15px;

      @include laptop() {
        padding: 0;
        font-size: 14px;
      }
    }
  }

  .tabs-nav {

  }
</style>
