<template lang="pug">
  ul.users-list
    li(v-for="(user, i) in users").users-list__item
      img(:src="user.avatar" :class="i === 0 ? 'user-list__img--active' : ''").users-list__img
      span.users-list__name {{user.name}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UsersList extends Vue {
  @Prop() public users!: object[];
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
      display: block;
      margin-bottom: 10px;
      background-color: $grey-3;

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
