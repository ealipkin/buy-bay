<template lang="pug">
  .chat
    h3.chat__title Связь с продавцом
    ul.chat__list
      li(v-for="message in messages").chat__item
        img(:src="getUserById(message.userId).avatar").chat__avatar
        span.chat__message
          span.chat__message-person {{getUserById(message.userId).name}}
          span.chat__message-date {{message.date}}
          span.chat__message-text {{message.text}}

    form(@submit.prevent).chat__form
      label
        span.chat__form-label Ваше сообщение
        textarea.chat__form-textarea Вот это поворот, давайте быстрее
      button(type="submit").button Отправить
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message, OrderUser } from '@/models/models';

@Component
export default class Chat extends Vue {
  @Prop() public users!: OrderUser[];

  @Prop() public messages!: Message[];

  getUserById = (id) => this.users.find((user) => user.id === id);
}
</script>

<style scoped lang="scss">
  .chat {
    background-color: #fff;
    padding: 16px;
    padding-bottom: 60px;

      @include tablet() {
        padding: 40px;
        padding-top: 33px;
      }

    &__title {
      margin-bottom: 34px;
      font-size: 16px;
      color: $black-1;
      font-weight: bold;

      @include tablet() {
        font-size: 18px;
      }
    }

    &__list {
      @include clearList();
      margin-bottom: 32px;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      padding-bottom: 14px;
      margin-bottom: 16px;
      border-bottom: 1px solid $grey-4;

      @include tablet() {
        padding-bottom: 24px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__avatar {
      width: 40px;
      height: auto;
      border-radius: 50%;
    }

    &__message {
      padding-left: 16px;
    }

    &__message-person {
      display: block;
      color: $black-1;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 6px;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__message-date {
      font-size: 12px;
      color: $grey-2;
      margin-bottom: 17px;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__message-text {
      font-size: 12px;
      color: $black-1;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__form-label {
      font-size: 13px;
      color: $black-1;
      font-weight: bold;
      margin-bottom: 17px;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__form-textarea {
      padding: 16px 20px;
      width: 100%;
      resize: none;
      border-radius: 2px;
      border: none;
      background-color: $grey-1;
      font-size: 12px;
      color: $black-1;
      margin-bottom: 16px;
      min-height: 80px;

      @include tablet() {
        font-size: 14px;
      }
    }
  }
</style>
