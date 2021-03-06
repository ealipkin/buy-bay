<template lang="pug">
  .brands-item
    router-link(:to="{ path: brand.link }").brands-item__header
      div(v-if="brand.image" :style="{backgroundImage: `url(${brand.image})`}").brands-item__logo
      .brands-item__header-inner
        h3.brands-item__title {{brand.brand}}
        p.brands-item__category {{brand.category}}
      Rate(:list="true" :rate="brand.rate" v-if="brand.rate").brands-item__rate
    ul(v-if="brand && brand.data && brand.data.length").brands-item__list
      li(v-for="(item, index) in brand.data" :key="index").brands-item__card
        CatalogCardItem(:is-outlined="true" :item="item" title-length="25")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CatalogCardItem from '@/components/CatalogCardItem.vue';
import Rate from '@/components/Rate.vue';
import { BrandItem } from '@/models/order';

@Component({
  components: {
    Rate,
    CatalogCardItem,
  },
})
export default class BrandsItem extends Vue {
  @Prop() public brand!: BrandItem;
}
</script>

<style lang="scss">
  .brands-item {
    .catalog-card__old-price {
      margin-bottom: 5px;
    }

    .rate__item {
      @include laptop() {
        margin: 0 3px;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  .brands-item {
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #e7e7e7;
    text-align: center;
    padding: 10px 15px 15px 15px;
    min-width: 136px;
    display: flex;
    flex-direction: column;

    @include laptop() {
      min-width: 350px;
      border: 1px solid #00000014;
      text-align: left;
    }

    @include desktop() {
      padding: 24px 32px 18px;
    }

    &__logo {
      width: 59px;
      height: 59px;
      border-radius: 50%;
      background: white no-repeat center;
      background-size: contain;
      margin: 0 auto;

      @include laptop() {
        margin: 0;
        margin-right: 18px;
      }
    }

    &__header {
      text-decoration: none;

      @include laptop() {
        display: flex;
        align-items: center;
        min-height: 60px;
      }

      &-inner {
      }
    }

    &__header-inner {
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-weight: bold;
      font-size: 14px;
      color: #222222;
      margin: 0;
      margin-top: 9px;
      margin-bottom: 10px;

      @include laptop() {
        font-size: 18px;
        margin: 0;
      }
    }

    &__category {
      font-size: 11px;
      line-height: 1.18;
      color: #7b8197;
      margin: 0;
      margin-bottom: 9px;

      @include laptop() {
        font-size: 14px;
        margin: 0;
      }
    }

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: none;

      @include laptop() {
        display: flex;
        margin-top: 32px;
      }
    }

    &__card {
      display: flex;
      @include laptop() {
        width: 30.8%;
        margin-right: 3.6%;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__rate {
      @include laptop() {
      }

      @include laptop() {
        margin-left: auto;
        margin-top: 15px;
        align-self: flex-start;
      }
    }
  }
</style>
