<template lang="pug">
  .pagination
    button(type="button" @click="showMore").button.pagination__show-more Показать еще {{moreCount}} товаров
    paginate(:page-count="99" :page-range="3" :click-handler="pageChange" :prev-text="'Назад'" :next-text="'Вперед'" :container-class="'paginator'")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() public moreCount!: number;

  showMore() {
    this.$emit('more', this.moreCount);
  }

  pageChange(page) {
    this.$emit('page', page);
  }
}
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;

    &__show-more {
      margin-right: 28px;
      white-space: nowrap;

      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      padding: 0 31px;
    }
  }
</style>
