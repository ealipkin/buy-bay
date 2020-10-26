<template lang="pug">
  .shop-info
    .shop-info__avatar.avatar
      img(:src="shop.image")
    .shop-info__info
      .shop-info__name {{shop.name}}
      .shop-info__orders Заказов: {{shop.orders}}
      .shop-info__rate.rate

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProductShop } from '@/utils/models';
import ShowMoreText from '@/components/ShowMoreText.vue';

@Component({
  components: { ShowMoreText },
})
export default class ShopInfo extends Vue {
  @Prop() public shop!: ProductShop;
}

</script>

<style lang="scss" scoped>
  .shop-info {
  }
</style>
