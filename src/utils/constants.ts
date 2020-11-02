import { MenuItem } from '@/utils/models';

export const breakPoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1296,
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
