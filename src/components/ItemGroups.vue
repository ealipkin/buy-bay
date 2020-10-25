<template lang="pug">
  .item-groups
    .item-groups__title Вступайте в группу
    .item-groups__text Покупайте совместно с моментальной доставкой по самой выгодной цене.
    Slick(ref="slick" :options="sliderSettings").item-groups__slider
      GroupItem(
        v-for="(group, index) in visibleSliderGroups"
        :group="group"
        ).item-groups__item

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Group } from '@/utils/models';
import Slick from 'vue-slick';
import GroupItem from '@/components/GroupItem.vue';

const SLIDER_VISIBLE_GROUPS = 10;
const LIST_VISIBLE_GROUPS = 3;

@Component({
  components: {
    Slick,
    GroupItem,
  },
})
export default class ItemGroups extends Vue {
  @Prop() public groups!: Group[];
  showMobile: boolean = false;

  get visibleSliderGroups(): Group[] {
    return this.groups.length > SLIDER_VISIBLE_GROUPS ? this.groups.slice(0, SLIDER_VISIBLE_GROUPS) : this.groups;
  }

  get visibleListGroups(): Group[] {
    return this.groups.length > LIST_VISIBLE_GROUPS ? this.groups.slice(0, LIST_VISIBLE_GROUPS) : this.groups;
  }

  sliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: '1200',
        settings: 'unslick',
      },
    ],
  };

  mounted() {
  }
}

</script>

<style lang="scss" scoped>
  .item-groups {
  }
</style>
