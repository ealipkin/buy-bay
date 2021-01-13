<template lang="pug">
  .phone-confirmation
    ValidationObserver(v-slot="{ validate }" v-show="!phoneSend" v-if="!byMail")
      form(@submit.prevent="validate().then(handleGetCodeClick)").form.phone-confirmation__phone-section
        Input(:rules="['required', 'phone']" label="Телефон" name="phone" mask="+7 999 999-99-99" @input="handlePhoneInput" ref="phoneInput").form__input
        button(type="button" @click="validate().then(handleGetCodeClick)").button.form__login-button Получить код

    ValidationObserver(v-slot="{ validate }" v-show="!phoneSend" v-if="byMail")
      form(@submit.prevent="validate().then(handleGetCodeClick)").form.phone-confirmation__phone-section
        Input(:rules="['required', 'email']" label="Электронная почта" name="email" mask="" ref="mailInput").form__input
        button(type="button" @click="validate().then(handleGetCodeClick)").button.form__login-button Получить код
    div(v-if="error").phone-confirmation__error {{error}}
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

        div(v-if="smsCode") <br><br>Код из смс (для теста) - {{smsCode}}

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Input from '@/components/Input.vue';
import { PHONE_CODE_LENGTH } from '@/validations';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { Action } from 'vuex-class';
import { CONFIRMATION_STEPS } from '@/models/enums';

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
  @Action('app/loadUser') loadUser;

  @Prop() public byMail!: boolean;

  smsCode: number | null = null;

  smsToken: string | null = null;

  phoneSend = false;

  phoneNumber = '';

  code: string | number = '';

  error: string | null = null;

  get safePhoneNumber() {
    const number = this.phoneNumber || '+7(911)566-78-98';
    const splittedPhone = number.split('-');
    return this.byMail ? `${splittedPhone[0].replace(/\d/g, '*')}-${splittedPhone[1]}-${splittedPhone[2]}` : this.phoneNumber;
  }

  handleChangePhoneClick() {
    this.phoneSend = false;
    (this.$refs.phoneInput as any).doFocus();
    this.$emit('step-change', CONFIRMATION_STEPS.PHONE);
  }

  async handleGetCodeClick(isValid) {
    if (isValid) {
      this.error = null;
      this.getCode().then(this.getCodeSuccess).catch(this.catchError);
    }
  }

  getCodeSuccess(res: GetCodeResponse) {
    const { data } = res;
    if (data.success) {
      this.smsCode = data.data.code;
      this.smsToken = data.data.token;
      this.openCodeStep();
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
    this.$emit('step-change', CONFIRMATION_STEPS.CODE);
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
    this.code = safeValue;
    if (safeValue && !Number.isNaN(value) && String(value).length === PHONE_CODE_LENGTH) {
      this.login()
        .then(this.checkCodeSuccess)
        .catch(this.catchError);
    }
  }

  checkCodeSuccess(res: LoginResponse) {
    const { data } = res.data;
    const { token } = data;
    const { $auth } = this as any;
    $auth.token(null, token, false);
    this.$emit('confirmed');
    this.loadUser();
  }

  catchError(res) {
    this.error = res.response && res.response.data && res.response.data.message;
  }

  async login(): Promise<LoginResponse> {
    const phone = `+${this.safePhoneNumber.replace(/\D/g, '')}`;
    const code = String(this.code);
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

  mounted() {
    this.$emit('step-change', CONFIRMATION_STEPS.PHONE);
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

    &__error {
      margin-top: 10px;
      font-size: 14px;
      color: $red-1;
    }
  }
</style>
