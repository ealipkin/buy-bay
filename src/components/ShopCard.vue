<template lang="pug">
  router-link(:to="{path: `/shop/${shop.id}`}").shop-card
    .shop-card__image
      img(:src="shop.image")
    .shop-card__name {{shop.name}}
    .shop-card__category {{shop.category}}
    Rate(:rate="shop.rate || '5'" :list="true").shop-card__rate

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductShop } from '@/utils/models';
import Rate from '@/components/Rate.vue';

@Component({
  components: { Rate },
})
export default class CatalogCardItem extends Vue {
  @Prop() public shop!: ProductShop;
}
</script>

<style scoped lang="scss">
  .shop-card {
    padding: 14px 11px 14px 10px;
    border: solid 1px #e7e7e7;
    background-color: #ffffff;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;

    @include tablet() {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    &__image {
      width: 60px;
      height: 60px;
      display: block;
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
