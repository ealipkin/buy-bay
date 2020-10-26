<template lang="pug">
  .group-item
    .group-item__avatar.avatar
      img(:src="group.avatar")
    //.group-item__title {{group.title}}
    .group-item__title Анастасия
    .group-item__info
      .group-item__users
        img(src="../assets/icons/group-user.svg")
        span.group-item__current-users {{group.joinedUsers}}
        span.group-item__all-users  из {{group.joinedUsers}}
      .group-item__timer
        vac(:end-time="group.time")
          template(v-slot:process="{ timeObj }")
            span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
          template(v-slot:finish)
    button(type="button" :class="{'button--disabled': group.isJoined}").group-item__button.button {{group.isJoined ? 'Вступить' : 'Выйти'}}

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
    text-align: center;

    &__avatar {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
    }

    &__title {
      font-size: 14px;
      font-weight: bold;
      line-height: normal;
      color: #222222;
      margin-bottom: 10px;
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #7b8197;
      margin-bottom: 10px;
    }

    &__users {
      display: flex;
      align-items: center;

      img {

        margin-top: 1px;
        margin-right: 6px;
      }
    }

    &__all-users {
      display: none;
    }

    &__button {
      width: 100%;
    }

    &__timer {
      margin-right: 15px;
    }

  }
</style>
