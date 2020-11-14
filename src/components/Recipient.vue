<template lang="pug">
  .recipient
    legend.recipient__legend Получатель
    .recipient__input-box
      Input(name="surname" label="Фамилия" value="фамилия" :required="true")

    .recipient__input-box
      Input(name="surname" label="Имя" :required="true")

    .recipient__input-box
      Input(name="patronymic" label="Отчество")

    .recipient__input-box
      Input(name="email" label="Электнонная почта")

    .recipient__input-box
      Input(name="phone" label="Мобильный телефон")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';

@Component({
  components: { Input }
})
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

  }
</style>
