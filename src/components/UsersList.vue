<template lang="pug">
  ul.users-list
    li(v-for="user in users").users-list__item
      img(v-if="user.image" :src="user.image" :class="user.is_creator ? 'user-list__img--active' : ''").users-list__img
      span(v-if="!user.image").users-list__img {{smile()}}
      span(v-if="user.name").users-list__name {{user.name}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Group, GroupUser } from '@/models/order';

@Component
export default class UsersList extends Vue {
  @Prop() public group!: Group;

  smile() {
    return '';
  }

  get users(): GroupUser[] | {}[] {
    const leftUsers: number = this.group.allUsers - this.group.joinedUsers.length;
    const leftArray = new Array(leftUsers).fill({});
    return [...this.group.joinedUsers, ...leftArray];
  }
}
</script>

<style scoped lang="scss">

  .users-list {
    @include clearList();
    display: flex;

    @include tablet() {
      flex-wrap: wrap;
    }

    &__item {
      margin-right: 15px;
      margin-bottom: 15px;

      @include tablet() {
        margin-right: 24px;
        margin-bottom: 24px;
      }

      &:last-child {
        margin-right: 0;
      }

    }

    &__img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 10px;
      background-color: $grey-3;
      display: flex;
      font-size: 1.5em;
      align-items: center;
      justify-content: center;
      @include tablet() {
        width: 70px;
        height: 70px;
        margin-bottom: 8px;
      }
    }

    &__name {
      font-size: 12px;
      color: $black-1;
      text-align: center;
      width: 100%;
      display: block;

      @include tablet() {
        font-size: 14px;
      }
    }
  }

  .user-list__img--active {
    border: 2px solid $red-1;
    background-clip: padding-box;
    padding: 2px;
    background-color: #fff;
  }
</style>
