<template lang="pug">
  .group-detail.profile-page
    .container
      h1.group-detail__title Группа на покупку
        router-link(:to="`product/${item.id}`").group-detail__title-link  {{item.title}}
      .group-detail__main
        .group-detail__left-col
          OrderInfo(:item="item" :hideStatus="true" :hideTitle="true").group-detail__product.group-detail__item.order-info--group
          GroupInfo(:users="users").group-detail__info.group-detail__item
          GroupAction(:selfPrice="item.selfPrice" v-if="isMobile" :product="item").group-detail__action.group-detail__item
          DeliveryInfo(:deliveryItem="item.delivery" v-if="isMobile").group-detail__delivery.group-detail__item
        .group-detail__aside
          GroupAction(:selfPrice="item.selfPrice" v-if="!isMobile" :product="item").group-detail__action.group-detail__item
          DeliveryInfo(:deliveryItem="item.delivery" v-if="!isMobile").group-detail__delivery.group-detail__item

    section.group-detail__section
      .section-header.section-header--offset-2
        .section-title Похожие товары
        router-link(to="#").link._hide-desktop Показать еще
      .container
        SimilarSlider(:items="similarItems").similar-slider--scroll

    section.section.section--seo.section--seo-gray.group-detail__section
      SeoTexts(:texts="seoBlockDescription").container

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { generateGroups, generateUsers, generateProducts } from '@/utils/data';
import DeliveryInfo from '@/components/DeliveryInfo.vue';
import { breakPoints } from '@/utils/constants';
import OrderInfo from '@/components/OrderInfo.vue';
import GroupInfo from '@/components/GroupInfo.vue';
import GroupAction from '@/components/GroupAction.vue';
import SimilarSlider from '@/components/AmountChooser/SimilarSlider.vue';
import SeoTexts from '@/components/SeoTexts.vue';
import { Product } from '@/models/product';

@Component({
  components: {
    SeoTexts,
    SimilarSlider,
    DeliveryInfo,
    OrderInfo,
    GroupInfo,
    GroupAction,
  },
})
export default class GroupDetail extends Vue {
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

  similarItems = generateProducts(8);

  seoBlockDescription = [
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
    'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  ];

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
  .group-detail {
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

    &__title-link {
      color: black;
      @include link();
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

    &__section {
      padding-top: 1px;
      background: white;
      margin-top: 15px;
      margin-bottom: 0;
      padding-bottom: 15px;

      @include laptop() {
        background: transparent;
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
  }
</style>
