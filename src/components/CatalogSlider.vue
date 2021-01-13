<template lang="pug">
  section(:data-id="sliderId  || ''").catalog-slider.container
    .catalog-slider__inner
      div(v-if="isMobile").catalog-slider__slider
        div(v-for="(item, index) in items" :key="index").catalog-slider__item
          CatalogCardItem(:isOutlined="true" :item="item").catalog-slider__card
      Slick(v-if="!isMobile && isLaptop" ref="slickLaptop" :options="laptopSettings" @init="handleInit").catalog-slider__slider
        div(v-for="(item, index) in items" :key="index").catalog-slider__item
          CatalogCardItem(:isOutlined="true" :item="item").catalog-slider__card
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import { debounce } from '@/utils/common';
import { breakPoints } from '@/utils/constants';
import { Product } from '@/models/product';

@Component({
  components: {
    Slick,
    CatalogCardItem,
  },
})
export default class BigSlider extends Vue {
  @Prop() public items!: Product[];

  @Prop() public sliderId!: string;

  windowWidth;

  isMobile = false;

  isLaptop = false;

  isDesktop = false;

  handleInit(event) {
    this.$emit('init', { event, id: this.sliderId });
  }

  reInit() {
    this.reinitSliders();
  }

  update() {
    if (this.$refs.slickDesktop) {
      (this.$refs.slickDesktop as any).goTo(0);
    }
    if (this.$refs.slickLaptop) {
      (this.$refs.slickLaptop as any).goTo(0);
    }
  }

  laptopSettings = {
    dots: true,
    arrows: true,
    draggable: false,
    rows: 2,
    slidesPerRow: 5,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  desktopSettings = {
    dots: false,
    arrows: true,
    draggable: false,
    rows: 2,
    slidesPerRow: 5,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  reinitSliders = () => {
    if (this.$refs.slickDesktop) {
      (this.$refs.slickDesktop as any).reSlick();
    }
    if (this.$refs.slickLaptop) {
      (this.$refs.slickLaptop as any).reSlick();
    }
  };

  handleResize() {
    this.windowWidth = window.innerWidth;
    this.$nextTick(() => {
      this.isMobile = this.windowWidth < breakPoints.laptop;
      this.isLaptop = this.windowWidth >= breakPoints.laptop;
      this.isDesktop = this.windowWidth >= breakPoints.desktopSliders;
    });
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('resize', debounce(this.reinitSliders.bind(this), 500));
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('resize', debounce(this.reinitSliders.bind(this), 500));
  }
}
</script>

<style lang="scss">
  .catalog-slider {
    .slick-arrow {
      display: none;

      @media (min-width: 1350px) {
        display: block;
      }
    }

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
      outline: none;

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
      flex-wrap: nowrap;
      overflow: auto;
      padding-bottom: 30px;
      display: flex;

      @include laptop() {
        margin-left: 0;
        margin-right: 0;
        padding: 0;
        overflow: visible;
      }
    }
  }
</style>
