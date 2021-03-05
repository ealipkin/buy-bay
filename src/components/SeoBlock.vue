<template lang="pug">
  section(v-if="block").seo
    h2.seo__title {{block.title}}
    p.seo__description {{block.text}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISeoBlock } from '@/models/models';

@Component({
  metaInfo() {
    const seoBlock: ISeoBlock = (this as any).block;
    return {
      title: seoBlock.meta_title,
      meta: [
        { vmid: 'description', name: 'description', content: seoBlock.meta_desc },
        { vmid: 'og:desc', name: 'og:desc', property: 'og:desc', content: seoBlock.og_desc },
        { vmid: 'og:image', name: 'og:image', property: 'og:image', content: seoBlock.og_image },
        { vmid: 'og:site', name: 'og:site', property: 'og:site', content: seoBlock.og_site },
      ]
    }
  }
})
export default class SeoBlock extends Vue {
  @Prop() public block!: ISeoBlock;

  mounted() {
    console.log(this.block);
  }
}

</script>

<style lang="scss" scoped>
  .seo {
    padding-top: 16px;

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
