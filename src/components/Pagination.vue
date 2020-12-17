<template lang="pug">
  .pagination
    button(type="button" @click="showMore").button.pagination__show-more Показать еще {{moreCount}} {{kindText || 'товаров'}}
    paginate(:page-count="99" :page-range="3" :click-handler="pageChange" :prev-text="'Назад'" :next-text="'Вперед'" :container-class="'paginator'").pagination__paginator
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() public moreCount!: number;

  @Prop() public kindText!: number;

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
    width: 100%;
    justify-content: center;

    @include desktop() {
      justify-content: flex-start;
    }

    &__show-more {
      white-space: nowrap;

      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      padding: 0 31px;

      @include desktop() {
        margin-right: 28px;
      }
    }

    &__paginator {
      display: none;

      @include desktop() {
        display: flex;
      }
    }
  }
</style>
