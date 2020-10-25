<template lang="pug">
  .item-preview(v-if="item && item.images && item.images.detail")
    .item-preview__top
      Slick(ref="slickTop" :options="topSliderSettings").item-preview__top-slider
        div(v-for="(imageItem, index) in item.images.detail" :key="index" :class="{'--video': imageItem.isVideo }").item-preview__top-slide
          img(:src="imageItem.url")
    .item-preview__bottom
      div(
        v-for="(imageItem, index) in item.images.detail" :key="index"
        :class="{'item-preview__bottom-slide--video': imageItem.isVideo , 'item-preview__bottom-slide--selected': selectedIndex === index}"
        @click='goToSlide(index)'
      ).item-preview__bottom-slide
        img(:src="imageItem.url")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Slick from 'vue-slick';
import { Product } from '@/utils/models';

@Component({
  components: {
    Slick,
  },
})
export default class ItemPreview extends Vue {
  @Prop() public item!: Product;

  selectedIndex = 0;

  topSliderSettings = {
    // asNavFor: '.item-preview__bottom-slider',
    arrows: false,
    dots: false,
  };

  bottomSliderSettings = {
    slidesToShow: 6,
    asNavFor: '.item-preview__top-slider',
    focusOnSelect: true,
    arrows: false,
    dots: false,
  };

  goToSlide(index) {
    this.selectedIndex = index;
    (this.$refs.slickTop as any).goTo(index);
  }
}

</script>

<style lang="scss" scoped>
  .item-preview {
    background: white;
    max-width: 686px;
    border-radius: 8px;
    border: solid 1px #dfdfdf;
    padding: 34px 40px 45px;
    box-sizing: border-box;

    img {
      max-width: 100%;
    }

    &__bottom {
      margin-top: 32px;
      display: flex;
      align-items: center;
    }

    &__bottom-slide {
      width: 60px;
      max-width: 60px;
      height: 60px;
      border-radius: 2px;
      margin-right: 8px;
      position: relative;

      &:after {
        content: '';
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: solid 1px #cccccc;
      }

      img {
        border-radius: 2px;
      }

      &--selected {
        &:after {
          border-width: 2px;
          border-color: #e53333;
          left: -1px;
          top: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
        }
      }
    }
  }
</style>
