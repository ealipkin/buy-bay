<template lang="pug">
  a(:href="`product/${item.id}`" :class="{'--isOutlined': isOutlined }").catalog-card
    img.catalog-card__img(:src="item.images.preview")
    .catalog-card__bottom
      a.catalog-card__title-link
        h3.catalog-card__title {{item.title}}

      .catalog-card__group
        p.catalog-card__group-text {{item.groups}} групп на покупку
        span.catalog-card__group-rating {{item.rate}}
      .catalog-card__price
        p.catalog-card__old-price {{item.selfPrice}}
        p.catalog-card__actual-price {{item.groupPrice}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '@/utils/models';

@Component({})
export default class CatalogCardItem extends Vue {
  @Prop({ type: Boolean, default: false }) public isOutlined!: boolean;

  @Prop() public item!: Product;
}
</script>

<style scoped lang="scss">
  .catalog-card {
    display: block;
    text-decoration: none;
    max-width: 216px;
    border-radius: 8px;
    background-color: #ffffff;

    &.--isOutlined {
      border: 1px solid #e7e7e7;
    }

    &__img {
      //height: 218px;
      width: 100%;
      border-radius: 8px 8px 0 0;
    }

    a &__title {
      margin: 0;
      font-weight: normal;
      font-size: 14px;
      color: #222222;
      text-align: left;
    }

    &__title-link {
      display: block;
      margin-bottom: 17px;
    }

    &__group {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &__group-text {
      margin: 0;
      text-align: left;
      font-size: 12px;
      color: #7b8197;
    }

    &__group-rating {
      margin-left: auto;
      font-size: 12px;
      color: #7b8197;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -17px;
        top: -1px;
        width: 15px;
        height: 15px;
        background-image: url('../assets/icons/star.svg')
      }
    }

    &__price {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__old-price,
    &__actual-price{
      margin: 0;
      font-size: 14px;
      color: #7b8197;
      font-weight: 600;
    }

    &__old-price {
      text-decoration: line-through;
      margin-bottom: 10px;
    }

    &__actual-price {
      color: #ffffff;
      background-color: #496cff;
      padding: 5px 21px 5px 29px;
      border-radius: 4px;
    }

    &__bottom {
      padding: 13px 15px 24px;
    }
  }
</style>
