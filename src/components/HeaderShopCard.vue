<template lang="pug">
  .header-shop-card
    .container.header-shop-card__container
      .header-shop-card__main
        .header-shop-card__avatar
          img(:src="shop.image")
        .header-shop-card__title {{shop.description}}
      .header-shop-card__aside
        Rate(:rate="shop.rate").header-shop-card__rate
        .header-shop-card__fav
          include ../assets/icons/heart.svg
        button(type="button" @click="writeToShop").header-shop-card__button.button.button--disabled Написать продавцу

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Rate from '@/components/Rate.vue';
import { mapGetters } from 'vuex';
import { ProductShop } from '@/utils/models';

@Component({
  components: { Rate },
})
export default class HeaderShopCard extends Vue {
  @Prop() public shop!: ProductShop;

  writeToShop() {
    console.log('writeToShop');
  }
}
</script>

<style scoped lang="scss">
  .header-shop-card {
    border-top: 1px solid #f7f7fa;
    border-bottom: 1px solid #f7f7fa;

    &__container {
      padding-top: 14px;
      padding-bottom: 16px;
      @include tablet() {
        display: flex;
        align-items: center;
      }
    }

    &__main {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      @include tablet() {
        margin-bottom: 0;
      }
    }

    &__avatar {
      width: 80px;
      height: 80px;
      border: solid 1px #eee5e5;
      border-radius: 50%;
      overflow: hidden;
      box-sizing: border-box;
      flex-shrink: 0;

      img {
        max-width: 100%;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #222222;
      max-width: 225px;
      margin-left: 20px;

      @include tablet() {
        margin-left: 35px;
      }
    }

    &__button {
    }

    &__aside {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__fav {
      @include favButton();
      margin-top: 10px;
      margin-right: 15px;
      @include tablet() {
        margin-right: 37px;
      }
    }

    &__rate {
      font-size: 14px;
      margin-right: 15px;
      @include tablet() {
        margin-right: 34px;
      }
    }
  }
</style>
