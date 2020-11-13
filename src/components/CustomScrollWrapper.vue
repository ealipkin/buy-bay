<template lang="pug">
  .custom-scroll-wrapper
    .custom-scroll-wrapper__inner
       slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomScrollWrapper extends Vue {
}
</script>

<style scoped lang="scss">
  .custom-scroll-wrapper {
    overflow: hidden;

    &__inner {
      overflow: auto;
      padding-bottom: 20px;
      margin-bottom: -20px;

      > * {
        flex-wrap: nowrap;
      }
    }

    &--mobile-only {
      @include tablet() {
        overflow: visible;

        .custom-scroll-wrapper__inner {
          overflow: visible;
          padding-bottom: 0;
          margin-bottom: 0;

          > * {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
</style>
