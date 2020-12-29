<template lang="pug">
  .phone-confirmation
    ValidationObserver(v-slot="{ validate }" v-show="!phoneSend" v-if="!byMail")
      form(@submit.prevent="validate().then(handleGetCodeClick)").form.phone-confirmation__phone-section
        Input(:rules="['required', 'phone']" label="Телефон" name="phone" mask="+7(999)999-99-99" @input="handlePhoneInput" ref="phoneInput").form__input
        button(type="button" @click="validate().then(handleGetCodeClick)").button.form__login-button Получить код

    ValidationObserver(v-slot="{ validate }" v-show="!phoneSend" v-if="byMail")
      form(@submit.prevent="validate().then(handleGetCodeClick)").form.phone-confirmation__phone-section
        Input(:rules="['required', 'email']" label="Электронная почта" name="email" mask="" ref="mailInput").form__input
        button(type="button" @click="validate().then(handleGetCodeClick)").button.form__login-button Получить код

    div(v-show="phoneSend").phone-confirmation__code
      div(v-if="byMail").phone-confirmation__code-text Мы отправили код подтверждения на указанный в аккаунте телефон 
        span.nowrap  {{safePhoneNumber}}&nbsp;

      div(v-if="!byMail").phone-confirmation__code-text Мы отправили код подтверждения на номер 
        span.nowrap {{safePhoneNumber}}&nbsp;
        button(type="button" @click="handleChangePhoneClick").phone-confirmation__code-change Изменить

      div.phone-confirmation__code-field
        Input(:rules="['required', 'phoneCode']" label="Код из СМС" name="code" mask="9999" @input="handleCodeInput" ref="codeInput").form__input
        .tac
          button(type="button" @click="handleGetNewCodeClick" v-if="byMail").phone-confirmation__code-get-new Получить новый код
        div(v-if="!byMail").tac
          vac(:left-time="59000" ref="countdown")
            template(v-slot:process="{ timeObj }")
              .phone-confirmation__code-timer
                .phone-confirmation__code-time Получить новый код можно
                span через {{ `${timeObj.m}:${timeObj.s}`}}
            template(v-slot:finish)
              button(type="button" @click="handleGetNewCodeClick").phone-confirmation__code-get-new Получить новый код

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Input from '@/components/Input.vue';
import { PHONE_CODE_LENGTH } from '@/validations';

@Component({
  components: { Input },
})
export default class PhoneConfirmation extends Vue {
  @Prop() public byMail!: boolean;

  phoneSend = false;

  phoneNumber = '';

  get safePhoneNumber() {
    const number = this.phoneNumber || '+7(911)566-78-98';
    const splittedPhone = number.split('-');
    return this.byMail ? `${splittedPhone[0].replace(/\d/g, '*')}-${splittedPhone[1]}-${splittedPhone[2]}` : this.phoneNumber;
  }

  handleChangePhoneClick() {
    this.phoneSend = false;
    (this.$refs.phoneInput as any).doFocus();
  }

  handleGetCodeClick(isValid) {
    if (isValid) {
      this.getCode();
      this.openCodeStep();
    }
  }

  openCodeStep() {
    this.phoneSend = true;
    if (this.$refs.countdown) {
      (this.$refs.countdown as any).startCountdown(true);
    }
    (this.$refs.codeInput as any).doFocus();
  }

  handlePhoneInput({ value }) {
    this.phoneNumber = value;
    // console.log(this.phoneNumber);
  }

  getCode() {
    console.log('getCode');
  }

  handleCodeInput({ value }) {
    console.log('handleCodeInput');
    const safeValue = Number(value);
    if (safeValue && !Number.isNaN(value) && String(value).length === PHONE_CODE_LENGTH) {
      this.$emit('confirmed');
    }
  }

  handleGetNewCodeClick() {
    this.openCodeStep();
  }
}

</script>

<style scoped lang="scss">
  .phone-confirmation {

    &__code-change {
      @include clearButton();
      @include link();
      color: $blue;
    }

    &__code-timer {
      color: $grey-2;
    }

    &__code-field {
      margin-top: 15px;
    }

    &__code-get-new {
      @include clearButton();
      @include link();
      color: $blue;
      text-align: center;
    }
  }
</style>
