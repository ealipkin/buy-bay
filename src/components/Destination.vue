<template lang="pug">
  .destination
    legend.destination__legend Aдрес Доставки
    label.destination__input-box
      select(name="country" placeholder="Страна *" required).destination__input.destination__select
        option(value="Russia") Россия
        option(value="USA") USA
      span.destination__label Страна

    .destination__input-box
      Input(name="city" label="Город" :value="addressItem.city" :required="true")

    .destination__input-box
      Input(name="district" :value="addressItem.district" label="Область")

    .destination__input-box
      Input(name="street" :value="addressItem.street" label="Улица")

    .destination__input-box.destination__input-box--half
      Input(name="house" :value="addressItem.house" label="Дом")

    .destination__input-box.destination__input-box--half
      Input(name="part" :value="addressItem.part" label="Корпус")

    .destination__input-box.destination__input-box--half
      Input(name="building" :value="addressItem.building" label="Строение")

    .destination__input-box.destination__input-box--half
      Input(name="flat" :value="addressItem.flat" label="Квартира/офис")

    .destination__input-box
      Input(name="index" label="Индекс" :value="addressItem.index" :required="true")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AddressItem } from '@/utils/models';
import Input from '@/components/Input.vue';

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
