<template lang="pug">
  ValidationObserver(v-slot="{ invalid }")
    form.form.registration
      .registration__step(v-if="currentStep === regSteps.START")
        Input(:rules="['required']" label="Телефон или адрес эл.почты" name="login").form__input
        Input(:rules="['required']" label="Пароль" name="password" type="password").form__input
        Input(:rules="['required']" label="Повторите пароль" name="password-check" type="password").form__input
        button(type="button" @click="register" :disabled="invalid").button.form__login-button Создать

      .registration__step(v-if="currentStep === regSteps.FINISH")
        .registration__title Почти все готово
        .registration__text Пожалуйста, добавьте аватар и некоторые данные о себе

        UserEdit(:user="user")

        button(type="button" :disabled="invalid").button.form__login-button.registration__button Завершить
        .registration__bottom
          button(type="button" @click="doLater").link.link--red.registration__link Сделаю это позже

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import UserEdit from '@/components/UserEdit.vue';
import { createProfileUser } from '@/utils/data';

enum REG_STEPS {
  START = 'start',
  FINISH = 'finish'
}

@Component({
  components: {
    Input, UserEdit,
  },
})
export default class Registration extends Vue {
  currentStep: string = REG_STEPS.START;

  user = createProfileUser(null, 1);

  regSteps = REG_STEPS;

  register() {
    this.currentStep = REG_STEPS.FINISH;
    this.$emit('register');
  }

  doLater() {
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

    &__button {
      margin-top: 37px;

      @include tablet() {
        margin-top: 42px;
      }
    }

  }
</style>
