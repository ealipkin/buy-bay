<template lang="pug">
  modal(name="profile-modal" @closed="modalClose" :adaptive="true" :classes="'profile-modal'" width="90%" :minWidth="290" :maxWidth="460" height="auto" :scrollable="true")
    article.modal
      h4.modal__title Изменить данные
      button(type="button" @click="closeModal").modal__close.close
      ValidationObserver(v-slot="{ invalid }")
        form(@submit.prevent="saveData").form.modal__form
          UserEdit(:user="user").modal__user-edit

          Input(:rules="['required']" label="Телефон" :value="user.contacts.phone" name="phone" type="text").form__input
          Input(:rules="['required', 'email']" label="Email" :value="user.contacts.email" name="email" type="text").form__input

          button(type="submit" :disabled="invalid").modal__button Сохранить данные
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserEdit from '@/components/UserEdit.vue';
import Input from '@/components/Input.vue';
import Toasted from '@/components/Toasted.vue';
import { createProfileUser } from '@/utils/data';

@Component({
  components: {
    UserEdit,
    Input,
    Toasted,
  },
})
export default class ProfileModal extends Vue {
  user = createProfileUser(null, 1);

  saveData() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Ваши данные сохранены');
    this.closeModal();
  }

  showModal() {
    this.$modal.show('profile-modal');

    console.log('show');
  }

  closeModal() {
    this.$modal.hide('profile-modal');
    this.modalClose();
    console.log('close');
  }

  modalClose() {
    document.body.classList.remove('_hidden');
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
