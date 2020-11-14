<template lang="pug">
  label.checkbox
    input(type="checkbox" :checked="checked" :value="value" :name="name" @change="handleChange").visually-hidden
    span.checkbox__icon
    span.checkbox__text {{label}}
    span(v-if="count").checkbox__count {{count}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Checkbox extends Vue {
  @Prop() public checked!: boolean;

  @Prop() public value!: string;

  @Prop() public name!: string;

  @Prop() public label!: string;

  @Prop() public count!: string;

  handleChange(event) {
    const isChecked: boolean = event.currentTarget.checked;
    this.$emit('change', isChecked);
  }
}
</script>

<style scoped lang="scss">
  .checkbox {
    display: flex;

    &__icon {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      border: solid 1px #d4d3d3;
      flex-shrink: 0;
      box-sizing: border-box;
      margin-top: 2px;
    }

    input:checked + &__icon {
      background: $blue;
      border-color: $blue;
    }

    &__text {
      font-size: 14px;
      color: #222222;
      margin-left: 12px;
    }

    &__count {
      opacity: 0.8;
      color: #7b8197;
      margin-left: auto;
      font-size: 14px;
    }
  }

</style>
