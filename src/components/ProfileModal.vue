<template lang="pug">
  modal(name="profile-modal" @closed="modalClose" :adaptive="true" :classes="'profile-modal'" width="90%" :minWidth="290" :maxWidth="460" height="auto" :scrollable="true")
    article(v-if="user").modal
      h4.modal__title Изменить данные
      button(type="button" @click="closeModal").modal__close.close
      ValidationObserver(v-slot="{ validate }")
        form(@submit.prevent="validate().then(handleSaveProfileSubmit)").form.modal__form
          UserEdit(:user="user").modal__user-edit

          Input(
            :rules="['required', 'phone']"
            label="Телефон"
            v-model="user.phone"
            name="phone"
            type="text" :mask="INPUT_MASKS.phone" :placeholder="INPUT_PLACEHOLDERS.phone"
            @input="handlePhoneInput"
          ).form__input
          div(v-if="smsCodeError && !showSmsCode").modal__code-error {{smsCodeError}}
          div(v-if="showSmsCode").form__input
            Input(:rules="['phoneCode']"
              label="Код из СМС" name="code"
              :mask="INPUT_MASKS.smsCode"
              :placeholder="INPUT_PLACEHOLDERS.smsCode"
              @input="handleCodeInput" ref="codeInput"
              v-model="code"
            ).form__input
            div(v-if="smsCodeError").modal__code-error {{smsCodeError}}
            span.modal__code-text Номер телефона был изменен, необходимо подтверждение

            vac(:left-time="59999" ref="countdown")
              template(v-slot:process="{ timeObj }")
                .phone-confirmation__code-timer
                  span.phone-confirmation__code-time Получить новый код можно
                  span через {{ `${timeObj.m}:${timeObj.s}`}}
              template(v-slot:finish)
                div
                  button(type="button" @click="handleGetNewCodeClick").phone-confirmation__code-get-new.link   Получить новый код

            div(v-if="smsCode") <br><br>Код из смс (для теста) - {{smsCode}}

          Input(:rules="['email']" label="Email" v-model="user.email" name="email" type="text" ).form__input

          button(type="submit").modal__button Сохранить данные
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserEdit from '@/components/UserEdit.vue';
import Input from '@/components/Input.vue';
import Toasted from '@/components/Toasted.vue';
import { ProfileUser } from '@/models/models';
import { INPUT_MASKS, INPUT_PLACEHOLDERS, PHONE_CODE_LENGTH } from '@/validations';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import $store from '@/store';
import { CONFIRMATION_STEPS } from '@/models/enums';
import { GetCodeResponse } from '@/models/responses';

const getFormData = (object) => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key]);
  return formData;
}, new FormData());

@Component({
  components: {
    UserEdit,
    Input,
    Toasted,
  },
})
export default class ProfileModal extends Vue {
  INPUT_MASKS = INPUT_MASKS;

  INPUT_PLACEHOLDERS = INPUT_PLACEHOLDERS;

  user: ProfileUser | null = null;

  showSmsCode = false;

  smsCodeError = '';

  initialPhone = '';

  code = '';

  smsCode: number | undefined = undefined;

  smsToken = '';

  saveData() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Ваши данные сохранены');
    $store.dispatch('profile/loadProfile');
    this.closeModal();
  }

  showModal(user: ProfileUser) {
    this.user = { ...user };
    this.initialPhone = user.phone;
    this.$modal.show('profile-modal');
  }

  closeModal() {
    this.$modal.hide('profile-modal');
    this.modalClose();
  }

  modalClose() {
    document.body.classList.remove('_hidden');
  }

  handleSaveProfileSubmit(valid) {
    if (!valid) {
      return;
    }
    this.updateUser();
  }

  handlePhoneInput() {
    this.showSmsCode = false;
    this.smsCodeError = '';
  }

  handleCodeInput() {
    this.smsCodeError = '';
    const safeValue = Number(this.code);
    if (safeValue && !Number.isNaN(this.code) && String(this.code).length === PHONE_CODE_LENGTH) {
      this.requestPhoneConfirmation(safeValue);
    }
  }

  requestPhoneConfirmation(code) {
    const phone = `+${this.user && this.user.phone.replace(/\D/g, '')}`;
    createRequest('POST', endpoints.profile.checkPhone, { phone, code, token: this.smsToken })
      .then((res) => {
        const { data } = res.data;
        if (typeof data === 'string') {
          this.smsCodeError = data;
        } else {
          this.updateUser();
        }
      })
      .catch(this.catchError);
  }

  updateUser() {
    if (!this.user) {
      return;
    }
    const userImage: string = this.user.image;
    const user = getFormData(this.user);
    user.append('photo', userImage);
    this.code = '';
    createRequest('POST', endpoints.profile.edit, user, null, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => {
        const { data } = res.data;
        const needConfirmPhone = data.needPhoneConfirm;
        if (needConfirmPhone) {
          this.smsToken = data.token;
          this.smsCode = data.code;
          this.openCodeStep();
        } else {
          this.showSmsCode = false;
          this.saveData();
        }
      })
      .catch(this.catchError);
  }

  async getCode(): Promise<GetCodeResponse> {
    const phone = `+${this.user && this.user.phone.replace(/\D/g, '')}`;
    return createRequest('POST', endpoints.getPhoneCode, { phone });
  }

  catchError(res) {
    this.smsCodeError = res.response && res.response.data && res.response.data.message;
  }

  handleGetNewCodeClick() {
    this.getCode().then(this.getCodeSuccess).catch(this.catchError);
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
    this.showSmsCode = true;
    const codeInput = (this.$refs.codeInput as any);
    if (this.$refs.countdown) {
      (this.$refs.countdown as any).startCountdown(true);
    }
    this.code = '';
    codeInput.doFocus();
    this.smsCodeError = '';
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    padding: 16px;
    padding-bottom: 24px;
    border-radius: 8px;

    @include tablet() {
      padding: 28px 50px 58px;
    }

    &__title {
      font-size: 16px;
      margin: 0;
      margin-bottom: 24px;
      font-weight: 600;
      color: $black-1;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 70px;
      }
    }

    &__code-text {
      color: $grey-2;
    }

    .modal__close.close {
      right: 14px;
      top: 16px;

      @include tablet() {
        right: 26px;
        top: 24px;
        width: 30px;
        height: 30px;
      }
    }

    &__user-edit {
      margin-bottom: 60px;
    }

    &__button {
      @include clearButton();
      border-radius: 8px;
      background-color: $blue;
      text-align: center;
      padding: 17px;
      padding-bottom: 19px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      display: block;
      width: 100%;

      @include tablet() {
        width: auto;
        min-width: 289px;
        margin: 0 auto;
        width: 100%;
      }
    }

    .phone-confirmation__code-timer {
      margin-top: 5px;
    }

    &__error {

      display: block;
      margin-bottom: 20px;
    }

    &__code-error {
      margin-top: -15px;
      color: $red-1;
      margin-bottom: 10px;
    }
  }
</style>
