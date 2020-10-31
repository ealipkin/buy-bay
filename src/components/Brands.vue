<template lang="pug">
  .brands
    .brands__pane
      Slick(ref="slick" :options="sliderSettings").brands__slider
        span(v-for="brand in brands" :key="brand.id").brands__item
          BrandsItem(:brand="brand")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BrandsItem from '@/components/BrandsItem.vue';
import Slick from 'vue-slick';

@Component({
  components: {
    BrandsItem,
    Slick,
  },
})
export default class Brands extends Vue {
  @Prop() public brands!: any[];
  sliderSettings = {
    mobileFirst: true,
    responsive: [
      {
        breakpoint: '300',
        settings: 'unslick',
      },
      {
        breakpoint: '1200',
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
</script>

<style lang="scss">
  .brands {
    .slick-prev {
      @include desktop() {
        left: -63px;
        margin-top: -85px;
      }
    }

    .slick-next {
      @include desktop() {
        right: -69px;
        margin-top: -85px;
      }
    }

    .catalog-card {
      @include desktop() {
        border: solid 1px #e7e7e7 !important;
      }
    }
  }
</style>

<style scoped lang="scss">
  .brands {
    /*background-color: #f7f7fa;*/
    background-color: white;
    overflow: hidden;

    @include desktop() {
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
    }

    &__slider {
      display: flex;
      justify-content: space-between;
      overflow: auto;
      padding-bottom: 30px;

      @include desktop() {
        overflow: visible;
        margin-left: -10px;
        margin-right: -10px;
      }
    }

    &__item {
      padding-left: 10px;

      &:last-child {
        padding-right: 10px;
      }
    }
  }
</style>
