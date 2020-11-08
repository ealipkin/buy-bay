<template lang="pug">
  span(v-if="time").order-timer
    include ../assets/icons/order-timer.svg
    vac(:end-time="time")
      template(v-slot:process="{ timeObj }")
        span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
      template(v-slot:finish)

  span(v-else).order-timer.order-timer--not
    include ../assets/icons/order-timer.svg
    span 00:00:00
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class OrderTimer extends Vue {
@Prop() public time!: number;
}
</script>

<style scoped lang="scss">
  .order-timer {
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
