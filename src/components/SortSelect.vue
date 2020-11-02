<template lang="pug">
  .sort-select
    .sort-select__title Сортировать по
    Select(:options="options" @change="handleChange").sort-select__select

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Select from '@/components/Select.vue';

@Component({
  components: { Select }
})
export default class SortSelect extends Vue {
  @Prop() public options!: any[];

  handleChange(value) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
  .sort-select {
    display: flex;
    align-items: center;

    &__title {
      font-size: 14px;
      color: #7b8197;
      margin-right: 16px;
    }
  }
</style>
