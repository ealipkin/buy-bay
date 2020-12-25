<template lang="pug">
  Slick(ref="slick" :options="sliderSettings").similar-slider
    div(v-for="item in items"  :key="item.id").similar-slider__wrapper
      CatalogCardItem(:item="item").catalog-card--similar.similar-slider__slide
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '@/utils/models';
import Slick from 'vue-slick';
import CatalogCardItem from '@/components/CatalogCardItem.vue';

@Component({ components: { CatalogCardItem, Slick } })
export default class SimilarSlider extends Vue {
  @Prop() public items!: Product[];

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
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: '1296',
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };
}
</script>

<style scoped lang="scss">
  .similar-slider {
    display: flex;
    flex-wrap: wrap;

    &--scroll {
      flex-wrap: nowrap;
      overflow: auto;

      @include laptop() {
        overflow: visible;
      }
    }

    .slick-next {
      right: -81px;
    }

    .slick-prev {
      left: -65px;
    }

    @include tablet() {
      margin-left: -8px;
      margin-right: -8px;
    }

    &__wrapper {
      width: 48%;
      margin-right: 4%;
      margin-bottom: 8px;

      &:nth-child(2n) {
        margin-right: 0;
      }

      @include tablet() {
        width: auto;
        margin-right: 0;
      }
      @include tablet() {
        padding: 0 8px;
      }
    }

    &--scroll &__wrapper {
      margin-right: 8px;

      @include tablet() {
        margin-right: 0;
      }
    }
  }
</style>
