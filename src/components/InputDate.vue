<template lang="pug">
  .input-date
    DatePicker(v-model="date" valueType="format" format="DD.MM.YYYY")
      template(v-slot:icon-calendar="{ emit }")
        include ../assets/icons/calendar.svg
      template(v-slot:input="{ emit }")
        Input(:rules="[isRequired]" :label="label" :name="name" :value="date")
</template>

<script lang="ts">
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/es/ru';
import 'vue2-datepicker/index.css';

import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input, DatePicker,
  },
})
export default class InputDate extends Vue {
  @Prop() public name!: string;

  @Prop() public label!: string;

  @Prop() public type!: string;

  @Prop() public value!: string | number;

  @Prop() public required!: boolean;

  isRequired = this.required ? 'required' : '';

  date = this.value;
}
</script>

<style lang="scss">
  .input-date {
    .mx-datepicker {
      width: auto;
      display: block;
    }

    .mx-icon-calendar, .mx-icon-clear {
      font-size: 18px;
      right: 20px;
    }
  }
</style>
