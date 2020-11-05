<template lang="pug">
  span(v-if="time").my-item-timer
    include ../assets/icons/my-list-timer.svg
    vac(:end-time="time")
      template(v-slot:process="{ timeObj }")
        span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
      template(v-slot:finish)

  span(v-else).my-item-timer.my-item-timer--not
    include ../assets/icons/my-list-timer.svg
    span 00:00:00
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MyItemTimer extends Vue {
@Prop() public time!: number;
}
</script>

<style scoped lang="scss">
  .my-item-timer {
    font-size: 12px;
    display: flex;
    color: $grey-2;

    @include laptop() {
      display: inline-flex;
      min-height: 24px;
      vertical-align: sub;
      font-size: 14px;
    }

    svg {
      margin-right: 11px;
    }

    &--not {
      color: $red-1;
      font-weight: bold;
    }
  }
</style>
