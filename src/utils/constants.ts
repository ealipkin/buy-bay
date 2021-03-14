import { BaseMenuItem } from '@/models/menu';
import { PROFILE_NAV_TYPES } from '@/models/enums';

export const AVATAR_SMILES = ['😀', '😁', '😃', '😄', '😊', '😎', '🙂', '🤗', '🤩', '😌', '🙃', '😱', '🥳', '🤓', '👏', '👍', '🎉'];

export const breakPoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1210,
  desktopSliders: 1340,
};

export const PROFILE_MENU_ITEMS: BaseMenuItem[] = [
  {
    type: PROFILE_NAV_TYPES.PROFILE,
    title: 'Мой профиль',
    href: '/profile',
    icon: 'user',
  },
  {
    type: PROFILE_NAV_TYPES.GROUPS,
    title: 'Мои группы',
    href: '/profile/groups',
    icon: 'users',
    count: '0',
    hideUnAuth: true,
  },
  {
    type: PROFILE_NAV_TYPES.ORDERS,
    title: 'Мои заказы',
    href: '/profile/orders',
    icon: 'bag',
    count: '0',
    hideUnAuth: true,
  },
  {
    type: PROFILE_NAV_TYPES.FAVOURITES,
    title: 'Избранное',
    href: '/profile/favourites',
    icon: 'heart',
    count: '0',
  },
  {
    title: 'Выход',
    action: 'logout',
    icon: 'logout',
    type: 'logout',
  },
];

export const ADVANTAGES = [
  {
    type: 'cart',
    title: 'Ультра дискаунтер',
    text: 'Мы собрали супер товары из Китая по супер ценам',
  },
  {
    type: 'group',
    title: 'Вместе дешевле',
    text: 'Объединяйтесь с друзьями в группы и покупайте по супер цене',
  },
  {
    type: 'warranty',
    title: 'Гарантия',
    text: 'Мы стоим за вас стеной гарантируем возврат денег и бесплатную доставку',
  },
];
