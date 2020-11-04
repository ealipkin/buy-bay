<template lang="pug">
  p.share
    label(for="copy").share__action Или скопируй ссылку, чтобы ей поделиться
    span.share__box
      input(:value="link")#copy.share__input
      button.share__copy Скопировать
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Share extends Vue {
@Prop() public link!: string;
}
</script>

<style lang="scss">
  .share {
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
