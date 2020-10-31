<template lang="pug">
  section.catalog-slider.container
    .catalog-slider__inner
      Slick(ref="slick" :options="sliderSettings").catalog-slider__slider
        div(v-for="(item, index) in items" :key="index").catalog-slider__item
          CatalogCardItem(:isOutlined="true" :item="item").catalog-slider__card
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import { generateProducts } from '@/utils/data';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import { Product } from '@/utils/models';

@Component({
  components: {
    Slick,
    CatalogCardItem,
  },
})
export default class BigSlider extends Vue {
  @Prop() public items!: Product[];

  public reInit() {
    (this.$refs.slick as any).reSlick();
  }

  sliderSettings = {
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 300,
        settings: 'unslick' // destroys slick
      },
      {
        breakpoint: 1023,
        settings: {
          dots: true,
          arrows: false,
          rows: 2,
          slidesPerRow: 5,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1295,
        settings: {
          dots: false,
          arrows: true,
          rows: 2,
          slidesPerRow: 5,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
</script>

<style lang="scss">
  .catalog-slider {
    .slick-prev {
      @include desktop() {
        left: -63px;
        margin-top: -11px;
      }
    }

    .slick-next {
      @include desktop() {
        right: -68px;
        margin-top: -14px;
      }
    }

    .slick-slide > div {
      display: flex;
    }

    .slick-dots {
      bottom: -17px;
    }
  }
</style>

<style lang="scss" scoped>

  .catalog-slider {
    overflow: hidden;
    @include laptop() {
      overflow: visible;
    }

    &__item {
      margin-left: 6px;
      display: flex;
      flex-direction: column;

      &:first-child {
        padding-left: 10px;
        margin-left: 0;
      }

      &:last-child {
        padding-right: 10px;
      }

      @include laptop() {
        padding: 0;
        margin: 0;
        padding-left: 8px;
        padding-right: 8px;
        margin-bottom: 25px;
      }
    }

    &__card {
      width: 139px;
      height: 100%;
      @include laptop() {
        width: auto;
      }
    }

    &__inner {
      margin-bottom: -30px;

      @include laptop() {
        margin-bottom: 0;
      }
      @include desktop() {
        margin-left: -10px;
        margin-right: -10px;
      }
    }

    &__slider {
      margin-left: -10px;
      margin-right: -10px;
      padding-right: 10px;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      padding-bottom: 30px;

      @include laptop() {
        margin-left: 0;
        margin-right: 0;
        padding: 0;
        overflow: visible;
      }
    }
  }
</style>
