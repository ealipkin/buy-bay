<template lang="pug">
  modal(name="login-modal" @closed="modalClose" :adaptive="true" :classes="'login-modal'" width="90%" :minWidth="290" :maxWidth="500" height="auto")
    .modal
      button(type="button" @click="closeModal").modal__close.close
      .modal__content.login-modal__content
        TabsNav(:tabs="tabs" v-on:change="selectTab").tabs-nav--small.login-modal__tabs
        div(:class="{'tab--active': selectedTab === 'login'}").tab.login-modal__login
          PhoneConfirmation(v-show="!enterByMail" @confirmed="phoneConfirmed")
          div(v-show="enterByMail").login-modal__mail-confirmation
            .login-modal__subtitle Только для зарегистрированных пользователей
            PhoneConfirmation(v-show="enterByMail" :byMail="true" @confirmed="phoneConfirmed")
          .tac.login-modal__bottom
            button(v-show="enterByMail" type="button" @click="handleMailEnterClick").login-modal__enter-by Войти по номеру телефона
            button(v-show="!enterByMail" type="button" @click="handlePhoneEnterClick").login-modal__enter-by Войти по почте
        div(:class="{'tab--active': selectedTab === 'register'}").tab.login-modal__register
          Registration(@register="handleRegister" @later="closeModal").login-modal__inner

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import TabsNav from '@/components/TabsNav.vue';
import SocialsAuth from '@/components/SocialsAuth.vue';
import Registration from '@/components/Registration.vue';
import PhoneConfirmation from '@/components/PhoneConfirmation.vue';
import { Action } from 'vuex-class';

@Component({
  components: {
    PhoneConfirmation,
    Registration,
    SocialsAuth,
    TabsNav,
    Input,
  },
})
export default class LoginModal extends Vue {
  @Action('app/setUserAuth') setUserAuth;
  
  selectedTab = 'login';

  accountCreated = false;

  enterByMail = false;

  showModal(type) {
    this.$modal.show('login-modal');
    if (type) {
      this.selectTab(type);
    }
    // document.body.classList.add('_hidden');
  }

  phoneConfirmed() {
    this.login();
  }

  mailConfirmed() {
    this.login();
  }

  handleMailEnterClick() {
    this.enterByMail = false;
  }

  handlePhoneEnterClick() {
    this.enterByMail = true;
  }

  closeModal() {
    this.$modal.hide('login-modal');
    this.modalClose();
  }

  login() {
    // login here
    this.setUserAuth(true);
    this.closeModal();
    this.$emit('login-success');
  }

  handleRegister() {
    this.accountCreated = true;
    this.$emit('register-success');
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
    &__bottom {
      margin-top: 30px;
    }

    &__subtitle {
      margin-bottom: 15px;
    }

    &__enter-by {
      @include clearButton();
      @include link();
      color: $blue;
    }

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
