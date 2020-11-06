<template lang="pug">
  .main
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  @Prop() public prop!: boolean;
}
</script>

<style scoped lang="scss">
  .main {
  }
</style>
