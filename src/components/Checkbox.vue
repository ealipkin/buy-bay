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
  @Prop() public item!: any;

  @Prop() public checked!: boolean;

  @Prop() public value!: string;

  @Prop() public name!: string;

  @Prop() public label!: string;

  @Prop() public count!: string;

  handleChange(event) {
    const isChecked: boolean = event.currentTarget.checked;
    this.$emit('change', { checked: isChecked, item: this.item });
  }
}
</script>
