<template lang="pug">
  .header-shop-card
    .container.header-shop-card__container
      .header-shop-card__main
        .header-shop-card__avatar
          img(:src="shop.image")
        .header-shop-card__title {{shop.name}}
      .header-shop-card__aside
        Rate(:rate="shop.rate").header-shop-card__rate
        button(type="button" :class="{'header-shop-card__fav--active': isFavourite}" @click="toggleFav").header-shop-card__fav
          include ../assets/icons/heart.svg
        //button(type="button" @click="writeToShop").header-shop-card__button.button.button--secondary Написать продавцу

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Rate from '@/components/Rate.vue';
import { ProductShop } from '@/models/order';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import $store from '@/store';

@Component({
  components: { Rate },
})
export default class HeaderShopCard extends Vue {
  @Prop() public shop!: ProductShop;
  isFavourite: boolean = false;

  writeToShop() {
    console.log('writeToShop');
  }

  mounted() {
    this.isFavourite = this.shop.isFavourite;
  }

  toggleFav() {
    if (this.isFavourite) {
      this.removeFromFav();
    } else {
      this.addToFav();
    }
  }

  addToFav() {
    createRequest('GET', endpoints.favourites.addBrand(this.shop.id))
      .then(() => {
        this.$root.$emit('show-toast', {
          message: 'Бренд добавлен из избранное',
        });
        this.updateFavourites();
      });
  }

  removeFromFav() {
    createRequest('GET', endpoints.favourites.deleteBrand(this.shop.id))
      .then(() => {
        this.$root.$emit('show-toast', {
          message: 'Бренд удален из избранного',
        });
        this.updateFavourites();
      });
  }

  updateFavourites() {
    this.isFavourite = !this.isFavourite;
    $store.dispatch('app/updateFavouritesCount');
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

      &--active {
        svg path {
          fill: $blue
        }
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
