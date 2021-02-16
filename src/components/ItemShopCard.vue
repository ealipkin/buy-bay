<template lang="pug">
  .item-shop-card
    .item-shop-card__title.content-title Бренд
    ShopInfo(:shop="shop")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ShowMoreText from '@/components/ShowMoreText.vue';
import ShopInfo from '@/components/ShopInfo.vue';
import { ProductShop } from '@/models/order';

@Component({
  components: { ShopInfo, ShowMoreText },
})
export default class ItemShopCard extends Vue {
  @Prop() public shop!: ProductShop;
}

</script>

<style lang="scss" scoped>
  .item-shop-card {
    background: white;
    margin-top: 16px;
    padding: 17px 15px 14px;

    @include tablet() {
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      overflow: hidden;
      padding: 22px 31px 31px;
    }

    &__title {
      margin-bottom: 22px;
    }
  }
</style>
