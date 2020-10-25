<template lang="pug">
  .group-item
    img(:src="group.avatar").group-item__item-avatar
    .group-item__item-title {{group.title}}
    .group-item__item-info
      .group-item__users
        span.group-item__current-users {{group.joinedUsers}}
        span.group-item__all-users из {{group.joinedUsers}}
      .group-item__timer
        h4 {{group.time}}
        vac(:end-time="group.time")
          template(v-slot:process="{ timeObj }")
            span {{ `Lefttime: ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}
          template(v-slot:finish)

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Group } from '@/utils/models';


@Component({})
export default class GroupItem extends Vue {
  @Prop() public group!: Group;

  mounted() {
    // console.log(this.group.time);
  }
}

</script>

<style lang="scss" scoped>
  .group-item {
  }
</style>
