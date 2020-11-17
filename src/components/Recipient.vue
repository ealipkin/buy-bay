<template lang="pug">
  .recipient
    legend.recipient__legend Получатель
    .recipient__input-box
      Input(name="surname" label="Фамилия" :value="addressItem.surname" :required="true")

    .recipient__input-box
      Input(name="surname" label="Имя" :value="addressItem.name" :required="true")

    .recipient__input-box
      Input(name="patronymic" :value="addressItem.patronymic" label="Отчество")

    .recipient__input-box
      Input(name="email" :value="addressItem.email" label="Электнонная почта")

    .recipient__input-box
      Input(name="phone" :value="addressItem.phone" label="Мобильный телефон")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AddressItem } from '@/utils/models';
import Input from '@/components/Input.vue';

@Component({
  components: { Input },
})
export default class Recipient extends Vue {
  @Prop() public addressItem!: AddressItem | object;
}
</script>

<style scoped lang="scss">
  .recipient {
    @include tablet() {
      display: flex;
      flex-wrap: wrap;
      margin-right: -16px;
    }

    &__legend {
      font-size: 16px;
      font-weight: 600;
      color: $grey-2;
      margin-bottom: 13px;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 33px;
        width: 100%;
      }
    }

    &__input-box {
      position: relative;
      display: block;
      margin-bottom: 25px;

      @include tablet() {
        margin-right: 16px;
        flex-grow: 1;
        width: 28%;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }

  }
</style>
