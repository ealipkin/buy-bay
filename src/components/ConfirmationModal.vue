<template lang="pug">
  modal(name="confirmation-modal" @closed="modalClose" :adaptive="true" :classes="'address-modal'" width="90%" :minWidth="290" :maxWidth="maxWidth" height="auto" :scrollable="true")
    article.modal
      h4.modal__title {{title}}
      button(type="button" @click="handleCancel").modal__close.close
      .modal__content
        div(v-html="text").modal__text.modal__text--warning
        .modal__buttons
          button(type="button" @click="handleConfirm").button.button--secondary {{confirmText}}
          button(type="button" @click="handleCancel").button {{cancelText}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmationModal extends Vue {
  @Prop({ default: 'Вы уверены?' }) title!: string;

  @Prop({ default: 'Данное действие нельзя отменить' }) text!: string;

  @Prop({ default: 'Подтвердить' }) confirmText!: string;

  @Prop({ default: 'Отменить' }) cancelText!: string;

  @Prop({ default: 390 }) maxWidth!: number;

  showModal(data) {
    this.$modal.show('confirmation-modal');
  }

  modalClose() {
    this.$modal.hide('confirmation-modal');
    document.body.classList.remove('_hidden');
  }

  handleConfirm() {
    this.$emit('confirm');
    this.modalClose();
  }

  handleCancel() {
    this.$emit('cancel');
    this.modalClose();
  }
}
</script>

<style lang="scss" scoped>
.modal {

  &__close.close {
    top: 20px;
    right: 20px;
  }
}
</style>
