<template lang="pug">
  modal(name="address-modal" @closed="modalClose" :adaptive="true" :classes="'address-modal'" width="90%" :minWidth="290" :maxWidth="703" height="auto" :scrollable="true")
    article.modal
      h4.modal__title {{isEdit ? 'Изменить' : 'Добавить' }} адрес
      button(type="button" @click="closeModal").modal__close.close
      ValidationObserver(v-slot="{ validate }")
        form(@submit.prevent="validate().then(addAddress)").modal__form
          fieldset.modal__form-fieldset
            Recipient(:addressItem="addressItem").modal__recipient

          fieldset.modal__form-fieldset
            Destination(:addressItem="addressItem").modal__destination

          button(type="submit").modal__button {{isEdit ? 'Изменить' : 'Добавить' }} адрес
    Toasted(ref="toasted")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Recipient from '@/components/Recipient.vue';
import Destination from '@/components/Destination.vue';
import { UserAddressItem } from '@/models/models';
import Toasted from '@/components/Toasted.vue';

@Component({
  components: {
    Recipient,
    Destination,
    Toasted,
  },
})
export default class AddressModal extends Vue {
  addressItem: UserAddressItem | object = {};

  isEdit = false;

  addAddress(valid) {
    if (valid) {
      if (this.isEdit) {
        this.$emit('update', { address: this.addressItem });
      } else {
        this.$emit('add', { address: this.addressItem });
      }
      this.closeModal();
    }
  }

  showModal(data) {
    if (data && data.id) {
      this.addressItem = data;
      this.isEdit = true;
    } else {
      this.addressItem = {};
      this.isEdit = false;
    }

    this.$modal.show('address-modal');
  }

  closeModal() {
    this.$modal.hide('address-modal');
    this.modalClose();
  }

  modalClose() {
    document.body.classList.remove('_hidden');
  }
}
</script>

<style lang="scss">
  .modal .modal__button:disabled {
    background: $grey-15;
    color: #fff;
  }
</style>

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
