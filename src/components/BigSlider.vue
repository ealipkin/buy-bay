<template lang="pug">
  .big-slider
    .big-slider__slider
      Slick(ref="slick" :options="sliderSettings")
        div.big-slider__slide(v-for="(slide, index) of slides" :key="index")
          router-link(:to="slide.href").big-slider__link
            img(:src="slide.img").big-slider__slide-image
    .big-slider__promo-image
      img(src="https://picsum.photos/452/280/")
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
      img: 'https://picsum.photos/id/3/682/280',
      href: '',
    },
    {
      img: 'https://picsum.photos/id/4/682/280',
      href: '',
    },
  ]
}
</script>

<style scoped lang="scss">
  .big-slider {
    &__slide-image {
      pointer-events: none;
    }

    &__slide {
      /*pointer-events: ;*/
    }

    &__link {
      display: block;
    }
  }
</style>
