<template lang="pug">
  span.rate
    img(src="../assets/icons/star.svg")
      span {{rate}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class ShopInfo extends Vue {
  @Prop() public rate!: number;
}

</script>

<style lang="scss" scoped>
  .shop-info {
  }
</style>
