<template lang="pug">
  div
    Header
    Main
      section.main-slider
        BigSlider
      section.catalog-slider.container
        CatalogCardItem
      section.top-categories
        .container
          .top-categories__header
            h2.top-categories__title Топ категории
            a.top-categories__show-all Показать все
          ul.top-categories__list
            li(v-for="item in topCategories").top-categories__list-item
              a(href="#").top-categories__list-link
                div.top-categories__list-img-wrapper(:style="{'background-color':item.color}")
                  img(:src="item.src").top-categories__list-img
                p.top-categories__list-title {{ item.title }}

      Brands

      section.advantages
        .container
          ul.advantages__list
            li(v-for="item in advantagesList").advantages__list-item
              img
              div.advantages__list-inner
                h3.advantages__list-title {{ item.title }}
                p.advantages__list-text {{ item.text }}

      section.seo-block
        .container
          h2.seo-block__title SEO Block
          p.seo-block__description {{ seoBlockDescription[0] }}
          p.seo-block__description {{ seoBlockDescription[0] }}
    Footer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import BigSlider from '@/components/BigSlider.vue';
import Footer from '@/components/Footer.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';

@Component({
  components: {
    Brands,
    CatalogCardItem,
    Footer,
    BigSlider,
    Header,
    Main,
  },
})
export default class Index extends Vue {
  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ]

  topCategories = [
    {
      title: 'Спортивный инвентарь',
      src: require('../assets/images/category-01.jpg'),
      position: 'top',
      color: '#fe8787',
    },
    {
      title: 'Компьютеры и офис',
      color: '#925aca',
    },
    {
      title: 'Cмарфтоны',
      color: '#ffe091',
    },
    {
      title: 'Спортивный инвентарь',
      color: '#fe8787',
    },
    {
      title: 'Компьютеры и офис',
      color: '#925aca',
    },
  ]

  advantagesList = [
    {
      title: 'Ультра дискаунтер',
      text: 'Мы собрали супер товары из Китая по супер ценам',
    },
    {
      title: 'Вместе дешевле',
      text: 'Объединяйтесь с друзьями в группы и покупайте по супер цене',
    },
    {
      title: 'Гарантия',
      text: 'Мы стоим за вас стеной гарантируем возврат денег и бесплатную доставку',
    },
  ]
}
</script>

<style lang="scss" scoped>
  .top-categories {
    padding-top: 18px;

    &__header {
      display: flex;
      align-items: baseline;
      padding-right: 23px;
      margin-bottom: 29px;
    }

    &__show-all {
      margin-left: auto;
    }

    &__title {
      font-size: 32px;
      font-weight: 600;
      color: #222222;
      text-align: left;
    }

    &__show-all {
      font-size: 14px;
      text-decoration: underline;
      color: #496cff;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    &__list-item {
      padding-right: 10px;
      width: 229px;
      flex-shrink: 0;
    }

    &__list-link {
      display: flex;
      text-decoration: none;
      align-items: center;
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      color: #222222;
    }

    &__list-img-wrapper {
      margin-right: 17px;
      width: 60px;
      height: 60px;
      border-radius: 20px;
      flex-shrink: 0;
    }
  }

  .advantages {
    &__list {
      display: flex;
      padding: 0;
      margin: 0;
      list-style-type: none;
      text-align: left;
      justify-content: space-between;
    }

    &__list-item {
      max-width: 333px;
      &:not(:first-child) {
        margin-left: 70px;
      }
    }

    &__list-inner {
      max-width: 190px;
    }

    &__list-title {
      font-size: 18px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 8px;
    }

    &__list-text {
      font-size: 14px;
      color: #222222;
    }
  }

  .seo-block {
    background-color: #f5f5f5;
    padding-top: 62px;
    padding-bottom: 100px;
    text-align: left;

    &__title {
      font-size: 32px;
      color: #222222;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 46px;
    }

    &__description {
      font-size: 14px;
      line-height: 22px;

      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
</style>
