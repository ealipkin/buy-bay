<template lang="pug">
  modal(name="address-modal" @closed="modalClose" :adaptive="true" :classes="'address-modal'" width="90%" :minWidth="290" :maxWidth="703" height="auto" :scrollable="true")
    article.modal
      h4.modal__title Добавить адрес
      button(type="button" @click="closeModal").modal__close.close
      form.modal__form
        fieldset.modal__form-fieldset
          Recipient.modal__recipient

        fieldset.modal__form-fieldset
          Destination.modal__destination

        button(type="submit" @click.prevent="addAddress").modal__button Добавить адрес

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Recipient from '@/components/Recipient.vue';
import Destination from '@/components/Destination.vue';

@Component({
  components: {
    Recipient,
    Destination,
  },
})
export default class AddressModal extends Vue {
  addAddress = () => {
    console.log('add address');
    this.closeModal();
  }

  showModal = () => {
    this.$modal.show('address-modal');

    console.log('show');
  };

  closeModal = () => {
    this.$modal.hide('address-modal');
    this.modalClose();
    console.log('close');
  };

  modalClose = () => {
    document.body.classList.remove('_hidden');
  };
}
</script>

<style lang="scss" scoped>
  .modal {
    padding: 16px;
    padding-bottom: 24px;
    border-radius: 8px;

    @include tablet() {
      padding: 39px 50px 58px;
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
        margin-bottom: 48px;
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

    &__form-fieldset {
      margin: 0;
      padding: 0;
      border: none;
    }

    &__recipient {
      margin-bottom: 24px;

      @include tablet() {
        margin-bottom: 55px;
      }
    }

    &__destination {
      margin-bottom: 48px;

      @include tablet() {
        margin-bottom: 88px;
      }
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
      }
    }
  }
</style>
