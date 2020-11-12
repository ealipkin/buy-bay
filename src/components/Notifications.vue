<template lang="pug">
  .notifications
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Notifications extends Vue {
  @Prop() public notifications!: boolean;
}
</script>

<style scoped lang="scss">
  .notifications {
  }
</style>
