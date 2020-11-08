<template lang="pug">
  select(@change="handleChange").select
    option(v-for="option in options" :value="option.value") {{option.label}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Select extends Vue {
  @Prop() public options!: any[];

  handleChange(event) {
    this.$emit('change', event);
  }
}
</script>

<style scoped lang="scss">
  .select {
    width: 200px;
    height: 40px;
  }
</style>
