<template lang="pug">
  .item-groups
    .item-groups__title.content-title Вступайте в группу
    .item-groups__text Покупайте совместно с моментальной доставкой по самой выгодной цене.
    Slick(ref="slick" :options="sliderSettings").item-groups__slider
      div(v-for="(group, index) in visibleSliderGroups").item-groups__slide
        GroupItem(
          :group="group"
          :class="{'item-groups__item--hide-desktop': index > visibleListGroups}"
        ).item-groups__item
    .item-groups__footer
      button(type="button" v-if="groups.length").item-groups__show-all Всего {{groups.length}} групп
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

  get visibleListGroups(): number {
    return LIST_VISIBLE_GROUPS
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
    background: white;
    padding: 16px 15px;

    &__title {
      margin-bottom: 16px;
    }

    &__text {
      font-size: 14px;
      line-height: 1.57;
      letter-spacing: normal;
      color: #222222;
      margin-bottom: 24px;
    }

    &__item {
      &--hide-desktop {
        @include laptop() {
          display: none;
        }
      }
    }

    &__slide {
      padding: 0 10px;
    }

    &__footer {
      text-align: center;
      margin-top: 50px;
    }

    &__show-all {
      text-align: center;
      padding: 0;
      text-decoration: underline;
      color: $blue;
      margin: 0 auto;
      display: inline-block;
      background: none;
      border: none;
      font-size: 14px;
    }
  }
</style>
