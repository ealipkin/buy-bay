<template lang="pug">
  p.timer
    span.timer__message Мы вернем деньги, если никто не присоединиться в течении 24 часов.
    span.timer__tick 23:59:23
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {

}
</script>

<style scoped lang="scss">
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
</style>
