<template lang="pug">
  section.catalog-slider.container
    Slick(ref="slick" :options="sliderSettings")
      CatalogCardItem(v-for="item in items" :item="item" :key="item.id")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import { generateProducts } from '@/utils/data';
import CatalogCardItem from '@/components/CatalogCardItem.vue';

@Component({
  components: {
    Slick,
    CatalogCardItem,
  },
})
export default class BigSlider extends Vue {
  items = generateProducts(30);

  sliderSettings = {
    swipeToSlide: true,
    rows: 1,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: '320',
        settings: 'unslick',
      },
      {
        breakpoint: '1200',
        settings: {
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
    & > div {
      display: flex;
      overflow: auto;

      @include laptop() {
        overflow: visible;
      }
    }
    .slick-prev, .slick-next {
      background: red;
    }
  }
</style>
