<template lang="pug">
  .sort-select
    .sort-select__title Сортировать по
    Select(:options="options" @change="handleChange" v-if="isMounted").sort-select__select

</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Select from '@/components/Select.vue';
import { SortOption } from '@/models/models';
import { addParamsToLocation } from '@/utils/filters';

@Component({
  components: { Select },
})
export default class SortSelect extends Vue {
  @Prop() public options!: SortOption[];

  @Prop() public selectedOption!: string;

  isMounted = false;

  handleChange(option: SortOption) {
    this.$emit('change', option);
    addParamsToLocation(this.$route, { sort: option.value });
  }

  mounted() {
    const selectedOption = this.selectedOption && this.options.find((option: SortOption) => option.value === this.selectedOption);
    if (selectedOption) {
      selectedOption.selected = true;
    }
    this.isMounted = true;
  }
}
</script>

<style scoped lang="scss">
  .sort-select {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &__title {
      white-space: nowrap;
      font-size: 14px;
      color: #7b8197;
      margin-right: 16px;
    }

    &__select {
      min-width: 240px;
    }
  }
</style>
