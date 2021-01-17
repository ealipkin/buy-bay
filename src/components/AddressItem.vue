<template lang="pug">
  .address-item
    input(type="radio" name="address" :value="item.id" :id="item.id" :checked="item.isActive" @change="change").visually-hidden
    label(:for="item.id").address-item__box
      span.address-item__custom-input
      span.address-item__content
        span.address-item__name {{fullName}}
        span.address-item__phone {{item.phone}}
        span.address-item__address {{addressLine1}}
        span.address-item__address {{addressLine2}}
      span.address-item__controls
        button(type="button" aria-label="редактировать" @click="edit")
          include ../assets/icons/pen.svg
        button(type="button" aria-label="удалить" @click="remove")
          include ../assets/icons/trash.svg
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';
import { AddressItem as ItemType } from '@/models/models';

@Component
export default class AddressItem extends Vue {
  @Prop() public item!: ItemType;

  @Prop() public i!: number;

  fullName = this.item.getFullName?.() || '';

  addressLine1 = this.item.getLocation?.() || '';

  addressLine2 = this.item.getGlobal?.() || '';

  @Emit()
  change(evt) {
    return { item: this.item, index: this.i };
  }

  @Emit()
  remove(evt) {
    return this.item.id;
  }

  @Emit()
  edit(evt) {
    return this.item.id;
  }
}
</script>

<style scoped lang="scss">
  .address-item {

    input:checked ~ .address-item__box {
      background-color: $grey-10;
      box-shadow: inset 0 0 0 1px $blue;

      .address-item__custom-input {
        border: 5px solid $blue;
        background-color: #fff;

        @include tablet() {
          border: 6px solid $blue;
        }
      }
    }
  }

  .address-item {

    &__box {
      display: flex;
      padding: 15px;
      box-shadow: inset 0 0 0 1px $grey-6;
      border-radius: 4px;

      @include tablet() {
        padding: 20px;

        max-width: 609px;
      }
    }

    &__content {
      margin-right: 30px;
    }

    &__custom-input {
      width: 16px;
      height: 16px;
      border: 1px solid $grey-8;
      background-color: $grey-9;
      border-radius: 50%;
      margin-right: 12px;
      flex-shrink: 0;
      margin-top: 4px;

      @include tablet() {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }
    }

    &__name {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;

      @include tablet() {
        font-size: 16px;
      }
    }

    &__phone {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;
      white-space: nowrap;

      @include tablet() {
        font-size: 16px;
      }
    }

    &__address {
      font-size: 12px;
      color: $grey-2;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__controls {
      margin-right: -15px;
      margin-left: auto;

      button {
        @include clearButton();
        margin-bottom: 18px;
        margin-right: 15px;
        width: 20px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
