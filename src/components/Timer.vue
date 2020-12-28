<template lang="pug">
  .timer
    span.timer__text Мы вернём деньги, если никто не присоединится к группе в течение 24 часов
    vac(:end-time="time").timer__tick
      template(v-slot:process="{ timeObj }")
        span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
      template(v-slot:finish)

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
@Prop() public time!: number;
}
</script>

<style scoped lang="scss">
    .timer {
    text-align: center;

    &__text {
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
