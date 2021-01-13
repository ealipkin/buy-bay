<template lang="pug">
  .big-slider(v-if="items && items.length")
    .big-slider__slider
      Slick(ref="slick" :options="sliderSettings")
        div.big-slider__slide(v-for="(slide, index) of items" :key="index")
          router-link(:to="slide.link").big-slider__link
            img(:src="slide.image").big-slider__slide-image

    router-link(
      v-if="promoImage"
      :to="promoImage.link"
      :style="{backgroundImage: `url(${promoImage.image})`}"
    ).big-slider__promo-image
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import { BigSliderItem } from '@/models/models';

@Component({
  components: {
    Slick,
  },
})
export default class BigSlider extends Vue {
  @Prop() public items!: BigSliderItem[];

  @Prop() public promo!: BigSliderItem[];

  get promoImage(): BigSliderItem | null {
    return this.promo && this.promo.length ? this.promo[0] : null;
  }

  sliderSettings = {
    slidesToShow: 1,
    swipeToSlide: true,
    mobileFirst: true,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '15px',
    responsive: [
      {
        breakpoint: '300',
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: '1023',
        settings: {
          dots: true,
          centerMode: false,
          arrows: true,
        },
      },
    ],
  };
}
</script>

<style lang="scss">
  .big-slider {
    .slick-dotted.slick-slider {
      margin-bottom: 20px;

      @include laptop() {
        margin-bottom: 0;
      }
    }
    .slick-dots {
      bottom: -8px;
    }

    .slick-arrow {
      width: 32px;
      height: 32px;
    }

    .slick-next {
      @include laptop() {
        right: -16px;
      }
    }

    .slick-prev {
      @include laptop() {
        z-index: 1;
        left: -16px;
      }

    }

    @include laptop() {
      .slick-dots {
        bottom: 22px;
      }

      .slick-dotted {
        margin-bottom: 0;
      }

      .slick-dots li button {
        width: 8px;
        height: 8px;
        background: white;
      }

      .slick-dots li {
        margin: 0 7px;
      }

      .slick-dots li.slick-active button {
        position: relative;

        &:after {
          content: '';
          width: 200%;
          height: 200%;
          border: 2px solid white;
          border-radius: 50%;
          position: absolute;
          display: block;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .slick-list {
      @include laptop() {
        border-radius: 8px;
        overflow: hidden;
      }
    }

    .slick-arrow {
      &:before {
        border-width: 2px;
      }
    }
  }
</style>
<style scoped lang="scss">
  .big-slider {
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 28px;

    @include laptop() {
      position: relative;
      margin-left: 0;
      margin-right: 0;
      display: flex;
      @include container();
      padding-left: 0;
      padding-right: 0;
    }

    &__slide-image {
      pointer-events: none;
      width: 100%;
      border-radius: 6px;

      @include laptop() {
        border-radius: 8px;
        overflow: hidden;
      }
    }

    &__slide {
      padding: 0 7px;
      display: block !important;
      @include laptop() {
        border-radius: 8px;
        overflow: hidden;
        padding: 0;
      }
    }

    &__slider {
      @include laptop() {
        width: 60.7%;
        margin-right: 16px;
        margin-bottom: -5px;
        border-radius: 8px;
      }
    }

    &__link {
      display: block;
      margin-bottom: 25px;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 10%;
        top: 0;
        height: 100%;
        z-index: -1;
        width: 80%;
        box-shadow: 0 6px 14px 0 rgba(50, 50, 50, 0.59);
      }

      @include laptop() {
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0;

        &:after {
          display: none;
        }
      }
    }

    &__promo-image {
      display: none;
      border-radius: 8px;
      overflow: hidden;
      background-size: cover;
      text-decoration: none;
      @include laptop() {
        width: calc(39% - 16px);
        height: 100%;
        position: absolute;
        right: 0;
        display: block;
      }

      img {
        max-width: 100%;
      }
    }

    .slick-dots {
      bottom: -17px;
    }
  }
</style>
