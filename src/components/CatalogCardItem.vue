<template lang="pug">
  div(:class="{'--isOutlined': isOutlined }").catalog-card
    button(@click="toggleFav" :class="{'catalog-card__fav--active': item.isFavourite}").catalog-card__fav
      include ../assets/icons/trash.svg

    router-link(:to="`/product/${item.id}`").catalog-card__inner
      .catalog-card__top
        .catalog-card__img(:style="{backgroundImage: `url(${item.images.preview})`}")
          //:style="{backgroundImage: `url(${promoImage.image})`}"
          // img(:src="item.images.preview")
        ul(v-if="item.features && item.features.length").catalog-card__features
          template(v-if="item.features.find(i => i.time)")
            li(
              v-for="feature in item.features"
              v-if="feature.time"
              v-bind:class="`${feature.icon} ${feature.time ? 'catalog-card__feature--time' : ''}`"
              :title="feature.title"
            ).catalog-card__feature
              vac(:left-time="feature.time" v-if="feature.time").catalog-card__feature-time
                template(v-slot:process="{ timeObj }").group-item__timer-inner
                  span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
                template(v-slot:finish)
          template(v-else)
            li(
              v-for="feature in item.features"
              v-if="!feature.time"
              v-bind:class="feature.icon"
              :title="feature.title"
            ).catalog-card__feature
      .catalog-card__bottom
        .catalog-card__group
          p.catalog-card__group-text {{groups}} {{declOfNum(groups)}}
            span  на покупку
          Rate(:rate="item.rate" v-if="item.rate").catalog-card__group-rating.rate--small-star

        a.catalog-card__title-link
          h3.catalog-card__title {{item.title | truncate(truncateLength)}}
        .catalog-card__price
          p.catalog-card__old-price {{divideNumberWithSpaces(item.selfPrice)}} ₽
          p.catalog-card__actual-price
            include ../assets/icons/group-button.svg
            span {{divideNumberWithSpaces(item.groupPrice)}} ₽
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { divideNumberWithSpaces, declOfNum } from '@/utils/common';
import Rate from '@/components/Rate.vue';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { Product } from '@/models/order';

@Component({
  components: { Rate },
})
export default class CatalogCardItem extends Vue {
  @Prop({ type: Boolean, default: false }) public isOutlined!: boolean;

  @Prop() public item!: Product;

  @Prop() public titleLength!: number;

  get truncateLength() {
    return this.titleLength || 35;
  }

  get groups(): number {
    return this.item.group && this.item.group.data ? this.item.group.data.length : 0;
  }

  declOfNum = (groups) => declOfNum(groups, ['группа', 'группы', 'групп']);

  divideNumberWithSpaces = (number) => divideNumberWithSpaces(number);

  toggleFav() {
    const id = this.item.product_id;
    this.item.isFavourite = !this.item.isFavourite;
    this.$emit('toggle-fav');
    createRequest('GET', endpoints.favourites.deleteProduct(id))
      .then(() => {
        this.$emit('favRemove', { id });
      });
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
    border-radius: 6px;
    background-color: #ffffff;
    flex: 1;
    position: relative;

    height: 100%;

    &.--isOutlined {
      border: 1px solid #e7e7e7;

      @include desktop() {
        border: none;
      }
    }

    &__fav {
      @include clearButton();
      position: absolute;
      width: 25px;
      height: 25px;
      right: 10px;
      top: 10px;
      color: $blue;
      z-index: 1;
      padding: 5px;
      box-sizing: border-box;
      background: white;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      display: none;
      cursor: pointer;

      svg {
        display: block;
        width: 100%;
      }

    }

    &--fav &__fav {
      display: flex;
    }

    &__inner {
      outline: none;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
    }

    &__img {
      //height: 218px;
      width: 100%;
      border-radius: 6px 6px 0 0;
      height: 0;
      padding-bottom: 100%;

      background: white no-repeat center;
      background-size: contain;
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
      justify-content: space-between;

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
      font-weight: 500;
      font-size: 13px;
    }

    &__old-price {
      text-decoration: line-through;
      font-size: 11px;
      margin: 3px 0;

      @include laptop() {
        font-size: 14px;
        margin: 0;
      }
      @include desktop() {
        order: -1;
        /*margin-bottom: 7px;*/
      }
    }

    &__actual-price {
      color: #ffffff;
      background: $blue no-repeat center;
      padding: 2px 5px;
      border-radius: 4px;
      text-align: center;
      display: flex;
      align-items: center;

      svg {
        display: none;
      }

      @include laptop() {
        min-width: 67px;
        padding: 3px 4px 3px 9px;
        background-position: 8px center;
        font-size: 16px;
        font-weight: 500;

        svg {
          display: block;
          opacity: 0.7;

          width: 13px;
          margin-right: 6px;
          margin-top: 1px;
        }
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
    }
  }
</style>
