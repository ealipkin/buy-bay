<template lang="pug">
  div#app
    Header
    main
      router-view
    Footer

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Footer,
    Header,
  },
})
export default class Index extends Vue {
}
</script>
<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    background: $background-color;
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
    max-width: 1170px;
    padding: 0 10px;
    margin: 0 auto;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
</style>
