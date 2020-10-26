<template lang="pug">
  .item-shop-card
    .item-shop-card__title.content-title Магазин
    ShopInfo(:shop="shop")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product, ProductShop } from '@/utils/models';
import ShowMoreText from '@/components/ShowMoreText.vue';
import ShopInfo from '@/components/ShopInfo.vue';

@Component({
  components: { ShopInfo, ShowMoreText },
})
export default class ItemShopCard extends Vue {
  @Prop() public shop!: ProductShop;
}

</script>

<style lang="scss" scoped>
  .item-shop-card {}
</style>
