<template lang="pug">
  .share
    span.share__message Или скопируй ссылку, чтобы ей поделиться
    .share__box
      span(v-model="link").share__field {{link}}
      button(type="button" v-clipboard:copy="link" v-clipboard:success="handleCopySuccess").share__button.button.button--big Скопировать
    Toasted(ref="toasted")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Toasted from '@/components/Toasted.vue';

@Component({
  components: {
    Toasted,
  },
})
export default class Share extends Vue {
  @Prop() public link!: string;

  handleCopySuccess() {
    const toast: any = this.$refs.toasted;
    toast.showSuccess('Ссылка скопирована');
  }
}
</script>

<style lang="scss">
  .share {
    &__message {
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

    &__field {
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

    &__button {
      width: 44.28%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 100%;

      @include tablet() {
        height: 62px;
        width: 42%;
      }
    }
  }
</style>
