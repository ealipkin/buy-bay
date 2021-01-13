<template lang="pug">
  .destination
    legend.destination__legend Адрес доставки

    .destination__input-box
      Input(name="city" label="Город" :value="addressItem ? addressItem.city : addressItem" :rules="['required']")

    .destination__input-box
      Input(name="district" :value="addressItem ? addressItem.district : addressItem" label="Область" :rules="['alpha']")

    .destination__input-box
      Input(name="street" :value="addressItem ? addressItem.street : addressItem" label="Улица")

    .destination__input-box.destination__input-box--half
      Input(name="house" :value="addressItem ? addressItem.house : addressItem" label="Дом")

    .destination__input-box.destination__input-box--half
      Input(name="part" :value="addressItem ? addressItem.part : addressItem" label="Корпус")

    .destination__input-box.destination__input-box--half
      Input(name="building" :value="addressItem ? addressItem.building : addressItem" label="Строение")

    .destination__input-box.destination__input-box--half
      Input(name="flat" :value="addressItem ? addressItem.flat : addressItem" label="Квартира/офис")

    .destination__input-box
      Input(name="index" label="Индекс" :value="addressItem ? addressItem.index : addressItem" :rules="['required', 'digits:6']")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import { AddressItem } from '@/models/models';

@Component({
  components: { Input },
})
export default class Destination extends Vue {
  @Prop() public addressItem!: AddressItem | object;
}
</script>

<style scoped lang="scss">
  .destination {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include tablet() {
      margin-right: -16px;
    }

    &__legend {
      font-size: 16px;
      font-weight: 600;
      color: $grey-2;
      margin-bottom: 13px;
      width: 100%;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 33px;
      }
    }

    &__input-box {
      position: relative;
      margin-bottom: 25px;
      width: 100%;

      &--half {
        width: 49%;
      }

      @include tablet() {
        width: 30%;
        flex-grow: 1;
        margin-right: 16px;

        &--half {
          width: 30%;
        }
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__input {
      padding: 15px 20px;
      border: 1px solid $grey-11;
      border-radius: 4px;
      font-size: 16px;
      color: $black-1;
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    &__select {
      margin-bottom: 25px;
    }

    &__label {
      display: none;
      position: absolute;
      top: 0;
      left: 15px;
      padding: 0 5px;
      transform: translate(0, -50%);
      font-size: 12px;
      color: $grey-2;
      background-color: #fff;
    }
  }

  .destination__input:not(:placeholder-shown) + .destination__label {
    display: inline;
  }

  .destination__input:focus + .destination__label {
    color: $blue-2;
  }

  .destination__input:focus {
    border: 1px solid $blue-2;
    outline: none;
  }

  .destination__input:required + .destination__label::after {
    content: " *";
    font-size: 12px;
    color: $red-1;
  }
</style>
