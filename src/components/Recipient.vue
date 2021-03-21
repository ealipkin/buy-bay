<template lang="pug">
  .recipient
    legend.recipient__legend Получатель
    .recipient__input-box
      Input(name="surname" label="Фамилия" v-model="addressItem.surname" :rules="['required']")

    .recipient__input-box
      Input(name="name" label="Имя" v-model="addressItem.name" :rules="['required']")

    .recipient__input-box
      Input(name="patronymic" v-model="addressItem.patronymic" label="Отчество")

    .recipient__input-box
      Input(name="email" v-model="addressItem.email" :rules="['email', 'required']" label="Электронная почта")

    .recipient__input-box
      Input(:rules="['required', 'phone']" label="Мобильный телефон" name="phone" :mask="INPUT_MASKS.phone" :placeholder="INPUT_PLACEHOLDERS.phone" v-model="addressItem.phone" ref="phoneInput").form__input

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import { UserAddressItem } from '@/models/models';
import { INPUT_MASKS, INPUT_PLACEHOLDERS } from '@/validations';

@Component({
  components: { Input },
})
export default class Recipient extends Vue {
  @Prop() public addressItem!: UserAddressItem | undefined;

  INPUT_MASKS = INPUT_MASKS;

  INPUT_PLACEHOLDERS = INPUT_PLACEHOLDERS;
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
