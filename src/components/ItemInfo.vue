<template lang="pug">
  .item-info
    .item-info__title {{item.title}}
    .item-info__info
      span.item-info__orders
        img(src="../assets/icons/order-package.svg")
        span Заказов: {{divideNumberWithSpaces(this.item.orders)}}
      Rate(:rate="item.rate").item-info__rate

    .item-info__prices
      span.item-info__self-price
        span.item-info__self-price-value {{divideNumberWithSpaces(item.selfPrice)}} ₽
    ul(v-if="item.options").item-info__options
      li(v-for="option in item.options").item-info__option
        h3.item-info__option-title {{option.title}}
        .item-info__option-list
          label(v-for="value in option.values").item-info__option-label
            input(type="radio" :name="'option['+option.id+']'" :checked="value.selected" @change="optionSelect(option.id, value.value)").visually-hidden
            span {{value.label}}
      li.item-info__option
        h3.item-info__option-title Количество
        .item-info__amount-container
          AmountChooser(v-model="itemAmount" :options="{max: maxCount}").item-info__amount
          .item-info__amount-text {{item.maxCount}} шт. в наличии
    .item-info__actions
      button(type="button" :class="{'item-info__fav--active': item.isFavourite}" @click="toggleFav").item-info__fav
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22"><path d="M14.2 20.6C-9.601 8.946 7.612-5.544 14.2 4.215c6.588-9.759 23.802 4.73 0 16.385z" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
      button(type="button" @click="buySelf" :disabled="orderDisabled").item-info__buy
        span.item-info__buy-price {{divideNumberWithSpaces(item.selfPrice)}} ₽
        span.item-info__buy-text Купить одному
      button(type="button" @click="buyGroup" :disabled="orderDisabled").item-info__buy.item-info__buy--grouped
        span.item-info__buy-price {{divideNumberWithSpaces(item.groupPrice)}} ₽
        span.item-info__buy-text Купить вместе

</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { divideNumberWithSpaces } from '@/utils/common';
import Rate from '@/components/Rate.vue';
import AmountChooser from '@/components/AmountChooser/vue-amount-chooser.vue';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import $store from '@/store';
import { OrderResponse } from '@/models/responses';
import router from '@/router';
import { Product } from '@/models/order';

@Component({
  components: { AmountChooser, Rate },
})
export default class ItemInfo extends Vue {
  @Prop() public item!: Product;

  selectedOptions: any = null

  itemAmount = 1;

  pending = false;

  get isAuthorized() {
    return (this as any).$auth.check();
  }

  get maxCount() {
    return this.item.maxCount && this.item.maxCount < 99 ? this.item.maxCount : 99;
  }

  get orderDisabled() {
    if (!this.selectedOptions) {
      return false;
    }
    const allOptions = Object.keys(this.selectedOptions).length;
    const allValuesSelect = Object.values(this.selectedOptions).filter(Boolean).length === Object.keys(this.selectedOptions).length;
    return this.pending || !allValuesSelect;
  }

  optionSelect(parentId, id) {
    if (parentId && id) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [parentId]: id,
      };
    }
  }

  toggleFav() {
    if (this.item.isFavourite) {
      this.removeFromFav();
    } else {
      this.addToFav();
    }
  }

  addToFav() {
    createRequest('GET', endpoints.favourites.addProduct(this.item.product_id)).then(this.updateFavourites);
  }

  removeFromFav() {
    createRequest('GET', endpoints.favourites.deleteProduct(this.item.product_id)).then(this.updateFavourites);
  }

  updateFavourites() {
    this.item.isFavourite = !this.item.isFavourite;
    $store.dispatch('app/updateFavouritesCount');
  }

  prepareData(type: 'self' | 'group') {
    const data: any = {
      id: this.item.product_id,
      options: Object.values(this.selectedOptions),
      count: this.itemAmount,
    };
    if (type === 'self') {
      data.self_price = this.item.selfPrice;
    } else {
      data.group_price = this.item.groupPrice;
    }
    return data;
  }

  sendOrder(type: 'self' | 'group') {
    const data = this.prepareData(type);
    const url = type === 'self' ? endpoints.order.self : endpoints.order.group;
    this.pending = true;
    createRequest('POST', url, data)
      .then((res: OrderResponse) => {
        const orderId = res.data.data.oid;
        if (orderId) {
          router.push({ path: `/order/${orderId}` });
        }
      })
      .catch(() => {
        this.pending = false;
      });
  }

  buySelf() {
    if (this.isAuthorized) {
      this.sendOrder('self');
    } else {
      this.$root.$emit('show-login-modal');
    }
  }

  buyGroup() {
    if (this.isAuthorized) {
      this.sendOrder('group');
    } else {
      this.$root.$emit('show-login-modal');
    }
  }

  divideNumberWithSpaces(number) {
    return divideNumberWithSpaces(number);
  }

  mounted() {
    this.selectedOptions = {};
    Object.keys(this.item.options).forEach((option: string) => {
      this.selectedOptions[option] = '';
    });
  }
}

