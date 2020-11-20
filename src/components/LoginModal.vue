<template lang="pug">
  modal(name="login-modal" @closed="modalClose" :adaptive="true" :classes="'login-modal'" width="90%" :minWidth="290" :maxWidth="450" height="auto")
    .modal
      button(type="button" @click="closeModal").modal__close.close
      .modal__content.login-modal__content
        TabsNav(:tabs="tabs" v-on:change="selectTab").tabs-nav--small.login-modal__tabs
        div(:class="{'tab--active': selectedTab === 'login'}").tab.login-modal__login
          ValidationObserver(v-slot="{ invalid }")
            form(@submit.prevent="login").login-modal__inner.form
              Input(:rules="['required']" label="Телефон или адрес эл.почты" name="login").form__input
              Input(:rules="['required']" label="Пароль" name="password" type="password").form__input
              button(type="submit" :disabled="invalid").button.form__login-button Войти
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
  components: {
    Registration, SocialsAuth, TabsNav, Input,
  },
})
export default class LoginModal extends Vue {
  selectedTab = 'login';

  accountCreated = false;

  get socialsTitle() {
    return this.selectedTab === 'login' ? 'Войти, используя социальные сети' : 'Создать аккаунт, используя социальные сети';
  }

  get showSocialsAuth() {
    return this.selectedTab === 'login' ? true : !this.accountCreated;
  }

  showModal = (type) => {
    console.log('showModal', type);
    this.$modal.show('login-modal');
    if (type) {
      this.selectTab(type);
    }
    // document.body.classList.add('_hidden');
  };

  closeModal = () => {
    this.$modal.hide('login-modal');
    this.modalClose();
  };

  login = () => {
    // login here
    this.closeModal();
    this.$emit('login-success');
  };

  handleRegister = () => {
    this.accountCreated = true;
    this.$emit('register-success');
  };

  forgotPassword = () => {
    // forgotPassword here
  };

  modalClose = () => {
    document.body.classList.remove('_hidden');
  };

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

  selectTab = (tabId) => {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === tabId);
    const tab = this.tabs[tabIndex];
    this.tabs.forEach((t) => t.isActive = false);
    tab.isActive = true;
    this.selectedTab = tabId;

    Vue.set(this.tabs, tabIndex, tab);
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
