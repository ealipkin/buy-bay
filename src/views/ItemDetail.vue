<template lang="pug">
  div.item-detail.container
    .item-detail__main
      ItemPreview(:item="item")
      ItemInfo(:item="item")
      ItemGroups(:groups="groups")
      ItemDescription(:item="item")
      ItemShopCard(v-if="item.shop" :shop="item.shop")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Slick from 'vue-slick';
import { generateGroups, generateProducts } from '@/utils/data';
import ItemPreview from '@/components/ItemPreview.vue';
import ItemInfo from '@/components/ItemInfo.vue';
import ItemGroups from '@/components/ItemGroups.vue';
import ItemDescription from '@/components/ItemDescription.vue';
import ItemShopCard from '@/components/ItemShopCard.vue';

@Component({
  components: {
    ItemShopCard,
    ItemInfo,
    ItemPreview,
    ItemGroups,
    ItemDescription,
    Slick,
  },
})
export default class ItemDetail extends Vue {
  item = generateProducts(1).pop();
  groups = generateGroups(12);
}
</script>

<style lang="scss" scoped>
  .item-detail {
    margin-left: -10px;
    margin-right: -10px;
  }
</style>
