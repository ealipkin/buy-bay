<template lang="pug">
  .group-item
    div(v-if="creator.image").group-item__avatar.avatar
      img(:src="creator.image")
    div(v-else).group-item__avatar.avatar
      span.profile-smile
        span {{creator.emoji || getSmile()}}
    .group-item__middle
      .group-item__title {{ creator.name | truncate(28)}}
      .group-item__info
        .group-item__users
          img(src="../assets/icons/group-user.svg")
          span.group-item__current-users {{group.joinedUsers.length}}
          span.group-item__all-users  из {{group.allUsers}}
        .group-item__timer
          vac(:left-time="group.time")
            template(v-slot:process="{ timeObj }").group-item__timer-inner
              span.group-item__timer-icon
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><g fill="#7B8197" fill-rule="nonzero" stroke="#7B8197" stroke-width=".3"><path d="M7 1C3.692 1 1 3.692 1 7s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zm0 10.737c-2.612 0-4.737-2.125-4.737-4.737S4.388 2.263 7 2.263 11.737 4.388 11.737 7 9.612 11.737 7 11.737z"/><path d="M10.22 6.815H7.879a1.03 1.03 0 00-.341-.341V3.657a.537.537 0 00-1.074 0v2.817a1.028 1.028 0 101.415 1.414h2.341a.537.537 0 100-1.073z"/></g></svg>
              span {{ `${timeObj.h}:${timeObj.m}:${timeObj.s}`}}
            template(v-slot:finish)
    button(v-if="!group.isJoined"
      type="button"
      :disabled="disabled"
      @click="handleClick"
    ).group-item__button.button Вступить

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Group } from '@/models/order';

@Component({})
export default class GroupItem extends Vue {
  @Prop() public group!: Group;

  @Prop() public disabled!: boolean;

  getSmile() {
    return this.creator && this.creator.emoji;
  }

  get creator() {
    return this.group.joinedUsers.filter((user) => user.is_creator).pop();
  }

  handleClick() {
    this.$emit('join', this.group);
  }
}

</script>

<style lang="scss" scoped>
  .group-item {
    text-align: center;

    @include laptop() {
      display: flex;
      align-items: flex-start;
    }

    &__avatar {
      display: block;
      margin: 0 auto;
      flex-shrink: 0;
      margin-bottom: 10px;

      @include laptop() {
        margin-right: 16px;
      }
    }

    &__title {
      font-size: 14px;
      font-weight: bold;
      line-height: normal;
      color: #222222;
      margin-bottom: 10px;
      @include tablet() {
        margin-right: 25px;
        margin-top: 1px;
        margin-bottom: 12px;
        overflow: hidden;
        text-overflow: ellipsis;

        max-width: 130px;
      }
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
      margin-left: 4px;
      @include laptop() {
        display: block;
      }
    }

    &__button {
      width: 100%;
      @include laptop() {
        width: 134px;
      }
    }

    &__timer {
      margin-right: 15px;
      @include laptop() {
        margin-right: 0;
      }
    }

    &__middle {
      @include laptop() {
        flex: 1;
        text-align: left;
        padding-right: 15px;
      }
    }

    &__timer-inner {
      display: flex;
      align-items: center;
    }

    &__timer-icon {
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
  }
</style>
