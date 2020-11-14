<template lang="pug">
  footer.footer
    .container.footer__content
      .footer__inner
        .footer__col.footer__info
          router-link(to="/").footer__logo
            include ../assets/icons/logo.svg

          .footer__payments
            p.footer__payments-title.footer__description Мы принимаем

            .footer__payments-list
              span.footer__payments-img
                include ../assets/icons/visa.svg
              span.footer__payments-img
                include ../assets/icons/visa.svg

          .footer__contacts
            p.footer__description Мы в соц.сетях

            ul.footer__contacts-list.contacts-list
              li(v-for="item in contacts").contacts-list__item
                a.contacts-list__link(:href="item.href")
                  img.contacts-list__link-img(:src="item.icon")

        .footer__col.footer__category
          p.footer__title.footer__category-title Категории
          a.footer__title.footer__category-title-link Категории товаров

          ul.footer__category-list.footer__list
            li(v-for="item in categoryList").footer__category-item.footer__list-item
              a(:href="item.href").footer__category-link.footer__list-link {{item.title}}

        .footer__col.footer__assistance
          p.footer__title.footer__assistance-title Пользователю

          ul.footer__assistance-list.footer__list
            li(v-for="item in assistanceList").footer__assistance-item.footer__list-item
              a(:href="item.href").footer__assistance-link.footer__list-link {{item.title}}

          .footer__app
            p.footer__app-title.footer__description Скачайте приложение

            ul.footer__app-list
              li.footer__app-item
                a.footer__app-link
                  include ../assets/icons/app-store-badge.svg

              li.footer__app-item
                a.footer__app-link
                  include ../assets/icons/google-play-badge.svg

      .footer__copyright
        p.footer__copyright-text «Дешевле Вместе» © 2019. Все права защищены
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  contacts = [
    {
      href: '',
      icon: require('../assets/icons/vk.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/fb.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/ok.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/mail-icon.svg'),
    },
  ];

  categoryList = [
    {
      title: 'Красота и здоровье',
      href: '#',
    },
    {
      title: 'Автомобили',
      href: '#',
    },
    {
      title: 'Товары для животных',
      href: '#',
    },
    {
      title: 'Смартфоны',
      href: '#',
    },
    {
      title: 'Женский гардероб',
      href: '#',
    },
    {
      title: 'Дом и интерьер',
      href: '#',
    },
    {
      title: 'Телефоны и планшеты',
      href: '#',
    },
    {
      title: 'Игрушки',
      href: '#',
    },
    {
      title: 'Электроника',
      href: '#',
    },
    {
      title: 'Сад и огород',
      href: '#',
    },
    {
      title: 'Красота и здоровье',
      href: '#',
    },
    {
      title: 'Автомобили',
      href: '#',
    },
    {
      title: 'Товары для животных',
      href: '#',
    },
    {
      title: 'Смартфоны',
      href: '#',
    },
    {
      title: 'Женский гардероб',
      href: '#',
    },
    {
      title: 'Дом и интерьер',
      href: '#',
    },
    {
      title: 'Телефоны и планшеты',
      href: '#',
    },
    {
      title: 'Игрушки',
      href: '#',
    },
    {
      title: 'Электроника',
      href: '#',
    },
    {
      title: 'Сад и огород',
      href: '#',
    },
    {
      title: 'Дом и интерьер',
      href: '#',
    },
    {
      title: 'Телефоны и планшеты',
      href: '#',
    },
    {
      title: 'Игрушки',
      href: '#',
    },
  ];

  assistanceList = [
    {
      title: 'Как выбрать товар',
      href: '#',
    },
    {
      title: 'Обратная связь',
      href: '#',
    },
    {
      title: 'Помощь сервису',
      href: '#',
    },
    {
      title: 'Участие в исследованиях',
      href: '#',
    },
  ];
}
</script>

<style scoped lang="scss">
  .footer {
    background-color: #353535;
    padding-top: 18px;
    padding-bottom: 35px;

    @include laptop() {
      padding-top: 31px;
      padding-bottom: 12px;
    }

    &__col {
      @include tablet() {
        width: 28%;
      }

      @include laptop() {
        width: auto;
      }
    }

    &__logo {
      margin-right: auto;
      width: 140px;
      color: white;

      svg {
        width: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      @include desktop() {
        width: 20.7%;
      }

    }

    &__title {
      color: rgba(255, 255, 255, 0.3);
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      margin: 0;
    }

    &__list {
      @include clearList();
      list-style-type: none;
      text-align: left;
      margin-top: 13px;

    }

    &__list-item {
      margin-bottom: 13px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__list-link {
      font-size: 14px;
      color: #f5f5f5;
      text-decoration: none;
    }

    &__inner {
      display: flex;
      margin-left: 7px;
      flex-direction: column;

      @include tablet() {
        margin-left: 0;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__content {
    }

    &__payments {

      display: none;
      margin-top: 24px;
      margin-bottom: 21px;

      @include desktop() {
        display: block;
      }
    }

    &__payments-img {
      &:not(:last-child) {
        margin-right: 38px;
      }
    }

    &__payments-list {
      text-align: left;
    }

    &__description {
      font-size: 14px;
      color: #7b8197;
      text-align: left;
      margin: 0;
      margin-top: 18px;
      margin-bottom: 10px;
    }

    &__copyright {
      padding-top: 9px;
      margin-top: 32px;
      border-top: 1px solid #d9d9e7;
      opacity: 0.2;
      display: none;

      @include laptop() {
        display: block;
      }
    }

    &__copyright-text {
      text-align: left;
      font-size: 14px;
      color: rgba(245, 245, 245, 0.4);
    }

    &__category {
      @include desktop() {
        margin-top: 9px;
      }
    }

    &__category-title {
      display: none;

      @include desktop() {
        display: block;
        margin-bottom: 23px;
      }
    }

    &__category-title-link {
      margin-top: 25px;
      display: block;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
      position: relative;
      text-align: left;
      padding-left: 27px;

      &::before {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        top: 3px;
        left: 0;
        background-image: url('../assets/icons/show-more.svg');
      }

      @include tablet() {
        display: none;
      }
    }

    &__category-list {
      display: flex;
      max-width: 703px;
      flex-wrap: wrap;

      @include mobile() {
        display: none;
      }
    }

    &__category-item {
      width: 233px;
    }

    &__assistance {
      padding-top: 9px;
    }

    &__assistance-title {
      display: none;
      @include desktop() {
        display: block;
        margin-bottom: 21px;
      }
    }

    &__app {
      @include laptop() {
        margin-top: 36px;
      }
    }

    &__app-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      display: flex;

      @include tablet() {
        display: block;
      }
    }

    &__app-item {
      text-align: left;
      background-color: #444444;
      border-radius: 4px;
      height: 40px;
      width: 128px;
      padding: 6px 10px;
      margin: 0;
      margin-right: 9px;

      @include tablet() {
        margin-right: 0;
        margin-bottom: 9px;
      }
    }
  }

  .contacts-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-wrap: wrap;

    &__item {
      margin-right: 9px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__link {
      margin-bottom: 10px;
      width: 60px;
      height: 36px;
      background-color: #4a4a4a;
      border-radius: 8px;
      display: flex;

      @include desktop() {
        width: 40px;
        background: none;
        align-items: center;
        justify-content: center;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }

    &__link-img {
      margin: auto;
    }

  }
</style>
