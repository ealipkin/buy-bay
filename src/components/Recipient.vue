<template lang="pug">
  .recipient
    legend.recipient__legend Получатель
    label.recipient__input-box
      input(name="surname"  value="фамилия" placeholder="Фамилия *" required).recipient__input
      span.recipient__label Фамилия

    label.recipient__input-box
      input(name="name" placeholder="Имя *" required).recipient__input
      span.recipient__label Имя

    label.recipient__input-box
      input(name="patronymic" placeholder="Отчество").recipient__input
      span.recipient__label Отчество

    label.recipient__input-box
      input(name="email" placeholder="Электнонная почта").recipient__input
      span.recipient__label Электнонная почта

    label.recipient__input-box
      input(name="phone" placeholder="Мобильный телефон").recipient__input
      span.recipient__label Мобильный телефон

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Recipient extends Vue {
  @Prop() public prop!: boolean;
}
</script>

<style scoped lang="scss">
  .recipient {
    padding: 0;
    margin: 0;

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

  .recipient__input:not(:placeholder-shown) + .recipient__label {
      display: inline;
  }

  .recipient__input:focus + .recipient__label {
      color: $blue-2;
  }

  .recipient__input:focus {
    border: 1px solid $blue-2;
    outline: none;
  }

  .recipient__input:required + .recipient__label::after {
    content: " *";
    font-size: 12px;
    color: $red-1;
  }
</style>
