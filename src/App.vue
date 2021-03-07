<template lang="pug">
  div#app
    Header
    main
      router-view
    Footer
    Toasted(ref="toasted")
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Toasted from '@/components/Toasted.vue';

@Component({
  components: {
    Footer,
    Header,
    Toasted,
  },
})
export default class Index extends Vue {
  mounted() {
    this.$root.$on('show-toast', (data) => {
      const { message, type } = data;
      const toast: any = this.$refs.toasted;
      if (!type || type === 'success') {
        toast.showSuccess(message);
      }
      if(type === 'error') {
        toast.showError(message);
      }
    });
  }
}
</script>
<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  .v-modal-overlay {
    z-index: 99999;
  }

  #app {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    padding-bottom: 50px;

    @include tablet() {
      padding-bottom: 0;
    }

    /*margin-bottom: 49px;*/

    @include tablet() {
      margin-bottom: 0;
    }
  }

  main {
    flex: 1 0 auto;
    background: $background-color;
    position: relative;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .container {
    @include container();
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
</style>
