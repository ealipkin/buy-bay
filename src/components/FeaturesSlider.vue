<template lang="pug">
  .features-slider
    .features-slider__pane
      ul.features-slider__list
        li.features-slider__item
          router-link(to="#").features-slider__link.features-slider__link--hot
            span.features-slider__icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><rect width="30" height="30" x="1" y="1" fill="#EF4141" stroke="#FFF" stroke-opacity=".3" stroke-width="2" rx="15"/><path fill="#FFF" fill-rule="nonzero" d="M22.364 17.192c-.196-2.545-1.381-4.14-2.427-5.548-.968-1.303-1.804-2.428-1.804-4.088a.355.355 0 00-.563-.289c-1.57 1.123-2.88 3.017-3.337 4.824-.318 1.258-.36 2.672-.366 3.606-1.45-.31-1.778-2.479-1.782-2.502a.357.357 0 00-.507-.27c-.076.037-1.866.946-1.97 4.578-.008.121-.008.242-.008.364 0 3.528 2.871 6.4 6.4 6.4h.019a6.408 6.408 0 006.381-6.4c0-.178-.036-.675-.036-.675zM16 23.555c-1.176 0-2.133-1.02-2.133-2.272 0-.043 0-.086.002-.139.015-.528.115-.889.225-1.129.206.443.575.85 1.174.85a.355.355 0 00.356-.355c0-.506.01-1.09.136-1.617.112-.468.38-.965.72-1.364.15.518.445.936.733 1.345.411.585.837 1.19.911 2.22.005.061.01.123.01.189 0 1.253-.958 2.272-2.134 2.272z"/></g></svg>
            span.features-slider__text Горящие группы
        li.features-slider__item
          router-link(to="#").features-slider__link.features-slider__link--delivery
            span.features-slider__icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd" opacity=".9"><rect width="30" height="30" x="1" y="1" fill="#FFCC01" stroke="#FFF" stroke-opacity=".3" stroke-width="2" rx="15"/><path fill="#FFF" fill-rule="nonzero" d="M26.372 16.324v-.01a.457.457 0 00-.46-.45h-.12l-1.865-3.605a.456.456 0 00-.409-.247l-3.183-.001.122-.963a1.328 1.328 0 00-.335-1.023c-.25-.274-.6-.425-.984-.425h-9.88a.488.488 0 00-.483.44l-.099.793h5.63c.365 0 .653.296.644.662a.684.684 0 01-.68.662h-1.877l.001.002H6.88a.484.484 0 00-.48.468.453.453 0 00.456.468h7.3a.688.688 0 01.582.7.733.733 0 01-.722.71H8.984a.487.487 0 00-.485.472.458.458 0 00.46.473h4.973a.686.686 0 01.593.701.732.732 0 01-.728.71H7.612a.488.488 0 00-.485.472.46.46 0 00.46.473h.415L7.84 19.5a1.32 1.32 0 00.335 1.023c.25.274.6.425.983.425h.357a2.063 2.063 0 002.041 1.708 2.2 2.2 0 002.13-1.707h4.454c.36 0 .7-.138.968-.364.245.235.569.364.923.364h.073a2.062 2.062 0 002.04 1.707 2.2 2.2 0 002.13-1.707h.295c.765 0 1.445-.623 1.514-1.388l.288-3.191v-.013l.002-.02v-.012zM11.581 21.71c-.652 0-1.168-.53-1.151-1.181a1.221 1.221 0 011.213-1.182c.651 0 1.167.53 1.15 1.182a1.22 1.22 0 01-1.212 1.181zm10.588 0c-.651 0-1.168-.53-1.15-1.181a1.22 1.22 0 011.212-1.182c.652 0 1.168.53 1.151 1.182a1.221 1.221 0 01-1.213 1.181zm2.972-2.21a.57.57 0 01-.548.503h-.318a2.06 2.06 0 00-2.02-1.601c-.99 0-1.844.682-2.102 1.601h-.098a.402.402 0 01-.302-.127.41.41 0 01-.1-.315l.597-6.604h1.369l-.217 2.404a1.32 1.32 0 00.335 1.023c.25.275.6.426.983.426h2.664l-.243 2.69z"/></g></svg>
            span.features-slider__text Бесплатная доставка
        li.features-slider__item
          router-link(to="#").features-slider__link.features-slider__link--discount
            span.features-slider__icon
              include ../assets/icons/feature-discount.svg
            span.features-slider__text Большая скидка
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FeaturesSlider extends Vue {
}
</script>

<style scoped lang="scss">
  .features-slider {
    margin-left: -10px;
    margin-right: -10px;
    overflow: hidden;

    @include tablet() {
      display: none;
    }

    &__pane {
      margin-bottom: -30px;
    }

    &__list {
      @include clearList();
      display: flex;
      overflow: auto;
      padding-bottom: 30px;
    }

    &__item {
      margin-left: 10px;

      &:last-child {
        padding-right: 10px;
      }
    }

    &__icon {
      width: 32px;
      flex-shrink: 0;
      display: block;
      margin-right: 8px;
    }

    &__link {
      min-width: 140px;
      width: 140px;
      box-sizing: border-box;
      padding: 7px 8px 5px;
      text-decoration: none;
      border-radius: 4px;
      display: flex;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.17;
      color: #ffffff;

      &--hot {
        background-image: linear-gradient(70deg, #ad3a81 3%, #ff4545 92%);
      }

      &--delivery {
        background-image: linear-gradient(250deg, #fc6471 98%, #fe904d 7%);
      }

      &--discount {
        background-image: linear-gradient(222.68deg, #2CD2C7 2.68%, #05A5F6 96.05%);
      }
    }

    &__text {
      position: relative;
      top: 2px;
    }
  }
</style>
