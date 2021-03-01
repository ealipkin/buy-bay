<template lang="pug">
  .shop-card
    button(@click="toggleFav" :class="{'shop-card__fav--active': shop.isFavourite}").shop-card__fav
      include ../assets/icons/trash.svg
    router-link(:to="{path: `/brans/${shop.id}`}").shop-card__inner
      .shop-card__image
        img(:src="shop.image")
      .shop-card__name {{shop.name || shop.brand}}
      .shop-card__category {{shop.category}}
      Rate(:rate="shop.rate" :list="true").shop-card__rate

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { ProductShop } from '@/models/order';

@Component({
  components: { Rate },
})
export default class CatalogCardItem extends Vue {
  @Prop() public shop!: ProductShop;

  toggleFav() {
    const id = this.shop.brand_id;
    this.shop.isFavourite = !this.shop.isFavourite;
    this.$emit('toggle-fav');
    createRequest('GET', endpoints.favourites.deleteBrand(id))
      .then(() => {
        this.$emit('favRemove', { id });
      });
  }
}
</script>

<style scoped lang="scss">
  .shop-card {
    padding: 14px 11px 14px 10px;
    border: solid 1px #e7e7e7;
    background-color: #ffffff;
    border-radius: 4px;
    text-align: center;
    position: relative;

    @include tablet() {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    &__inner {
      text-decoration: none;
    }

    &__fav {
      @include clearButton();
      display: flex;
      position: absolute;
      width: 25px;
      height: 25px;
      right: 10px;
      top: 10px;
      z-index: 1;
      padding: 5px;
      box-sizing: border-box;
      background: white;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid $grey-4;

      svg {
        display: block;
        width: 100%;
      }

    }

    &__image {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 21px;

      img {
        max-width: 100%;
      }

      @include tablet() {
        width: 100px;
        height: 100px;
        margin-bottom: 24px;
      }
    }

    &__name {
      font-size: 14px;
      font-weight: bold;
      color: #222222;
      margin-bottom: 6px;

      @include tablet() {
        font-size: 18px;
        margin-bottom: 8px;
      }
    }

    &__category {
      font-size: 10px;
      text-align: center;
      color: #7b8197;
      margin-bottom: 8px;

      @include tablet() {
        font-size: 12px;
        margin-bottom: 16px;
      }
    }
  }
</style>
