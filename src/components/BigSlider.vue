<template lang="pug">
  .big-slider
    .big-slider__slider
      Slick(ref="slick" :options="sliderSettings")
        div.big-slider__slide(v-for="(slide, index) of slides" :key="index")
          router-link(:to="slide.href").big-slider__link
            img(:src="slide.img").big-slider__slide-image
    div(
      :style="{backgroundImage: 'url(https://picsum.photos/452/280/)'}"
    ).big-slider__promo-image
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';

@Component({
  components: {
    Slick,
  },
})
export default class BigSlider extends Vue {
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

  slides = [
    {
      img: 'https://picsum.photos/id/1/682/280',
      href: '',
    },
    {
      img: 'https://picsum.photos/id/2/682/280',
      href: '',
    },
    {
      img: 'https://picsum.photos/id/4/682/280',
      href: '',
    },
  ]
}
</script>

<style lang="scss">
  .big-slider {
    .slick-dots {
      bottom: -21px;
    }

    .slick-arrow {
      width: 32px;
      height: 32px;

      @include laptop() {

      }
    }

    .slick-next {
      @include laptop() {
        right: 30px;
      }
      @include desktop() {
        right: -8px;
      }
    }

    .slick-prev {
      @include laptop() {
        left: 30px;
        z-index: 1;
      }

      @include desktop() {
        left: -8px;
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

  }
</style>
<style scoped lang="scss">
  .big-slider {
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: 36px;

    @include desktop() {
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
      @include laptop() {
        border-radius: 8px;
        overflow: hidden;
      }
      @include desktop() {
        padding: 0;
      }
    }

    &__slider {
      @include desktop() {
        width: 61%;
        margin-right: 16px;
        margin-bottom: -5px;
      }
    }

    &__link {
      display: block;
    }

    &__promo-image {
      display: none;
      background-size: cover;
      @include desktop() {
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
