<template lang="pug">
  modal(name="credit-card-modal" @closed="modalClose" :adaptive="true" :classes="'credit-card-modal'" width="90%" :minWidth="290" :maxWidth="787" height="auto" :scrollable="true")
    article.modal
      h4.modal__title Добавление карты
      button(type="button" @click="closeModal").modal__close.close
      ValidationObserver(v-slot="{ invalid }")
        form(@submit.prevent="AddCard").modal__form

          span.modal__form-border
            span.modal__form-box
              Input(name="number" label="Номер карты" :rules="['required']" value="6453 7633 7772 2300").modal__input.modal__input--number

            span.modal__form-box
              Input(name="owner" label="Имя держателя карты" :rules="['required', 'alpha']").modal__input.modal__input--owner
              Input(name="date" label="месяц/год" :rules="['required']").modal__input.modal__input--half.modal__input--date
              Input(name="cvv" label="код CVV" :rules="['required', 'digits:3']").modal__input.modal__input--half.modal__input--cvv

          span.modal__form-info Если нужна какая-то предупрепреждающая инфа, она будет здесь

          button(type="submit" :disabled="invalid").modal__button Добавить карту

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input,
  },
})
export default class CreditCardModal extends Vue {
  AddCard = () => {
    console.log('add card');
    this.closeModal();
  }

  showModal = () => {
    this.$modal.show('credit-card-modal');

    console.log('show');
  };

  closeModal = () => {
    this.$modal.hide('credit-card-modal');
    this.modalClose();
    console.log('close');
  };

  modalClose = () => {
    document.body.classList.remove('_hidden');
  };
}
</script>

<style lang="scss" scoped>
  .modal__input {
    &.modal__input--number {
      margin-bottom: 19px;
    }

    &.modal__input--cvv {
      margin-bottom: 19px;
    }
  }

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

    &__form-border {
      @include tablet() {
        display: block;
        position: relative;
        padding: 75px 56px 91px 43px;
        z-index: 1;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 485px;
        background-color: #fff;
        border: 1px solid $blue;
        box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.03);
        border-radius: 12px;
      }
      }
    }

    &__form-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @include tablet() {
        justify-content: flex-start;
      }
    }

    &__input {
      margin-bottom: 19px;
      width: 100%;

      &--half {
        width: 48%;
      }

      @include tablet() {
        &--number {
          width: 235px;
        }

        &--owner {
          width: 235px;
          margin-right: 20px;
        }

        &--date {
          width: 131px;
          margin-right: auto;
        }

        &--cvv {
          width: 111px;
        }
      }
    }

    &__form-info {
      display: none;

      @include tablet() {
        // font-family: 'Lato', Arial, sans-serif;
      margin-bottom: 58px;
      display: block;
      width: 516px;
      color: $grey-14;
      min-height: 308px;
      background-color: $grey-12;
      margin-left: auto;
      padding: 26px;
      padding-top: 264px;
      border-radius: 12px;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: 0;
      position: relative;
      margin-top: -250px;

      &::before {
        content: "";
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
        height: 56px;
        background-color: $grey-13;
      }
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
        min-width: 193px;
        margin: 0 auto;
      }
    }
  }
</style>
