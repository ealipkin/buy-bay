<template lang="pug">
  .form.registration
    .registration__step(v-if="currentStep === regSteps.START")
      Input(:required="true" label="Телефон или адрес эл.почты" name="login").form__input
      Input(:required="true" label="Пароль" name="password" type="password").form__input
      Input(:required="true" label="Повторите пароль" name="password-check" type="password").form__input
      button(type="button" @click="register").button.form__login-button Создать

    .registration__step(v-if="currentStep === regSteps.FINISH")
      .registration__title Почти все готово
      .registration__text Пожалуйста, добавьте аватар и некоторые данные о себе
      .registration__image
        AvatarEdit
      Input(:required="true" label="Ваше имя" name="name" type="text").form__input.registration__input
      //Input(:required="true" label="Дата рождения" name="name" type="text").form__input.registration__input
      InputDate(:required="true" label="Дата рождения" name="birthday").form__input.registration__input
      .registration__sex
        Radio(label="Я мужчина" :checked="true" name="sex" value="male").radio--style--2.registration__radio
        Radio(label="Я женщина" name="sex" value="female").radio--style--2.registration__radio

      button(type="button" @click="submit" disabled).button.form__login-button.registration__button Завершить
      .registration__bottom
        button(type="button" @click="doLater").link.link--red.registration__link Сделаю это позже

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import AvatarEdit from '@/components/AvatarEdit.vue';
import Radio from '@/components/Radio.vue';
import InputDate from '@/components/InputDate.vue';

enum REG_STEPS {
  START = 'start',
  FINISH = 'finish'
}

@Component({
  components: {
    InputDate, Radio, AvatarEdit, Input,
  },
})
export default class Registration extends Vue {
  currentStep: string = REG_STEPS.START;

  regSteps = REG_STEPS;

  submit = () => {
    console.log('finish');
  };

  register = () => {
    this.currentStep = REG_STEPS.FINISH;
    this.$emit('register');
  };

  doLater = () => {
    this.$emit('later');
  }
}
</script>

<style scoped lang="scss">
  .registration {
    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #222222;
      text-align: center;
      margin-bottom: 12px;

      @include laptop() {
        font-size: 24px;
        margin-bottom: 7px;
      }
    }

    &__sex {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      @include tablet() {
        max-width: 70%;
      }

    }

    &__link {
      font-size: 14px;
    }

    &__text {
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
      color: #222222;
      margin: 0 auto;
      max-width: 180px;
      margin-bottom: 18px;

      @include tablet() {
        max-width: 340px;
      }
      @include laptop() {
        font-size: 14px;
      }
    }

    &__bottom {
      text-align: center;
      margin-top: 26px;
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

    &__button {
      margin-top: 37px;

      @include tablet() {
        margin-top: 42px;
      }
    }

  }
</style>
