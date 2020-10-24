export interface BrandMenuItem {
  title: string,
  imageUrl: string,
  href: string,
}

export interface ChildMenuItem {
  title: string,
  href: string,
}

export interface ChildMenuItem {
  title: string,
  href: string,
}

export interface ChildItem {
  main: ChildMenuItem,
  links: ChildMenuItem[]
}

export interface MenuItem {
  title: string,
  href: string,
  icon: string,
  inGeneralMenu?: boolean,
  brands?: BrandMenuItem[],
  children?: ChildItem[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Электроника',
    href: '',
    icon: '',
    inGeneralMenu: true,
    brands: [
      { title: 'Honor', imageUrl: '', href: '', },
      { title: 'Samsung', imageUrl: '', href: '' },
      { title: 'Xiaomi', imageUrl: '', href: '' },
      { title: 'Sony', imageUrl: '', href: '' },
      { title: 'JBL', imageUrl: '', href: '' }
    ],
    children: [
      {
        main: { title: 'Смартфоны и умные часы', href: '' },
        links: [
          { title: 'Мобильные телефоны', href: '' },
          { title: 'Смартфоны', href: '' },
          { title: 'Кнопочные мобильные телефоны', href: '' },
          { title: 'Умные часы и браслеты', href: '' },
          { title: 'Аксессуары для телефонов', href: '' },
        ]
      },
      {
        main: { title: 'Портативная техника', href: '' },
        links: [
          { title: 'Наушники и Bluetooth-гарнитуры', href: '' },
          { title: 'Портативная акустика', href: '' },
          { title: 'Очки виртуальной реальности', href: '' },
          { title: 'Планшеты', href: '' },
          { title: 'Умные колонки', href: '' }
        ]
      },
      {
        main: { title: 'Аудио- и видеотехника', href: '' },
        links: [
          { title: 'Телевизоры', href: '' },
          { title: 'Онлайн подписки и карты оплаты', href: '' },
          { title: 'Аудиотехника', href: '' },
          { title: 'TV-тюнеры', href: '' },
          { title: 'ТВ-приставки и медиаплееры', href: '' }
        ]
      },
      {
        main: { title: 'Фото- и видеокамеры', href: '' },
        links: [
          { title: 'Фотоаппараты', href: '' },
          { title: 'Объективы', href: '' },
          { title: 'Экшн-камеры', href: '' },
          { title: 'Видеокамеры', href: '' },
          { title: 'Квадрокоптеры с камерой', href: '' }
        ]
      },
    ]
  },
  {
    title: 'Смартфоны',
    href: '',
    icon: '',
    inGeneralMenu: true,
    children: [
      {
        main: { title: 'Смартфоны и умные часы', href: '' },
        links: [
          { title: 'Мобильные телефоны', href: '' },
          { title: 'Смартфоны', href: '' },
          { title: 'Кнопочные мобильные телефоны', href: '' },
          { title: 'Умные часы и браслеты', href: '' },
          { title: 'Аксессуары для телефонов', href: '' },
        ]
      },
      {
        main: { title: 'Фото- и видеокамеры', href: '' },
        links: [
          { title: 'Фотоаппараты', href: '' },
          { title: 'Объективы', href: '' },
          { title: 'Экшн-камеры', href: '' },
          { title: 'Видеокамеры', href: '' },
          { title: 'Квадрокоптеры с камерой', href: '' }
        ]
      },
    ]
  },
  {
    title: 'Бытовая техника',
    href: '',
    icon: '',
    inGeneralMenu: true,
    children: [
      {
        main: { title: 'Смартфоны и умные часы', href: '' },
        links: [
          { title: 'Мобильные телефоны', href: '' },
          { title: 'Смартфоны', href: '' },
          { title: 'Кнопочные мобильные телефоны', href: '' },
          { title: 'Умные часы и браслеты', href: '' },
          { title: 'Аксессуары для телефонов', href: '' },
        ]
      },
    ]
  },
  {
    title: 'Женский гардероб',
    inGeneralMenu: true,
    href: '',
    icon: '',
  },
  {
    title: 'Гаджеты',
    inGeneralMenu: true,
    href: '',
    icon: '',
  },
  {
    title: 'Детские товары',
    href: '',
    icon: '',
  },
  {
    title: 'Хобби',
    inGeneralMenu: true,
    href: '',
    icon: '',
  },
  {
    title: 'Красота',
    href: '',
    icon: '',
  },
  {
    title: 'Красота',
    href: '',
    icon: '',
  },
  {
    title: 'Здоровье',
    href: '',
    icon: '',
  },
  {
    title: 'Продукты',
    href: '',
    icon: '',
  },
  {
    title: 'Детские товары',
    href: '',
    icon: '',
  },
  {
    title: 'Зоотовары',
    href: '',
    icon: '',
  },
];










