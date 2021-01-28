<template lang="pug">
  .input
    ValidationProvider(
      :name="name"
      :rules="inputRules"
      v-slot="{ errors, failed }"
      mode="custom"
    ).input__provider
      .input__wrapper
        input(
          :type="type || 'text'"
          autocomplete="off"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          v-mask="mask || ''"
          :placeholder="placeholder || ''"
          :class="{'input__field--fail': failed, 'input__field--has-value': value}"
          :name="name || ''"
          ref="input"
        ).input__field
        label(v-if="label" :data-placeholder="label").input__label {{label}}
      span.input__error {{ errors[0] }}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop() public placeholder!: string;

  @Prop() public name!: string;

  @Prop() public label!: string;

  @Prop() public type!: string;

  @Prop() public mask!: string;

  @Prop() public value!: string | number;

  @Prop() public rules!: string[] | null;

  inputRules = this.rules?.join('|') || '';

  isRequired = this.rules?.includes('required') || false;

  doFocus() {
    this.$nextTick(() => {
      (this.$refs.input as any).focus();
    });
  }
}
</script>

<style scoped lang="scss">
  .input {
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &__wrapper {
      position: relative;
    }

    &__field {
      @include input;

      &:focus {
        border: solid 1px $blue;
      }

      &::placeholder {
        font-size: 0;
        opacity: 0;
      }

      &:focus::placeholder {
        font-size: inherit;
        opacity: 1;
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

    &__field--has-value ~ &__label,
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

    &__error {
      left: 0;
      z-index: 1;
      font-size: 12px;
      color: $red-1;
    }

    &__required-mark {
      color: #e53333;
      font-size: 0.9em;
      margin-left: 0;
      top: 0;
    }

  }
</style>
