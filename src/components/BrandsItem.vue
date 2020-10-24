<template lang="pug">
  .brands-item
    .brands-item__header
      img.brands-item__logo-img(src="http://placehold.it/60x60")
      .brands-item__header-inner
        h3.brands-item__title Adidas
        p.brands-item__category Спортивные товары

    ul.brands-item__list
      li(v-for="item in 3").brands-item__card
        CatalogCardItem(:is-outlined="true")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatalogCardItem from '@/components/CatalogCardItem.vue';

@Component({
  components: {
    CatalogCardItem,
  },
})
export default class BrandsItem extends Vue {

}
</script>

<style scoped lang="scss">
  .brands-item {
    padding: 24px 32px 45px 32px;
    background-color: #ffffff;
    max-width: 569px;
    border-radius: 8px;

    &__logo-img {
      border-radius: 50%;
      margin-right: 17px;
    }

    &__header {
      display: flex;
      align-items: center;
      text-align: left;
      margin-bottom: 32px;
    }

    &__header-inner {
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-weight: bold;
      font-size: 18px;
      color: #222222;
      margin: 0 0 4px 0;
    }

    &__category {
      font-size: 14px;
      color: #7b8197;
      margin: 0;
    }

    &__list {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__card {
      width: 152px;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>
