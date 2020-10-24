<template lang="pug">
  div
    Header
    Main
      section.top-categories
        h2.top-categories__title Топ категории
        a.top-categories__show-all Показать все
        ul.top-categories__list
          li(v-for="item in topCategories")
    Footer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import BigSlider from '@/components/BigSlider.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    BigSlider,
    Header,
    Main,
  },
})
export default class Index extends Vue {
  topCategories = [
    {
      title: 'Спортивный инвентарь',
      img: '',
      position: 'top',
    },
    {
      title: 'Компьютеры и офис',
    },
    {
      title: 'Cмарфтоны',
    },
    {
      title: 'Спортивный инвентарь',
    },
    {
      title: 'Компьютеры и офис',
    },
  ]
}
</script>

<style lang="scss" scoped>

</style>
