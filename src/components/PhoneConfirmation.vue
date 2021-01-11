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

        div(v-if="smsCode") Код из смс (для теста) - {{smsCode}}
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
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';

interface GetCodeResponse {
  data: {
    data: {
      resp: string;
      code: number;
      token: string;
    };
    message: string;
    success: boolean;
  };
}

interface LoginResponse {
  data: {
    data: {
      status: string;
      token: string;
    };
  };
}

@Component({
  components: { Input },
})
export default class PhoneConfirmation extends Vue {
  @Prop() public byMail!: boolean;

  smsCode: number | null = null;

  smsToken: string | null = null;

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

  async handleGetCodeClick(isValid) {
    if (isValid) {
      this.getCode().then((res: GetCodeResponse) => {
        const { data } = res;
        if (data.success) {
          this.smsCode = data.data.code;
          this.smsToken = data.data.token;
          this.openCodeStep();
        }
      });
    }
  }

  openCodeStep() {
    const codeInput = (this.$refs.codeInput as any);
    this.phoneSend = true;
    if (this.$refs.countdown) {
      (this.$refs.countdown as any).startCountdown(true);
    }
    codeInput.setValue('');
    codeInput.doFocus();
  }

  handlePhoneInput({ value }) {
    this.phoneNumber = value;
  }

  async getCode(): Promise<GetCodeResponse> {
    const phone = `+${this.safePhoneNumber.replace(/\D/g, '')}`;
    return createRequest('POST', endpoints.getPhoneCode, { phone });
  }

  handleCodeInput({ value }) {
    const safeValue = Number(value);
    if (safeValue && !Number.isNaN(value) && String(value).length === PHONE_CODE_LENGTH && safeValue === this.smsCode) {
      this.login()
        .then((res: LoginResponse) => {
          const { data } = res.data;
          ((this as any).$auth).token(null, data.token, false);
          this.$emit('confirmed');
        });
    }
  }

  async login(): Promise<LoginResponse> {
    const phone = `+${this.safePhoneNumber.replace(/\D/g, '')}`;
    const code = String(this.smsCode);
    const token = this.smsToken;

    return (this as any).$auth.login({
      data: {
        phone, code, token,
      },
      fetchUser: false,
    });
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

    &__code-text {
      font-size: 14px;
    }
  }
</style>
