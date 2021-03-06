<template lang="pug">
  .credit-card-item
    input(type="radio" name="card" :value="item.id" :id="item.id" :checked="item.is_active" @change="select").visually-hidden
    label(:for="item.id").credit-card-item__box
      span.credit-card-item__custom-input
      span.credit-card-item__content
        span(v-if="item.card_type === cardTypes.MASTERCARD").credit-card-item__type
          include ../assets/icons/mastercard.svg
        span(v-if="item.card_type === cardTypes.VISA").credit-card-item__type
          include ../assets/icons/visa-card.svg
        span.credit-card-item__number {{number}}

      span.credit-card-item__controls
        button(type="button" aria-label="удалить" @click="remove")
          include ../assets/icons/trash.svg
    Toasted(ref="toasted")
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';
import { CardItem } from '@/models/models';
import { CARD_TYPES } from '@/models/enums';
import Toasted from '@/components/Toasted.vue';

@Component({
  components: {
    Toasted,
  },
})
export default class CreditCardItem extends Vue {
  @Prop() public item!: CardItem;

  cardTypes = CARD_TYPES;

  number = `●●●● ${this.item.last4}`;

  @Emit()
  select() {
    return this.item;
  }

  @Emit()
  remove() {
    return this.item;
  }
}
</script>

<style scoped lang="scss">
  .credit-card-item {
    &:hover &__box {
      background-color: $grey-10;
    }

    input:checked ~ .credit-card-item__box {
      background-color: $grey-10;
      box-shadow: inset 0 0 0 1px $blue;

      .credit-card-item__custom-input {
        border: 5px solid $blue;
        background-color: #fff;

        @include tablet() {
          border: 6px solid $blue;
        }
      }
    }
  }

  .credit-card-item {

    &__box {
      display: flex;
      padding: 15px;
      box-shadow: inset 0 0 0 1px $grey-6;
      border-radius: 4px;
      align-items: center;

      @include tablet() {
        padding: 20px;

        max-width: 609px;
      }
    }

    &__content {
      margin-right: 30px;
      display: flex;
    }

    &__custom-input {
      width: 16px;
      height: 16px;
      border: 1px solid $grey-8;
      background-color: $grey-9;
      border-radius: 50%;
      margin-right: 12px;
      flex-shrink: 0;

      @include tablet() {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }
    }

    &__type {
      margin-right: 20px;
      display: flex;
      align-items: center;

      svg {
        display: block;
      }
    }

    &__number {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;

      @include tablet() {
        font-size: 16px;
      }
    }

    &__controls {
      margin-right: -15px;
      margin-left: auto;

      button {
        @include clearButton();
        width: 20px;
        margin-bottom: 18px;
        margin-right: 15px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
