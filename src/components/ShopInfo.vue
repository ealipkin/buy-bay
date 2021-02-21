<template lang="pug">
  .shop-info
    router-link(:to="{ path: `/shop/${shop.id}` }" :style="{backgroundImage: `url(${shop.image})`}").shop-info__avatar.avatar
      img(:src="shop.image")
    router-link(:to="{ path: `/shop/${shop.id}` }").shop-info__info
      .shop-info__name {{shop.name}}
      .shop-info__middle
        .shop-info__orders
          span.shop-info__orders-icon
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17"><path d="M11.07 1a.84.84 0 01.727.42h0l2.076 3.588c.02.03.037.06.053.091h0l.01.02a.429.429 0 01.058.249l.002.038v9.488a1.03 1.03 0 01-1.029 1.029h0H2.028A1.03 1.03 0 011 14.894h0V5.44c0-.09.016-.177.046-.257a.43.43 0 01.042-.102h0l2.11-3.66A.842.842 0 013.926 1h0zm2.05 4.573H1.876v9.321c0 .085.069.154.153.154h10.94a.154.154 0 00.153-.154h0V5.573zM8.866 8.87a.438.438 0 01.618.619h0L7.221 11.75a.437.437 0 01-.619 0h0l-1.06-1.06a.44.44 0 010-.619.44.44 0 01.619 0h0l.75.751zm2.185-6.995h-3.1v2.823h4.733L11.05 1.875zm-3.975 0h-3.13L2.319 4.698h4.757V1.875z" fill="#7B8197" fill-rule="nonzero" stroke="#7B8197" stroke-width=".3"/></svg>
          span Заказов: {{shop.orders}}
        Rate(:rate="shop.rate").shop-info__rate
    button(type="button" :class="{'shop-info__fav--active': shop.isFavourite}" @click="toggleFav").shop-info__fav
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22"><path d="M14.2 20.6C-9.601 8.946 7.612-5.544 14.2 4.215c6.588-9.759 23.802 4.73 0 16.385z" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ShowMoreText from '@/components/ShowMoreText.vue';
import Rate from '@/components/Rate.vue';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import $store from '@/store';
import { ProductShop } from '@/models/order';

@Component({
  components: { Rate, ShowMoreText },
})
export default class ShopInfo extends Vue {
  @Prop() public shop!: ProductShop;

  toggleFav() {
    if (this.shop.isFavourite) {
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
    Vue.set(this.shop, 'isFavourite', !this.shop.isFavourite);
    $store.dispatch('app/updateFavouritesCount');
  }
}

</script>

<style lang="scss" scoped>
  .shop-info {
    text-decoration: none;
    display: flex;
    /*align-items: center;*/

    &__info {
      text-decoration: none;
    }

    &__avatar {
      background: transparent no-repeat center;
      background-size: cover;
      margin-right: 16px;
    }

    &__name {
      font-size: 14px;
      font-weight: bold;
      color: #222222;
      margin-top: 4px;
      margin-bottom: 7px;

      @include tablet() {
        margin-top: 6px;
      }
    }

    &__orders {
      font-size: 14px;
      color: #7b8197;
      margin-bottom: 7px;

      @include tablet() {
        margin-bottom: 0;
        display: flex;
        align-items: center;
        margin-top: -1px;
        margin-left: -2px;
      }

      @include laptop() {
        margin-right: 24px;
      }

      &-icon {
        display: none;

        @include tablet() {
          display: block;
          margin-right: 12px;

          position: relative;
          top: 3px;
        }
      }
    }

    &__fav {
      @include favButton();
      margin-right: 10px;
      margin-top: -5px;
      margin-left: auto;

      @include tablet() {
        margin: 0;
        margin-left: auto;
        margin-top: 13px;
        margin-right: -6px;
      }

      &--active {
        svg path {
          fill: $blue
        }
      }
    }

    &__rate {

    }

    &__middle {
      @include tablet() {
        display: flex;
        align-items: center;
      }
    }

  }
</style>
