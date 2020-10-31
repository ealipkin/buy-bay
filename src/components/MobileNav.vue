<template lang="pug">
  ul.mobile-nav
    li.mobile-nav__item
      router-link(to="#")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MobileNav extends Vue {

}
</script>

<style scoped lang="scss">
  .mobile-nav {

  }
</style>
