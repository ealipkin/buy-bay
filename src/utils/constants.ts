import {
  BaseMenuItem, MenuChildItem, MenuItem, NOTIFICATIONS_TYPES, NotificationItem,
} from '@/utils/models';

export const breakPoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1296,
};

export const PROFILE_MENU_ITEMS: BaseMenuItem[] = [
  {
    title: 'Мой профиль',
    href: '/profile',
    icon: 'user',
  },
  {
    title: 'Мои группы',
    href: '/profile/groups',
    icon: 'users',
  },
  {
    title: 'Мои заказы',
    href: '/profile/orders',
    icon: 'bag',
  },
  {
    title: 'Избранное',
    href: '/profile/favourites',
    icon: 'heart',
  },
  {
    title: 'Настройки сервиса',
    href: '/profile/settings',
    icon: 'settings',
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

export const MENU_CHILD_ITEMS: MenuChildItem[] = [
  {
    main: { title: 'Смартфоны и умные часы', href: '#' },
    links: [
      { title: 'Мобильные телефоны', href: '#' },
      { title: 'Смартфоны', href: '#' },
      { title: 'Кнопочные мобильные телефоны', href: '#' },
      { title: 'Умные часы и браслеты', href: '#' },
      { title: 'Аксессуары для телефонов', href: '#' },
    ],
  },
  {
    main: { title: 'Портативная техника', href: '#' },
    links: [
      { title: 'Наушники и Bluetooth-гарнитуры', href: '#' },
      { title: 'Портативная акустика', href: '#' },
      { title: 'Очки виртуальной реальности', href: '#' },
      { title: 'Планшеты', href: '#' },
      { title: 'Умные колонки', href: '#' },
    ],
  },
  {
    main: { title: 'Аудио- и видеотехника', href: '#' },
    links: [
      { title: 'Телевизоры', href: '#' },
      { title: 'Онлайн подписки и карты оплаты', href: '#' },
      { title: 'Аудиотехника', href: '#' },
      { title: 'TV-тюнеры', href: '#' },
      { title: 'ТВ-приставки и медиаплееры', href: '#' },
    ],
  },
  {
    main: { title: 'Фото- и видеокамеры', href: '#' },
    links: [
      { title: 'Фотоаппараты', href: '#' },
      { title: 'Объективы', href: '#' },
      { title: 'Экшн-камеры', href: '#' },
      { title: 'Видеокамеры', href: '#' },
      { title: 'Квадрокоптеры с камерой', href: '#' },
    ],
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Мой профиль',
    href: '/catalog',
    icon: 'user',
    inGeneralMenu: true,
    brands: [
      { title: 'Honor', imageUrl: 'brands/honor.jpg', href: '#' },
      { title: 'Apple', imageUrl: 'brands/apple.jpg', href: '#' },
      { title: 'Samsung', imageUrl: 'brands/samsung.jpg', href: '#' },
      { title: 'Xiaomi', imageUrl: 'brands/xiaomi.jpg', href: '#' },
      { title: 'Sony', imageUrl: 'brands/sony.jpg', href: '#' },
      { title: 'JBL', imageUrl: 'brands/jbl.jpg', href: '#' },
    ],
    children: MENU_CHILD_ITEMS,
  },
  {
    title: 'Смартфоны',
    href: '/catalog',
    icon: 'users',
    inGeneralMenu: true,
    isActive: true,
    children: [
      {
        main: { title: 'Смартфоны и умные часы', href: '#' },
        links: [
          { title: 'Мобильные телефоны', href: '#' },
          { title: 'Смартфоны', href: '#' },
          { title: 'Кнопочные мобильные телефоны', href: '#' },
          { title: 'Умные часы и браслеты', href: '#' },
          { title: 'Аксессуары для телефонов', href: '#' },
        ],
      },
      {
        main: { title: 'Фото- и видеокамеры', href: '#' },
        links: [
          { title: 'Фотоаппараты', href: '#' },
          { title: 'Объективы', href: '#' },
          { title: 'Экшн-камеры', href: '#' },
          { title: 'Видеокамеры', href: '#' },
          { title: 'Квадрокоптеры с камерой', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Бытовая техника',
    href: '/catalog',
    icon: 'users',
    isActive: true,
    inGeneralMenu: true,
    children: [
      {
        main: { title: 'Смартфоны и умные часы', href: '#' },
        links: [
          { title: 'Мобильные телефоны', href: '#' },
          { title: 'Смартфоны', href: '#' },
          { title: 'Кнопочные мобильные телефоны', href: '#' },
          { title: 'Умные часы и браслеты', href: '#' },
          { title: 'Аксессуары для телефонов', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Женский гардероб',
    inGeneralMenu: true,
    href: '/catalog',
    icon: 'bag',
  },
  {
    title: 'Гаджеты',
    inGeneralMenu: true,
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Детские товары',
    href: '/catalog',
    icon: 'heart',
    inGeneralMenu: true,
  },
  {
    title: 'Хобби',
    inGeneralMenu: true,
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Красота',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Красота',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Здоровье',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Продукты',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Детские товары',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Зоотовары',
    href: '/catalog',
    icon: 'heart',
  },
  {
    title: 'Дача',
    inGeneralMenu: true,
    href: '/catalog',
    icon: 'heart',
  },
];

export const FILTERS = [
  {
    label: 'Бренд',
    isSearch: true,
    type: 'checkbox',
    items: [
      {
        id: 1,
        label: 'Banana Republic',
        count: 342,
        selected: true,
        value: '1',
      },
      {
        id: 2,
        label: 'Calvin Klein',
        count: 13,
        selected: true,
        value: '2',
      },
      {
        id: 3,
        label: 'Casio',
        count: 119,
        selected: false,
        value: '3',
      },
      {
        id: 4,
        label: 'Adidas',
        count: 119,
        selected: false,
        value: '4',
      },
      {
        id: 5,
        label: 'Dolce & Gabbana',
        count: 13,
        selected: true,
        value: '5',
      },
      {
        id: 6,
        label: 'Nike',
        count: 119,
        selected: false,
        value: '6',
      },
      {
        id: 7,
        label: 'Puma',
        count: 1,
        selected: false,
        value: '7',
      },
      {
        id: 8,
        label: 'Adidas',
        count: 119,
        selected: false,
        value: '8',
      },
      {
        id: 9,
        label: 'Dolce & Gabbana',
        count: 13,
        selected: true,
        value: '9',
      },
      {
        id: 10,
        label: 'Nike',
        count: 119,
        selected: false,
        value: '10',
      },
      {
        id: 11,
        label: 'Puma',
        count: 1,
        selected: false,
        value: '11',
      },
    ],
  },
  {
    label: 'Категории',
    type: 'accordion',
    items: [
      {
        label: 'Men',
        items: [
          { id: 1, label: 'Outerwear' },
          { id: 2, label: 'Jumpers & Cardigans' },
          { id: 3, label: 'Pants & Jeans' },
          { id: 4, label: 'T-shirts & Shirts' },
          { id: 5, label: 'Shoes' },
        ],
      },
      {
        label: 'Women',
        items: [
          { id: 1, label: 'Outerwear' },
          { id: 2, label: 'Jumpers & Cardigans' },
          { id: 3, label: 'Pants & Jeans' },
          { id: 4, label: 'T-shirts & Shirts' },
          { id: 5, label: 'Shoes' },
        ],
      },
      {
        label: 'Kids',
        items: [
          { id: 1, label: 'Outerwear' },
          { id: 2, label: 'Jumpers & Cardigans' },
          { id: 3, label: 'Pants & Jeans' },
          { id: 4, label: 'T-shirts & Shirts' },
          { id: 5, label: 'Shoes' },
        ],
      },
      {
        label: 'Accessories',
        items: [
          { id: 1, label: 'Outerwear' },
          { id: 2, label: 'Jumpers & Cardigans' },
          { id: 3, label: 'Pants & Jeans' },
          { id: 4, label: 'T-shirts & Shirts' },
          { id: 5, label: 'Shoes' },
        ],
      },
    ],
  },
  {
    label: 'Цвета',
    type: 'color',
    items: [
      {
        id: 1,
        color: '#ffab38',
        selected: true,
      },
      {
        id: 2,
        color: '#496cff',
      },
      {
        id: 3,
        color: '#222222',
        selected: true,
      },
      {
        id: 4,
        color: '#c9c9d4',
      },
      {
        id: 5,
        color: '#36ba40',
      },
      {
        id: 6,
        color: '#467cff',
      },
      {
        id: 7,
        color: '#ffab38',
        selected: true,
      },
      {
        id: 8,
        color: '#496cff',
      },
      {
        id: 9,
        color: '#222222',
        selected: true,
      },
      {
        id: 10,
        color: '#c9c9d4',
      },
      {
        id: 11,
        color: '#36ba40',
      },
      {
        id: 12,
        color: '#467cff',
      },
    ],
  },
  {
    label: 'Доставка',
    type: 'radio',
    name: 'delivery',
    items: [
      {
        id: 1, label: 'Бесплатная доставка', value: 'free', selected: true,
      },
      { id: 2, label: 'Быстрая доставка', value: 'fast' },
      { id: 3, label: 'DHL доставка', value: 'dhl' },
    ],
  },
];

export const SHARE_TIMER = new Date().getTime() + 24 * 60 * 60 * 1000;

export const SHARE_LINK = 'http://vmdesh.ru/8dbuf3';

export const SOCIALS = [
  {
    href: '#',
    icon: 'socials/facebook.svg',
    type: 'facebook',
    title: 'Facebook',
  },
  {
    href: '#',
    icon: 'socials/odnoklassniki.svg',
    type: 'ok',
    title: 'OK',
  },
  {
    href: '#',
    icon: 'socials/vk.svg',
    type: 'vk',
    title: 'VK',
  },
  {
    href: '#',
    icon: 'socials/whatsapp.svg',
    type: 'whatsapp',
    title: 'Whatsapp',
  },
  {
    href: '#',
    icon: 'socials/telegram.svg',
    type: 'telegram',
    title: 'Telegram',
  },
  {
    href: '#',
    icon: 'socials/viber.svg',
    type: 'viber',
    title: 'Viber',
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    type: NOTIFICATIONS_TYPES.MESSAGE, title: '6 новых сообщений', text: 'в группе «iPhone 12 Pro»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.GROUP, title: 'Группа сформирована', text: 'в группе «Стиральная машина…»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.DELIVERY, title: 'Заказ отправлен продавцом', text: '«Фотоаппарат sony a7m3»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.MESSAGE, title: '6 новых сообщений', text: 'в группе «iPhone 12 Pro»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.GROUP, title: 'Группа сформирована', text: 'в группе «iPhone 12 Pro»', read: true,
  },
  {
    type: NOTIFICATIONS_TYPES.MESSAGE, title: '6 новых сообщений', text: 'в группе «iPhone 12 Pro»', read: true,
  },
  {
    type: NOTIFICATIONS_TYPES.DELIVERY, title: 'Заказ отправлен продавцом', text: '«Фотоаппарат sony a7m3»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.MESSAGE, title: '6 новых сообщений', text: 'в группе «iPhone 12 Pro»', read: false,
  },
  {
    type: NOTIFICATIONS_TYPES.GROUP, title: 'Группа сформирована', text: 'в группе «iPhone 12 Pro»', read: true,
  },
  {
    type: NOTIFICATIONS_TYPES.MESSAGE, title: '6 новых сообщений', text: 'в группе «iPhone 12 Pro»', read: true,
  },
];
