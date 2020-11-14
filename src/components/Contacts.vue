<template lang="pug">
  .contacts
    h3.contacts__title Moи контакты
    ul.contacts__list
      li.contacts__item
        include ../assets/icons/phone.svg
        span
          span.contacts__item-label телефон
          span.contacts__item-value {{contacts.phone}}
      li.contacts__item
        include ../assets/icons/mail.svg
        span
          span.contacts__item-label email
          span.contacts__item-value {{contacts.email}}

    button(type="button").contacts__button.link Изменить данные
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Contacts extends Vue {
  @Prop() public contacts!: object;
}
</script>

<style scoped lang="scss">
  .contacts {
    background-color: #fff;
    padding: 16px;
    padding-bottom: 24px;

    @include tablet() {
      padding: 0;
    }

    &__title {
      margin: 0;
      margin-bottom: 18px;
      font-size: 16px;
      color: $black-1;
      font-weight: 600;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
      }
    }

    &__list {
      @include clearList();
      margin-bottom: 30px;

      @include tablet() {
        margin-bottom: 26px;
        display: flex;
        align-items: center;
      }
    }

    &__item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 16px;

      @include tablet() {
        margin-bottom: 0;
        margin-right: 100px;
      }

      &:last-child {
        margin-bottom: 0;
        margin-right: 0;
      }

      svg {
        margin-right: 16px;
        width: 24px;
        color: $grey-2;
      }
    }

    &__item-label {
      font-size: 12px;
      color: $grey-2;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__item-value {
      font-size: 14px;
      color: $black-1;
    }

    &__button {
      @include tablet() {
        min-width: 193px;
        padding: 10px;
        padding-bottom: 11px;
        color: $black-1;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        border-radius: 4px;
        background-color: $grey-1;
        text-decoration: none;
      }
    }
  }
</style>
