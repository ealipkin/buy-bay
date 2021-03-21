<template lang="pug">
  .not-found.page
    .page__title.tac Страница не найдена
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Success extends Vue {}
</script>

<style lang="scss" scoped>
  .not-found {
    margin-top: 40px;
  }
</style>
