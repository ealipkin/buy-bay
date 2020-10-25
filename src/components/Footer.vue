<template lang="pug">
  footer.footer
    .container.footer__content
      .footer__inner
        .footer__col.footer__info
          a.footer__logo
            img.footer__logo-img(src="http://placehold.it/130x40")

          .footer__payments
            p.footer__payments-title.footer__description Мы принимаем

            .footer__payments-list
              img.footer__payments-img(src="http://placehold.it/56x20")
              img.footer__payments-img(src="http://placehold.it/56x20")

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
      icon: require('../assets/icons/ok.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/mail-icon.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/ok.svg'),
    },
    {
      href: '',
      icon: require('../assets/icons/mail-icon.svg'),
    },
  ]

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
  ]

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
  ]
}
</script>

<style scoped lang="scss">
  .footer {
    background-color: #353535;
    padding-top: 32px;

    &__logo {
      margin-right: auto;
    }

    &__info {
      max-width: 175px;
      display: flex;
      flex-direction: column;
    }

    &__title {
      color: rgba(255, 255, 255, 0.3);
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      margin: 0;
    }

    &__list {
      list-style-type: none;
      text-align: left;
      margin-top: 10px;
      padding: 0;

      @include mobile() {
        margin-top: 0;
      }
    }

    &__list-item {
      padding-top: 17px;
    }

    &__list-link {
      font-size: 14px;
      color: #f5f5f5;
      text-decoration: none;
    }

    &__inner {
      display: flex;

      @include mobile() {
        flex-direction: column;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      @include mobile() {
        align-items: center;
      }
    }

    &__payments {
      margin-top: 35px;
      margin-bottom: 25px;

      @include mobile() {
        display: none;
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
    }

    &__copyright {
      padding-top: 14px;
      margin-top: 39px;
      border-top: 1px solid #d9d9e7;
      opacity: 0.2;
    }

    &__copyright-text {
      text-align: left;
      font-size: 14px;
      color: rgba(245, 245, 245, 0.4);
    }

    &__category {
      margin-left: 62px;
      padding-top: 9px;

      @include mobile() {
        margin-left: 24px;
        margin-top: 15px;
      }
    }

    &__category-title {
      @include mobile() {
        display: none;
      }
    }

    &__category-title-link {
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
      position: relative;
      text-align: left;
      display: none;

      @include mobile() {
        display: unset;
      }

      &::before {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        top: 3px;
        left: -22px;
        background-image: url('../assets/icons/show-more.svg');
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
      @include mobile() {
        display: none;
      }
    }

    &__app {
      margin-top: 36px;
    }

    &__app-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      @include mobile() {
        display: flex;
      }
    }

    &__app-item {
      text-align: left;
      background-color: #444444;
      border-radius: 4px;
      height: 40px;
      width: 128px;
      padding: 6px 10px;

      @include mobile() {
        margin-right: 9px;
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  .contacts-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;

    &__item {
      &:not(:last-child) {
        margin-right: 18px;

        @include mobile() {
          margin-right: 9px;
        }
      }
    }

    &__link {
      @include mobile() {
        width: 60px;
        height: 36px;
        background-color: #4a4a4a;
        border-radius: 8px;
        display: flex;
      }

    }

    &__link-img {
      margin: auto;
    }
  }
</style>
