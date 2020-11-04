<template lang="pug">
  modal(name="login-modal" @closed="modalClose" :adaptive="true" :classes="'login-modal'" width="90%" minWidth="290" maxWidth="450" height="auto")
    .modal
      button(type="button" @click="closeModal").modal__close.close
      .modal__content.login-modal__content
        TabsNav(:tabs="tabs" v-on:change="selectTab").tabs-nav--small.login-modal__tabs
        div(:class="{'tab--active': selectedTab === 'login'}").tab.login-modal__login
          .login-modal__inner
            FormInput(:required="true" label="Телефон или адрес эл.почты" name="login").login-modal__input
            FormInput(:required="true" label="Пароль" name="password" type="password").login-modal__input
            button(type="button" @click="login").button.login-modal__login-button Войти
            .login-modal__forgot
              button(type="button" @click="forgotPassword").link Забыли пароль?
      SocialsAuth(title="Войти, используя социальные сети").login-modal__social-auth

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormInput from '@/components/FormInput.vue';
import TabsNav from '@/components/TabsNav.vue';
import SocialsAuth from '@/components/SocialsAuth.vue';

@Component({
  components: { SocialsAuth, TabsNav, FormInput },
})
export default class LoginModal extends Vue {
  selectedTab = 'login';

  showModal() {
    console.log('show');
    this.$modal.show('login-modal');
    // document.body.classList.add('_hidden');
  }

  closeModal() {
    this.$modal.hide('login-modal');
    this.modalClose();
  }

  login() {
    // login here
  }

  forgotPassword() {
    // forgotPassword here
  }

  modalClose() {
    document.body.classList.remove('_hidden');
  }

  tabs = [
    {
      id: 'login',
      label: 'Вход',
      isActive: true,
    },
    {
      id: 'register',
      label: 'Создать аккаунт',
    },
  ];

  selectTab(tabId) {
    this.selectedTab = tabId;
  }
}
</script>

<style lang="scss">
  .v--modal-box.login-modal {
    border-radius: 4px;
    @include tablet() {
      border-radius: 8px;
    }
  }

  .login-modal {
    .form-input label {
      font-size: 15px;
    }
  }
</style>
<style scoped lang="scss">
  .login-modal {

    &__tabs {
      margin-bottom: 28px;

      @include tablet() {
        margin-bottom: 48px;
      }
    }

    &__content {
      padding: 17px 17px 0 16px;

      @include tablet() {
        padding: 32px 40px 0 40px;
      }
    }

    &__inner {
      padding: 0 10px;

      @include tablet() {
        padding: 0;
      }
    }

    &__forgot {
      text-align: center;
      margin-top: 20px;

      @include tablet() {
        margin-top: 22px;
      }
    }

    .modal__close.close {
      right: 14px;
      top: 16px;

      @include tablet() {
        right: 26px;
        top: 24px;
        width: 30px;
        height: 30px;
      }
    }

    &__input {
      margin-bottom: 20px;

      @include tablet() {
        margin-bottom: 25px;
      }
    }

    &__login-button {
      width: 100%;
      font-size: 18px;
      height: 60px;
      margin-top: 24px;

      @include tablet() {
        margin-top: 32px;
      }
    }

    &__login {
      padding-bottom: 25px;
    }

  }
</style>
