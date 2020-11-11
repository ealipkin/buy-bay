<template lang="pug">
  .delivery-address
    h3.delivery-address__title Адрес доставки
    .delivery-address__item
      h4.delivery-address__sub-title
        span.delivery-address__name {{contacts.name + ','}}
        span.delivery-address__phone {{contacts.phone}}
      p.delivery-address__location {{formatLocation(contacts.address)}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contacts } from '@/utils/models';

@Component
export default class DeliveryAddress extends Vue {
  @Prop() public contacts!: Contacts;

  formatLocation = (address) => Object.values(address).join(', ');
}
</script>

<style scoped lang="scss">
  .delivery-address {
    background-color: #fff;
    padding: 19px 16px 24px;

    @include tablet() {
      padding: 40px;
      padding-top: 33px;
    }

    &__title {
      font-size: 16px;
      color: $black-1;
      font-weight: 600;
      margin: 0;
      margin-bottom: 19px;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 24px;
      }
    }

    &__item {
      border: 1px solid $grey-6;
      border-radius: 4px;
      padding: 12px 20px;

      @include tablet() {
        padding: 20px 28px;
      }
    }

    &__sub-title {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;
      margin: 0;
      margin-bottom: 6px;

      @include tablet() {
        font-size: 16px;
        margin-bottom: 9px;
      }
    }

    &__name {
      display: block;

      @include tablet() {
        display: inline;
        margin-right: 5px;
      }
    }

    &__phone {
      white-space: nowrap;
    }

    &__location {
      margin: 0;
      padding-right: 70px;
      font-size: 12px;
      color: $grey-2;

            @include tablet() {
        width: 345px;
        max-width: 100%;
        padding: 0;
        font-size: 14px;
      }
    }
  }
</style>
