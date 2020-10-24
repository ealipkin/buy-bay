<template lang="pug">
  main.main
    slot

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {

}
</script>

<style scoped lang="scss">
  .main {
    padding-top: 40px;
  }
</style>
