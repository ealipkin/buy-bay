<template>
  <div :class="classes['vue-amount-chooser']">
    <button type="button" :disabled="amount === settings.min"
      :class="`${classes['vue-amount-chooser__button']} ${classes['vue-amount-chooser__button_left']}`"
      @click="verify(amount + leftButton.amount)">
      {{ leftButton.text }}
    </button>
    <div :class="classes['vue-amount-chooser__input-block']">
      <input type="text" :class="classes['vue-amount-chooser__input']" v-model="input" ref="input" autofocus>
    </div>
    <button type="button" :disabled="amount === settings.max"
      :class="`${classes['vue-amount-chooser__button']} ${classes['vue-amount-chooser__button_right']}`"
      @click="verify(amount + rightButton.amount)">
      {{ rightButton.text }}
    </button>
  </div>
</template>

<script>
import dataMixin from './Mixins/Data';
import optionsMixin from './Mixins/Options';

export default {
  mixins: [dataMixin, optionsMixin],
  methods: {
    verify(value) {
      value = +value;
      if (!Number.isInteger(value)) value = 0;
      if (value < this.settings.min) value = this.settings.min;
      if (value > this.settings.max) value = this.settings.max;
      this.emit(value);
    },
  },
  computed: {
    leftButton() {
      return this.settings.buttons.left;
    },
    rightButton() {
      return this.settings.buttons.right;
    },
    classes() {
      const { classes } = this.settings;
      const obj = {};
      /* eslint-disable */
      for (const key in classes) {
        if (key) {
          obj[key] = `${key} ${classes[key]}`;
        }
      }
      return obj;
    },
  },
};
</script>

<style lang="scss">
  .vue-amount-chooser {
    display: flex;
    justify-content: center;
    height: 100%;

    border: 1px solid #d3d4d9;
    border-radius: 4px;

    &__button {
      @include clearButton();
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      cursor: pointer;
      user-select: none;

      background: transparent;
      color: black;
      width: 30px;
      text-align: center;
      font-size: 0;
      position: relative;

      &:before {
        content: '';
        width: 13px;
        height: 2px;
        background: black;
        font-size: 14px;
      }

      &_right:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 13px;
        background: black;
        font-size: 14px;
      }

      &:hover {
        filter: brightness(1.1);
      }

      &:disabled {
        cursor: default;
        opacity: 0.5;
      }

    }

    &__input-block {
      min-width: 40px;
      width: 44px;
      height: 38px;
      border-left: 1px solid #d3d4d9;
      border-right: 1px solid #d3d4d9;
      box-sizing: border-box;
    }

    &__input {
      height: 100%;
      width: 100%;
      background-color: white;
      color: #555555;
      font-weight: normal;
      border: none;
      text-align: center;
      outline: none;
      font-size: 1em;
      padding: 0;
      font-family: inherit;
    }
  }
</style>
