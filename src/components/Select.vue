<template lang="pug">
  .select
    div(v-if="label").select__label
    DropdownMenu(
      v-model="show"
      :right="true"
    ).select__dropdown
      button(:class="{'select__toggle--opened': show}").select__toggle.dropdown-toggle {{ selected ? selected.label : ''}}
      div(slot="dropdown")
        div(v-for="(option, index) in options" :key="index" @click="handleItemClick(option)").select__item {{option.label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DropdownMenu from '@innologica/vue-dropdown-menu';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  components: {
    DropdownMenu,
  },
})
export default class Select extends Vue {
  @Prop() public options!: SelectOption[];

  @Prop() public label!: string;

  show = false;

  selected: SelectOption | {} = {};

  handleItemClick(option: SelectOption) {
    this.selected = option;
    this.$emit('change', option);
    this.show = false;
  }

  mounted() {
    this.selected = this.options.length && this.options[0];
  }
}
</script>

<style scoped lang="scss">
  .select {
    text-align: left;

    &__toggle {
      @include clearButton();
      @include input();

      text-align: left;
      font-family: inherit;
      font-size: 14px;
      color: #222222;
      border-radius: 2px;
      border: solid 1px #ece1e1;
      background-color: #ffffff;
      padding: 9px 55px 9px 26px;
      height: 40px;
      position: relative;

      &:after {
        content: '';

        width: 6px;
        height: 6px;
        position: absolute;
        right: 16px;
        top: 14px;
        transform: rotate(135deg);
        border: 1px solid #383838;
        border-bottom-color: transparent;
        border-left-color: transparent;
      }

      &--opened {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-color: $blue;

        &:after {
          border-bottom-color: #383838;
          border-left-color: #383838;
          margin-top: 3px;

          border-top-color: transparent;
          border-right-color: transparent;
        }
      }
    }

    &__item {
      font-size: 16px;
      line-height: 22px;
      cursor: pointer;
      color: #222222;
      padding: 15px 10px 15px 24px;
      box-shadow: inset 0px -1px 0px #F5F7FB;

      &:hover {
        background: $grey-1;
      }
    }
  }
</style>
