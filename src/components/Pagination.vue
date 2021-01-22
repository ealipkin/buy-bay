<template lang="pug">
  .pagination
    button(type="button" @click="showMore" :disabled="paginationInfo ? paginationInfo.lastPage === currentPage : false").button.pagination__show-more Показать еще {{moreCountNumber}} {{kindText || 'товаров'}}
    paginate(
      v-model="currentPage"
      :page-count="paginationInfo ? paginationInfo.lastPage : 99"
      :page-range="3"
      :click-handler="pageChange"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'paginator'"
    ).pagination__paginator
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { PaginationInfo } from '@/models/responses';
import { DEFAULT_PAGINATE_PAGE } from '@/config';

@Component
export default class Pagination extends Vue {
  @Prop() public paginationInfo!: PaginationInfo;

  @Prop() public moreCount!: number;

  @Prop() public kindText!: number;

  @Watch('paginationInfo', { immediate: true, deep: true })
  paginationInfoChange(paginationInfo: PaginationInfo) {
    if (paginationInfo) {
      this.currentPage = paginationInfo.currentPage;
    }
  }

  currentPage = DEFAULT_PAGINATE_PAGE;

  get moreCountNumber() {
    return this.paginationInfo ? this.paginationInfo.perPage : this.moreCount;
  }

  showMore() {
    this.$emit('more', this.moreCountNumber);
  }

  pageChange(page) {
    this.$emit('page', page);
  }

  mounted() {
    if (this.paginationInfo && this.paginationInfo.currentPage) {
      this.currentPage = this.paginationInfo.currentPage;
    }
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
