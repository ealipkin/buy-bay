<template lang="pug">
  .phone-confirmation
    ValidationObserver(v-slot="{ validate }" v-show="!phoneSend" v-if="!byMail")
      form(@submit.prevent="validate().then(handleGetCodeClick)").form.phone-confirmation__phone-section
        Input(:rules="['required', 'phone']" label="Телефон" name="phone" :mask="INPUT_MASKS.phone" :placeholder="INPUT_PLACEHOLDERS.phone" v-model="phoneNumber" ref="phoneInput" @input="phoneInputChange").form__input
        button(type="button" @click="validate().then(handleGetCodeClick)").button.form__login-button Получить код
      div(v-if="error").phone-confirmation__error {{error}}

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
        Input(:rules="['required', 'phoneCode']" label="Код из СМС" name="code" :mask="INPUT_MASKS.smsCode" :placeholder="INPUT_PLACEHOLDERS.smsCode" @input="handleCodeInput" ref="codeInput" v-model="code").form__input
        div(v-if="error").phone-confirmation__error {{error}}
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
import { PHONE_CODE_LENGTH, INPUT_MASKS, INPUT_PLACEHOLDERS } from '@/validations';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import { Action } from 'vuex-class';
import { CONFIRMATION_STEPS } from '@/models/enums';
import { GetCodeResponse } from '@/models/responses';

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

  INPUT_MASKS = INPUT_MASKS;

  INPUT_PLACEHOLDERS = INPUT_PLACEHOLDERS;

  smsCode: number | null = null;

  smsToken: string | null = null;

  phoneSend = false;

  phoneNumber = '+7';

  code: string | number = '';

  error: string | null = null;

  pending = false;

  get safePhoneNumber() {
    const number = this.phoneNumber;
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

  phoneInputChange() {
    this.error = null;
  }

  openCodeStep() {
    const codeInput = (this.$refs.codeInput as any);
    this.phoneSend = true;
    if (this.$refs.countdown) {
      (this.$refs.countdown as any).startCountdown(true);
    }
    this.code = '';
    codeInput.doFocus();
    this.$emit('step-change', CONFIRMATION_STEPS.CODE);
  }

  async getCode(): Promise<GetCodeResponse> {
    const phone = `+${this.safePhoneNumber.replace(/\D/g, '')}`;
    return createRequest('POST', endpoints.getPhoneCode, { phone });
  }

  handleCodeInput() {
    const safeValue = Number(this.code);
    if (safeValue && !Number.isNaN(this.code) && String(this.code).length === PHONE_CODE_LENGTH) {
      this.login(safeValue);
    }
  }

  checkCodeSuccess(res: LoginResponse) {
    const { data } = res.data;
    const { token } = data;
    const { $auth } = this as any;
    $auth.token(null, token, false);
    this.$emit('confirmed');
    this.loadUser();
    this.pending = false;
  }

  catchError(res) {
    this.error = res.response && res.response.data && res.response.data.message;
    this.pending = false;
  }

  async login(code) {
    if (this.pending) {
      return;
    }
    const phone = `+${this.safePhoneNumber.replace(/\D/g, '')}`;
    const token = this.smsToken;
    this.pending = true;
    (this as any).$auth.login({
      data: {
        phone, code: String(code), token,
      },
      fetchUser: false,
    })
      .then(this.checkCodeSuccess)
      .catch(this.catchError);
  }

  handleGetNewCodeClick() {
    this.getCode().then(this.getCodeSuccess).catch(this.catchError);
  }

  mounted() {
    this.$emit('step-change', CONFIRMATION_STEPS.PHONE);
    this.$nextTick(() => {
      const inputEl = (this.$refs.phoneInput as any).$el;
      (this.$refs.phoneInput as any).doFocus();
      if (inputEl) {
        // inputEl.setSelectionRange(1, 1);
      }
    });
  }
}

</script>

<style scoped lang="scss">
  .phone-confirmation {
    .form__input + .phone-confirmation__error {
      margin-top: -15px;
      margin-bottom: 15px;
    }

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
