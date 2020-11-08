<template lang="pug">
  modal(name="login-modal" @closed="modalClose" :adaptive="true" :classes="'login-modal'" width="90%" :minWidth="290" :maxWidth="450" height="auto")
    .modal
      button(type="button" @click="closeModal").modal__close.close
      .modal__content.login-modal__content
        TabsNav(:tabs="tabs" v-on:change="selectTab").tabs-nav--small.login-modal__tabs
        div(:class="{'tab--active': selectedTab === 'login'}").tab.login-modal__login
          .login-modal__inner.form
            Input(:required="true" label="Телефон или адрес эл.почты" name="login").form__input
            Input(:required="true" label="Пароль" name="password" type="password").form__input
            button(type="button" @click="login").button.form__login-button Войти
            .login-modal__forgot
              button(type="button" @click="forgotPassword").link Забыли пароль?

        div(:class="{'tab--active': selectedTab === 'register'}").tab.login-modal__register
          Registration(@register="handleRegister" @later="closeModal").login-modal__inner
      SocialsAuth(:title="socialsTitle" v-if="showSocialsAuth").login-modal__social-auth

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import TabsNav from '@/components/TabsNav.vue';
import SocialsAuth from '@/components/SocialsAuth.vue';
import Registration from '@/components/Registration.vue';

@Component({
  components: { Registration, SocialsAuth, TabsNav, Input },
})
export default class LoginModal extends Vue {
  selectedTab = 'login';
  showSocialsAuth = true;
  accountCreated = false;

  get socialsTitle() {
    return this.selectedTab === 'login' ? 'Войти, используя социальные сети' : 'Создать аккаунт, используя социальные сети';
  }

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

  handleRegister() {
    this.showSocialsAuth = false;
    this.accountCreated = true;
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
    if (!this.accountCreated) {
      this.showSocialsAuth = true;
    }
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

    &__register {
      padding-bottom: 25px;
      margin-top: -10px;
      @include laptop() {
        margin-top: -13px;
        padding-bottom: 40px;
      }
    }

    &__login {
      padding-bottom: 25px;
    }

  }
</style>