<template lang="pug">
  label.radio
    input(type="radio" :checked="checked" :value="value" :name="name" @change="handleChange").visually-hidden.radio__input
    span.radio__icon
    span.radio__text {{label}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Radio extends Vue {
  @Prop() public checked!: boolean;
  @Prop() public value!: string;
  @Prop() public name!: string;
  @Prop() public label!: string;

  handleChange(event) {
    const isChecked: boolean = event.currentTarget.checked;
    this.$emit('change', isChecked);
  }
}
</script>

<style scoped lang="scss">
  .radio {
    display: inline-flex;
    align-items: center;

    &__icon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: solid 1px #d4d3d3;
      margin-right: 12px;
      position: relative;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    &__text {
      font-size: 14px;
      color: #222222;
    }

    &__input:checked + &__icon {
      border-color: #e53333;

      &:after {
        content: '';
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        display: block;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: $blue;
      }
    }
    &--style--2 {

      .radio__input:checked ~ .radio__icon {
        border: 6px solid $blue;
        background: white;

        &:after {
          display: none;
        }
      }
    }
    &--style--2 & {
      &__icon {
        padding: 0;
        width: 20px;
        height: 20px;
        border: solid 1px #91949d;
        background-color: #eceef7;
      }

    }
  }
</style>
