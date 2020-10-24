<template lang="pug">
  section.brands
    .container
      h2.brands__title Лучшие бренды

      Slick(ref="slick" :options="sliderSettings").brands__slider
        BrandsItem
        BrandsItem
        BrandsItem
        BrandsItem
        BrandsItem
        BrandsItem
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BrandsItem from '@/components/BrandsItem.vue';
import Slick from 'vue-slick';

@Component({
  components: {
    BrandsItem,
    Slick,
  },
})
export default class Brands extends Vue {
  sliderSettings = {
    mobileFirst: true,
    responsive: [
      {
        breakpoint: '320',
        settings: 'unslick',
      },
      {
        breakpoint: '1200',
        settings: {
          rows: 1,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
</script>

<style scoped lang="scss">

  .brands {
    background-color: #f7f7fa;
    padding: 36px 0 80px;

    &__title {
      text-align: left;
      font-size: 32px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 42px;
    }

    &__slider {
      display: flex;
      justify-content: space-between;
      overflow: auto;
    }
  }
</style>
