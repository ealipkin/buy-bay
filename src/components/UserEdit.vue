<template lang="pug">
  .form.user-edit
      .user-edit__image
        AvatarEdit(:selectedImage="user.avatar")
      Input(:rules="['required']" label="Ваше имя" name="name" type="text" :value="user.name").form__input.user-edit__input
      InputDate(:rules="['required']" :value="user.getFormatDate()" label="Дата рождения" name="birthday").form__input.user-edit__input
      .user-edit__sex
        Radio(label="Я мужчина" :checked="user.sex.value === sexTypes.MALE" name="sex" :value="sexTypes.MALE").radio--style--2.user-edit__radio
        Radio(label="Я женщина" :checked="user.sex.value === sexTypes.FEMALE" name="sex" :value="sexTypes.FEMALE").radio--style--2.user-edit__radio

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProfileUser, SEX_TYPES } from '@/utils/models';
import Input from '@/components/Input.vue';
import AvatarEdit from '@/components/AvatarEdit.vue';
import Radio from '@/components/Radio.vue';
import InputDate from '@/components/InputDate.vue';

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
