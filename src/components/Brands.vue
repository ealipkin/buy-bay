<template lang="pug">
  .brands
    .brands__pane
      div(v-if="isMobile").brands__slider
        span(v-for="brand in brands" :key="brand.id").brands__item
          BrandsItem(:brand="brand")
      Slick(v-if="!isMobile && isLaptop" ref="slickLaptop" :options="laptopSettings" ).brands__slider
        span(v-for="brand in brands" :key="brand.id").brands__item
          BrandsItem(:brand="brand")
      Slick(v-if="!isLaptop && isDesktop" ref="slickDesktop" :options="desktopSettings" ).brands__slider
        span(v-for="brand in brands" :key="brand.id").brands__item
          BrandsItem(:brand="brand")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BrandsItem from '@/components/BrandsItem.vue';
import Slick from 'vue-slick';
import { debounce } from '@/utils/common';
import { breakPoints } from '@/utils/constants';
import { BrandItem } from '@/models/order';

@Component({
  components: {
    BrandsItem,
    Slick,
  },
})
export default class Brands extends Vue {
  @Prop() public brands!: BrandItem[];

  windowWidth = 0;

  laptopSettings = {
    mobileFirst: true,
    arrows: false,
    draggable: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  desktopSettings = {
    mobileFirst: true,
    arrows: true,
    dots: false,
    draggable: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  updateSliders = () => {
    if (this.$refs.slickDesktop) {
      (this.$refs.slickDesktop as any).reSlick();
    }
    if (this.$refs.slickLaptop) {
      (this.$refs.slickLaptop as any).reSlick();
    }
  };

  get isMobile() {
    return this.windowWidth < breakPoints.laptop;
  }

  get isLaptop() {
    return this.windowWidth >= breakPoints.laptop && this.windowWidth < breakPoints.desktopSliders;
  }

  get isDesktop() {
    return this.windowWidth >= breakPoints.desktopSliders;
  }

  handleResize() {
    this.windowWidth = window.innerWidth;
  }

  created() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('resize', debounce(this.updateSliders.bind(this), 500));
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('resize', debounce(this.updateSliders.bind(this), 500));
  }
}
</script>

<style lang="scss">
  .brands {
    .catalog-card__group-text span {
      display: none;
    }

    .slick-dots {
      position: relative;
      bottom: 0;
    }

    .slick-prev {
      @include desktop() {
        left: -15px;
      }
    }

    .slick-next {
      @include desktop() {
        right: -15px;
      }
    }

    .catalog-card {
      @include desktop() {
        border: solid 1px #e7e7e7 !important;
      }
    }

    .slick-slide {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .slick-slide > div {
      flex: 1;
      height: 100%;
    }

  }
</style>

<style scoped lang="scss">
  .brands {
    /*background-color: #f7f7fa;*/
    background-color: white;
    overflow: hidden;

    @include laptop() {
      background: transparent;
      overflow: visible;
    }

    &__title {
      text-align: left;
      font-size: 32px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 42px;
    }

    &__pane {
      margin-bottom: -30px;
      @include laptop() {
        margin-bottom: 0;
      }
    }

    &__slider {
      display: flex;
      justify-content: space-between;
      overflow: auto;
      padding-bottom: 30px;

      @include laptop() {
        overflow: visible;
        padding-bottom: 0;
        margin-bottom: 0;
        display: block;
      }
      @include desktop() {
        margin-left: -10px;
        margin-right: -10px;
      }
    }

    &__item {
      padding-left: 10px;
      margin-bottom: 1px;

      .brands-item {
        height: 100%;
      }

      &:last-child {
        padding-right: 10px;
      }
    }
  }
</style>
