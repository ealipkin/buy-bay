<template lang="pug">
  router-link(:to="{path: `/product/${item.id}`}" :class="{'--isOutlined': isOutlined }").catalog-card
    .catalog-card__top
      img.catalog-card__img(:src="item.images.preview")
      ul(v-if="item.features && item.features.length").catalog-card__features
        template(v-if="item.features.find(item => item.time)")
          li(
            v-for="feature in item.features"
            v-if="feature.time"
            v-bind:class="`catalog-card__feature--${feature.type} ${feature.time ? 'catalog-card__feature--time' : ''}`"
          ).catalog-card__feature
            vac(:end-time="feature.time" v-if="feature.type === 'hot'").catalog-card__feature-time
              template(v-slot:process="{ timeObj }").group-item__timer-inner
                span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
              template(v-slot:finish)
        template(v-else)
          li(
            v-for="feature in item.features"
            v-if="!feature.time"
            v-bind:class="`catalog-card__feature--${feature.type} ${feature.time ? 'catalog-card__feature--time' : ''}`"
          ).catalog-card__feature
    .catalog-card__bottom
      .catalog-card__group
        p.catalog-card__group-text {{item.groups}} групп
          span на покупку
        Rate(:rate="item.rate").catalog-card__group-rating.rate--small-star

      a.catalog-card__title-link
        h3.catalog-card__title {{item.title | truncate(35)}}
      .catalog-card__price
        p.catalog-card__actual-price {{divideNumberWithSpaces(item.groupPrice)}}
          span ₽
        p.catalog-card__old-price {{divideNumberWithSpaces(item.selfPrice)}} ₽
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '@/utils/models';
import { divideNumberWithSpaces } from '@/utils/common';
import Rate from '@/components/Rate.vue';

@Component({
  components: { Rate }
})
export default class CatalogCardItem extends Vue {
  @Prop({ type: Boolean, default: false }) public isOutlined!: boolean;

  @Prop() public item!: Product;

  divideNumberWithSpaces(number) {
    return divideNumberWithSpaces(number);
  }
}
</script>

<style lang="scss">
  .rate--small-star img {
    @include laptop() {
      width: 10px;
      margin-right: 4px;
    }
  }
</style>
<style scoped lang="scss">
  .catalog-card {
    text-decoration: none;
    border-radius: 6px;
    background-color: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;

    &.--isOutlined {
      border: 1px solid #e7e7e7;

      @include desktop() {
        border: none;
      }
    }

    &__img {
      //height: 218px;
      width: 100%;
      border-radius: 6px 6px 0 0;
    }

    &__title {
      margin: 0;
      font-size: 12px;
      font-weight: normal;
      color: #222222;

      @include laptop() {
        min-height: 41px;
        display: flex;
        align-items: flex-end;
        font-size: 14px;
      }
    }

    &__title-link {
      display: block;
      margin-bottom: 13px;

      @include laptop() {
        order: -1;
      }
    }

    &__group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      color: #7b8197;
      margin-bottom: 7px;

      @include laptop() {
        font-size: 12px;
        margin-bottom: 16px;
      }

      &-text {
        span {
          display: none;

          @include tablet() {
            display: inline;
          }
        }
      }
    }

    &__group-text {
      margin: 0;
    }


    &__price {
      display: flex;
      align-items: center;
      margin-top: auto;

      @include laptop() {
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    &__old-price,
    &__actual-price {
      white-space: nowrap;
      margin: 0;
      color: #7b8197;
      font-weight: 600;
      font-size: 13px;
    }

    &__old-price {
      text-decoration: line-through;
      font-size: 11px;
      margin: 3px;

      @include laptop() {
        font-size: 14px;
        margin: 0;
      }
      @include desktop() {
        order: -1;
        margin-bottom: 7px;
      }
    }

    &__actual-price {
      color: #ffffff;
      background: $blue no-repeat center;
      padding: 2px 5px;
      min-width: 67px;
      border-radius: 4px;
      text-align: center;

      @include laptop() {
        padding: 3px 7px;
        padding-left: 29px;
        background-image: url(../assets/icons/group-button.svg);
        background-position: 8px center;
        font-size: 16px;
        font-weight: 600;
      }
    }

    &__bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 8px 9px 18px;

      @include laptop() {
        padding: 10px 13px 23px 16px;
      }
    }

    &__top {
      position: relative;

      img {
        display: block;
      }
    }

    &__features {
      @include clearList();
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      bottom: 11px;
      width: 100%;
    }

    &__feature {
      width: 32px;
      height: 32px;
      margin-left: -5px;
      color: white;
      background-repeat: no-repeat;
      background-size: contain;
      box-sizing: border-box;
      border-radius: 50%;
      flex-shrink: 0;
      @include laptop() {
        height: 40px;
        width: 40px;
      }

      &:first-child {
        margin-left: 0;
      }

      &--delivery {
        background-image: url(../assets/icons/feature-delivery.svg);
      }

      &--hot {
        background-image: url(../assets/icons/feature-hot.svg);
      }

      &--discount {
        background-image: url(../assets/icons/feature-discount.svg);
      }

      &--time {
        width: auto;
        height: 32px;
        box-sizing: border-box;
        border-radius: 20px;
        border: solid 2px #ffffff4c;
        background-color: #ef4141;
        background-image: url(../assets/icons/feature-flame.svg);
        background-size: 11px;
        background-position: 9px center;
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
        padding: 5px 10px 4px 27px;
        @include laptop() {
          height: 40px;
          font-size: 16px;
          font-weight: 600;
          padding: 7px 12px 4px 34px;
          background-size: 16px;
        }
      }
    }
  }
</style>

<style lang="scss">

  .catalog-card {
    &--similar {
      min-width: 139px;
      box-sizing: border-box;
      border: 1px solid #e7e7e7;

      @include laptop() {
        border: none;
      }

      .rate {
        font-size: 12px;
      }

    }

    &--similar & {
      &__title-link {
        order: -1;
        margin-bottom: 4px;

        @include laptop() {
          margin-bottom: 9px;
        }
      }

      &__bottom {
        padding: 4px 6px 18px 9px;

        @include laptop() {
          padding: 17px 14px 18px 17px;
        }
      }

      &__group {
        align-items: flex-end;
        @include laptop() {
          margin-bottom: 24px;
        }
      }

      &__price {
        flex-wrap: wrap;
        margin-top: 1px;
      }

      &__actual-price {
        padding-left: 29px;
        background-image: url(../assets/icons/group-button.svg);
        background-size: 11px;
        background-position: 9px center;
        font-size: 16px;
      }

      &__old-price {
        order: -1;
        margin: 0;
        font-size: 14px;
        margin-bottom: 8px;
        @media (min-width: 400px) {
          margin-bottom: 0;
        }
        @include laptop() {
          font-size: 16px;
        }
      }
    }
  }
</style>
