<template lang="pug">
  loading(color="#496cff" :can-cancel="true" :is-full-page="false" :active="true").loader
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from 'vue-loading-overlay';

@Component({
  components: {
    Loading: Vue.extend(Loading),
  },
})
export default class Loader extends Vue {
}
</script>

<style scoped lang="scss">
  .loader {
  }
</style>
