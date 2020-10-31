import { MenuItem } from '@/utils/models';

export const breakPoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1296
};

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Электроника',
    href: '#',
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
    ],
  },
  {
    title: 'Смартфоны',
    href: '#',
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
    href: '#',
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
    href: '#',
    icon: 'bag',
  },
  {
    title: 'Гаджеты',
    inGeneralMenu: true,
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Детские товары',
    href: '#',
    icon: 'heart',
    inGeneralMenu: true,
  },
  {
    title: 'Хобби',
    inGeneralMenu: true,
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Красота',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Красота',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Здоровье',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Продукты',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Детские товары',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Зоотовары',
    href: '#',
    icon: 'heart',
  },
  {
    title: 'Дача',
    inGeneralMenu: true,
    href: '#',
    icon: 'heart',
  },
];
