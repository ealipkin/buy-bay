<template lang="pug">
  .item-description
    .item-description__title.content-title Описание товара
    ShowMoreText(:text="item.description" :lines="12" moreText='Показать полностью' lessText='Скрыть').item-description__text

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ShowMoreText from '@/components/ShowMoreText.vue';
import { Product } from '@/models/product';

@Component({
  components: { ShowMoreText },
})
export default class ItemDescription extends Vue {
  @Prop() public item!: Product;
}

</script>

<style lang="scss" scoped>
  .item-description {
    background: white;
    padding: 15px;
    margin-top: 12px;

    @include tablet() {
      margin-top: 17px;
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      padding: 34px 40px 45px;
    }

    &__text {
      font-size: 14px;
      line-height: 1.6em;
      color: #222222;

      margin-top: 18px;
      white-space: pre-wrap;
      padding-right: 5px;
    }
  }
</style>
