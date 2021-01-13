<template lang="pug">
  .item-preview(v-if="item && item.images && item.images.detail")
    .item-preview__top
      Slick(ref="slickTop"
        :options="topSliderSettings"
        @afterChange="handleAfterChange"
      ).item-preview__top-slider
        div(v-for="(imageItem, index) in item.images.detail" :key="index" :class="{'--video': imageItem.isVideo }").item-preview__top-slide
          img(:src="imageItem.url")
      .item-preview__counter {{selectedIndex + 1}}/ {{item.images.detail.length}}
    div(:class="{'left-gradient': showLeftGradient, 'right-gradient': showRightGradient}").item-preview__bottom-wrapper
      div(@scroll="onBottomScroll" ref="bottomSlider").item-preview__bottom
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
import { Product } from '@/models/product';

@Component({
  components: {
    Slick,
  },
})
export default class ItemPreview extends Vue {
  @Prop() public item!: Product;

  selectedIndex = 0;

  showLeftGradient = false;

  showRightGradient = false;

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

  handleAfterChange(event, slick, currentSlide) {
    this.selectedIndex = currentSlide;
  }

  mounted() {
    this.updateGradients();
  }

  onBottomScroll() {
    this.updateGradients();
  }

  updateGradients() {
    const bottomSlider: HTMLElement = this.$refs.bottomSlider as HTMLElement;
    this.showLeftGradient = bottomSlider.scrollLeft !== 0;
    this.showRightGradient = bottomSlider.scrollWidth - bottomSlider.scrollLeft > bottomSlider.offsetWidth;
  }
}

</script>

<style lang="scss" scoped>
  .item-preview {
    background: white;
    /*max-width: 686px;*/
    border-radius: 8px;
    padding: 14px 16px;
    box-sizing: border-box;

    @include laptop() {
      border: solid 1px #dfdfdf;
      padding: 34px 40px 45px;
    }

    img {
      max-width: 100%;
      margin: 0 auto;
    }

    &__counter {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      background-color: #00000066;
      padding: 4px 13px 4px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 20px;
    }

    &__top {
      position: relative;

      .slick-slider {
        touch-action: unset;
      }
    }

    &__bottom {
      margin-top: 30px;
      display: flex;
      align-items: center;
      overflow: auto;
      padding: 2px 1px;
      height: 64px;
      box-sizing: border-box;

      &-wrapper.right-gradient {
        &:after {
          content: '';
          width: 20px;
          height: 100%;
          position: absolute;
          z-index: 10;
          right: 0;
          top: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 84%);
        }
      }

      &-wrapper.left-gradient {
        &:before {
          content: '';
          width: 20px;
          height: 100%;
          position: absolute;
          z-index: 10;
          left: 0;
          top: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 1) 16%, rgba(255, 255, 255, 0) 100%);
        }
      }

      &-wrapper {
        position: relative;
      }
    }

    &__bottom-slide {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 2px;
      margin-right: 8px;
      flex-shrink: 0;
      position: relative;

      @include laptop() {
        width: 60px;
        height: 60px;
      }

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
