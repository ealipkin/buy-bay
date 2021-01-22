<template lang="pug">
  modal(name="profile-modal" @closed="modalClose" :adaptive="true" :classes="'profile-modal'" width="90%" :minWidth="290" :maxWidth="460" height="auto" :scrollable="true")
    article(v-if="user").modal
      h4.modal__title Изменить данные
      h4 phoneChanged - {{phoneChanged}}
      button(type="button" @click="closeModal").modal__close.close
      ValidationObserver(v-slot="{ validate }")
        form(@submit.prevent="validate().then(handleSaveProfileSubmit)").form.modal__form
          UserEdit(:user="user").modal__user-edit

          Input(:rules="['required']" label="Телефон" v-model="user.phone" name="phone" type="text" :mask="INPUT_MASKS.phone" :placeholder="INPUT_PLACEHOLDERS.phone" @input="handlePhoneChange").form__input
          span(v-if="phoneError") Данный номер телефона уже зарегистрирован

          div(v-if="showSmsCode").form__input
            Input(:rules="['phoneCode']" label="Код из СМС" name="code" :mask="INPUT_MASKS.smsCode" :placeholder="INPUT_PLACEHOLDERS.smsCode" @input="handleCodeInput" ref="codeInput").form__input
            span.modal__code-text Номер телефона был изменен, необходимо подтверждение
            div(v-if="smsCodeError").modal__code-error {{smsCodeError}}

            vac(:left-time="59999" ref="countdown")
              template(v-slot:process="{ timeObj }")
                .phone-confirmation__code-timer
                  .phone-confirmation__code-time Получить новый код можно
                  span через {{ `${timeObj.m}:${timeObj.s}`}}
              template(v-slot:finish)
                button(type="button" @click="handleGetNewCodeClick").phone-confirmation__code-get-new Получить новый код

            div(v-if="smsCode") <br><br>Код из смс (для теста) - {{smsCode}}


          Input(label="Email" v-model="user.email" name="email" type="text").form__input

          button(type="submit").modal__button Сохранить данные
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserEdit from '@/components/UserEdit.vue';
import Input from '@/components/Input.vue';
import Toasted from '@/components/Toasted.vue';
import { ProfileUser } from '@/models/models';
import { INPUT_MASKS, INPUT_PLACEHOLDERS } from '@/validations';
import { createRequest } from '@/services/http.service';
import { endpoints } from '@/config';
import $store from '@/store';

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

  phoneChanged: boolean = false;

  showSmsCode: boolean = false;
  phoneError: string = '';
  smsCodeError: string = '';

  initialPhone: string = '';

  smsCode: string = '';

  saveData() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Ваши данные сохранены');
    $store.dispatch('profile/loadProfile');
    this.closeModal();
  }

  showModal(user: ProfileUser) {
    this.phoneChanged = false;
    this.user = { ...user };
    this.initialPhone = user.phone;
    this.showSmsCode = false;
    this.$modal.show('profile-modal');
  }

  closeModal() {
    this.$modal.hide('profile-modal');
    this.modalClose();
  }

  modalClose() {
    document.body.classList.remove('_hidden');
  }

  handlePhoneChange(value) {
    const initialPhone = this.initialPhone.replace(/\D/g, '');
    const newPhone = value.replace(/\D/g, '');
    if (initialPhone !== newPhone) {
      this.phoneChanged = true;
    }
  }

  handleSaveProfileSubmit() {
    if (this.phoneChanged) {
      this.requestPhoneConfirmation();
      return false;
    }
    this.updateUser();
  }

  handleCodeInput() {

  }

  requestPhoneConfirmation() {
    if (!this.user) {
      return;
    }
    const phone = `+${this.user.phone.replace(/\D/g, '')}`;
    createRequest('POST', endpoints.profile.checkPhone, { phone })
      .then(res => {
        console.log(res);
        this.showSmsCode = true;
        // show code field and request confirmation
      })
      .catch(err => {
        // show error here
        console.log(err);
      });
  }

  updateUser() {
    if (!this.user) {
      return;
    }
    const userImage: string = this.user.image;
    const formData = new FormData();
    formData.append('image', userImage);
    /* tslint:disable */
    const user = { ...this.user, photo: formData };
    createRequest('POST', endpoints.profile.edit, user)
      .then(() => {
        this.saveData();
      })
      .catch(err => {
        console.log(err);
      });
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
  }
</style>
