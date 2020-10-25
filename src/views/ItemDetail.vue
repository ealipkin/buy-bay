<template lang="pug">
  div.item-detail.container
    .item-detail__main
      ItemPreview(:item="item")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import BigSlider from '@/components/BigSlider.vue';
import Footer from '@/components/Footer.vue';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Brands from '@/components/Brands.vue';
import Slick from 'vue-slick';
import CatalogSlider from '@/components/CatalogSlider.vue';
import { generateProducts } from '@/utils/data';
import ItemPreview from '@/components/ItemPreview.vue';

@Component({
  components: {
    ItemPreview,
    CatalogSlider,
    Brands,
    CatalogCardItem,
    Footer,
    BigSlider,
    Header,
    Main,
    Slick,
  },
})
export default class ItemDetail extends Vue {
  item = generateProducts(1).pop();
}
</script>

<style lang="scss" scoped>
  .item-detail {

  }
</style>
