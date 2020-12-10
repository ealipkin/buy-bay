<template lang="pug">
  .input
    ValidationProvider(:name="name" :rules="inputRules" v-slot="{ errors, failed }").input__provider
      input(:type="type || 'text'" :placeholder="label" v-model="inputValue" :class="failed ? 'input__field--fail' : ''").input__field
      label(v-if="label" :data-placeholder="label").input__label {{label}}
        sup(v-if="isRequired").input__required-mark *
      span.input__message {{ errors[0] }}
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop() public name!: string;

  @Prop() public label!: string;

  @Prop() public type!: string;

  @Prop() public value!: string | number;

  @Prop() public rules!: string[] | null;

  @Watch('value')
  onValueChange(val) {
    this.setValue(val);
  }

  inputValue = '';

  inputRules = this.rules?.join('|') || '';

  isRequired = this.rules?.includes('required') || false;

  mounted() {
    this.setValue(this.value);
  }

  setValue(val) {
    this.inputValue = val;
  }
}
</script>

<style scoped lang="scss">
  .input {
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &__field {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 22px;
      transition: all 0.3s ease;
      outline: 0;
      font-family: inherit;

      height: 52px;
      border-radius: 4px;
      border: solid 1px #B6BBCD;
      background-color: #ffffff;

      &:focus {
        border: solid 1px $blue;
      }

      &::placeholder {
        font-size: 0;
        opacity: 0;
      }

      &--fail {
        border: 1px solid $red-1;
        color: $red-1;
      }
    }

    &__label {
      pointer-events: none;
      display: block;
      position: absolute;
      top: 50%;
      left: 0.5rem;
      transform: translate(0%, -50%);
      transition: all 0.3s ease;
      padding: 0 0.25rem;
      background-color: rgba(255, 255, 255, 0);
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #B6BBCD;
      margin-left: 12px;
      white-space: nowrap;
    }

    &__field:not(:placeholder-shown) ~ &__label,
    &__field:focus ~ &__label {
      transform: translate(-1%, -199%) scale(0.9, 0.9);
      background-color: white;
      font-size: 13px;
      margin-left: 0;
      color: $blue;
      letter-spacing: 0.1px;

      .input__required-mark {
        margin-left: 4px;
        top: -0.1em;
      }
    }

    &__message {
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 1;
      font-size: 12px;
      color: $red-1;
    }

    &__required-mark {
      color: #e53333;
      font-size: 0.9em;
      margin-left: 9px;
      top: 0;
    }

  }
</style>
