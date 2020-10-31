<template lang="pug">
  section.seo
    h2.seo__title SEO Block
    p.seo__description(v-for="text in texts") {{text}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class SeoTexts extends Vue {
  @Prop() public texts!: string[];
}

</script>

<style lang="scss" scoped>
  .seo {
    &__title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: inherit;
      margin-bottom: 19px;

      @include laptop() {
        font-size: 32px;
        font-weight: 600;
        color: #222222;
        margin-bottom: 40px;
      }
    }

    &__description {
      margin: 0;
      color: inherit;
      font-size: 12px;
      line-height: 1.75;
      @include laptop() {
        font-size: 14px;
        line-height: 1.57;
        color: #222222;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

  }
</style>