</script>

<style lang="scss" scoped>
  .item-info {
    background: white;
    padding: 27px 15px 0;
    margin-bottom: 12px;

    @include tablet() {
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      overflow: hidden;
      padding: 23px 32px 0;
      margin-bottom: 17px;
    }

    &__title {
      font-size: 16px;
      line-height: normal;
      font-weight: bold;
      color: #222222;
      margin-bottom: 14px;

      @include tablet() {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }

    &__amount-container {
      display: flex;
      align-items: flex-end;

      @include tablet() {
        align-items: center;
      }
    }

    &__amount {

    }

    &__amount-text {
      font-size: 14px;
      color: #7b8197;
      margin-left: 21px;

      @include tablet() {
        margin-left: 14px;
      }
    }

    &__orders {
      font-size: 14px;
      line-height: normal;
      letter-spacing: normal;
      color: #7b8197;
      display: flex;
      align-items: center;

      img {
        margin-right: 12px;
      }
    }

    &__info {
      display: flex;
      align-items: center;
    }

    &__orders {
      margin-right: 26px;
    }

    &__prices {
      display: flex;
      align-items: flex-end;
      margin-top: 6px;
    }

    &__options {
      @include clearList();
      margin-top: 30px;

      @include tablet() {
        margin-top: 20px;
      }
    }

    &__option {
      margin-bottom: 11px;
      border-bottom: 1px solid #ededed;
      padding-bottom: 7px;
      @include tablet() {
        margin-bottom: 17px;
      }

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    &__option-title {
      font-size: 14px;
      font-weight: bold;
      line-height: normal;
      color: #222222;
      margin: 0;

      margin-bottom: 14px;
    }

    &__option-label {
      margin-right: 9px;
      margin-bottom: 9px;

      span {
        cursor: pointer;
        border-radius: 4px;
        border: solid 1px #e1e1e1;
        font-size: 14px;
        line-height: normal;
        text-align: center;
        color: #222222;

        padding: 5px 14px;
        display: flex;
        align-items: center;

        &:last-child {
          /*margin-right: 0;*/
        }
      }

      input:checked + span {
        cursor: default;
        background-color: #222222;
        color: white;
        border-color: black;
      }
    }

    &__option-list {
      display: flex;
      flex-wrap: wrap;

      @include tablet() {
        padding-bottom: 10px;
      }
    }

    &__actions {
      display: flex;
      border-top: 1px solid #ede9e9;
      border-bottom: 1px solid #ede9e9;
      margin-top: 16px;
      margin-left: -15px;
      margin-right: -15px;

      @include tablet() {
        margin-left: -32px;
        margin-right: -32px;
        border-bottom: none;
      }
    }

    &__group-price {
      font-size: 32px;
      font-weight: 600;
      color: $blue;
      margin-right: 22px;
    }

    &__self-price {
      font-size: 24px;
      font-weight: 500;
      color: #7b8197;

      padding-bottom: 5px;

      @include tablet() {
        font-size: 32px;
        font-weight: 600;
      }

      &-value {
        text-decoration: line-through;
        font-weight: 500;
      }
    }

    &__fav, &__buy {
      background: none;
      box-shadow: none;
      border: none;
      display: block;
    }

    &__fav {
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #496cff;
      border-right: 1px solid #ede9e9;
      padding: 19px 12px;

      @include tablet() {
        padding: 24px 22px;
      }

      &--active {
        svg path {
          fill: $blue;
        }
      }
    }

    &__buy {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      padding: 0;

      &:disabled {
        cursor: default;
        opacity: 0.8;
      }

      &-price {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        color: #452608;
        display: block;

        @include tablet() {
          font-size: 24px;
        }
      }

      &-text {
        margin-top: 5px;
        font-size: 12px;
        line-height: normal;
        color: #8c8782;
        display: block;
      }

      &--grouped {
        background: #496cff;
        color: white;
      }

      &--grouped &-text, &--grouped &-price {
        color: white;
      }
    }
  }
</style>
