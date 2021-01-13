<template lang="pug">
  .form.user-edit
      .user-edit__image
        AvatarEdit(:selectedImage="user.avatar")
      Input(:rules="['required']" label="Ваше имя" name="name" type="text" :value="user.name").form__input.user-edit__input
      //InputDate(:rules="['required']" :value="user.getFormatDate()" label="Дата рождения" name="birthday").form__input.user-edit__input

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import AvatarEdit from '@/components/AvatarEdit.vue';
import Radio from '@/components/Radio.vue';
import InputDate from '@/components/InputDate.vue';
import { ProfileUser } from '@/models/models';
import { SEX_TYPES } from '@/models/enums';

@Component({
  components: {
    InputDate, Radio, AvatarEdit, Input,
  },
})
export default class UserEdit extends Vue {
@Prop() public user!: ProfileUser | null;

sexTypes = SEX_TYPES;
}
</script>

<style scoped lang="scss">
  .user-edit {
    &__sex {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      @include tablet() {
        max-width: 70%;
      }

    }

    &__image {
      margin-bottom: 43px;

      @include tablet() {
        margin-bottom: 32px;
      }
    }

    &__input {
      margin-bottom: 9px;

      @include tablet() {
        margin-bottom: 24px;
      }
    }
  }
</style>
