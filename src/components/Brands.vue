<template lang="pug">
  section.brands
    .container
      h2.brands__title Лучшие бренды

      .brands__slider
        BrandsItem
        BrandsItem
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BrandsItem from '@/components/BrandsItem.vue';

@Component({
  components: {
    BrandsItem,
  },
})
export default class Brands extends Vue {

}
</script>

<style scoped lang="scss">

  .brands {
    background-color: #f7f7fa;
    padding: 36px 0 80px;

    &__title {
      text-align: left;
      font-size: 32px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 42px;
    }

    &__slider {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
