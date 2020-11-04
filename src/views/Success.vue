<template lang="pug">
  .success-page
    .success-page__wrapper
      .success-page__info
        span.success-page__nice Ура!
        h1.success-page__title Группа покупки создана
        p.success-page__message Теперь зовите друзей в группу и они получат супер-цену на данный товар. Достаточно 1 друга, чтобы товар был отправлен.

      hr.success-page__hr

      .success-page__share
        p.success-page__timer.timer
          span.timer__message Мы вернем деньги, если никто не присоединиться в течении 24 часов.
          span.timer__tick 23:59:23

        span.success-page__action Зови друзей скорее
        ul.success-page__social.social
          li.social__item fb
          li.social__item fb
          li.social__item fb
          li.social__item fb
          li.social__item fb
          li.social__item fb

        p.alternate-share
          label(for="copy").alternate-share__action Или скопируй ссылку, чтобы ей поделиться
          span.alternate-share__box
            input(value="http://vmdesh.ru/8dbuf3")#copy.alternate-share__input
            button.alternate-share__copy Скопировать

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class Success extends Vue {

}
</script>

<style lang="scss" scoped>
  .success-page {
    background-color: $grey-3;

    @include tablet() {
      padding: 34px 0 112px;
    }

    &__wrapper {
      background-color: #fff;

      @include tablet() {
        max-width: 884px;
        margin: 0 auto;
        border-radius: 8px;
        padding: 38px 150px 52px;
      }
    }

    &__info {
      margin: 0 auto;
      padding: 40px 16px 22px;

      @include tablet() {
        max-width: 571px;
        padding-bottom: 40px;
      }
    }

    &__nice {
      display: block;
      margin-bottom: 6px;
      color: $blue;
      font-size: 36px;
      font-weight: 600;
      text-align: center;

      @include tablet() {
        font-size: 48px;
        margin-bottom: 8px;
      }
    }

    &__title {
      margin: 0;
      margin-bottom: 24px;
      font-weight: bold;
      font-size: 18px;
      color: $black-1;
      text-align: center;

      @include tablet() {
        font-size: 32px;
        margin-bottom: 16px;
      }
    }

    &__message {
      margin: 0;
      color: $black-1;
      font-size: 12px;
      text-align: center;

      @include tablet() {
        font-size: 14px;
        line-height: 24px;;
      }
    }

    &__hr {
      height: 12px;
      background-color: $grey-1;
      border: none;
      margin: 0;

      @include tablet() {
        display: none;
      }
    }

    &__share {
      margin: 0 auto;
      padding: 16px 16px 46px;

      @include tablet() {
        max-width: 571px;
        border: 1px solid $blue;
        border-radius: 8px;
        padding: 44px;
        padding-top: 24px;
      }
    }

    &__timer {
      margin: 0;
      margin-bottom: 19px;

      @include tablet() {
        margin-bottom: 37px;
      }
    }

    &__action {
      font-size: 14px;
      color: $black-1;
      font-weight: bold;
      display: block;
      margin-bottom: 16px;
      text-align: center;
    }

    &__social {
    margin: 0;
    margin-bottom: 46px;

      @include tablet() {
        margin-bottom: 51px;
      }
    }
  }

  .timer {
    text-align: center;

    &__message {
      display: inline-block;
      margin-bottom: 6px;
      font-size: 12px;
      text-align: center;

      @include tablet() {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 18px;
        max-width: 280px;
      }
    }

    &__tick {
      display: block;
      font-weight: 600;
      font-size: 36px;
      color: $blue;

      @include tablet() {
        font-size: 48px;
      }
    }
  }

  .social {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;

    &__item {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #ccc;
      margin-right: 19px;

      @include tablet() {
        width: 40px;
        height: 40px;
        margin-right: 24px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .alternate-share {
    &__action {
      text-align: center;
      display: block;
      font-size: 12px;
      color: $grey-2;
      margin-bottom: 14px;

      @include tablet() {
        font-size: 14px;
      }
    }

    &__box {
      display: flex;
      width: 100%;
      max-width: 100%;
    }

    &__input {
      box-sizing: border-box;
      padding: 11px 14px 12px 19px;
      font-size: 12px;
      border: none;
      background-color: $grey-1;
      color: $grey-2;
      flex-grow: 1;
      flex-shrink: 1;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;

      @include tablet() {
        font-size: 16px;
        padding: 20px;
      }
    }

    &__copy {
      box-sizing: border-box;
      width: 44.28%;
      border: none;
      background-color: $blue;
      padding: 11px 14px 12px 19px;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      @include tablet() {
        font-size: 18px;
        padding: 20px;
        width: 42%;
      }
    }
  }
</style>
