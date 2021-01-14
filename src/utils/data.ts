import { nanoid } from 'nanoid';
import { Product, ProductFeature, ProductShop } from '@/models/product';
import {
  ORDER_STATUSES, PRODUCT_FEATURES, REQUIRED_ADDRESS_FIELDS, SEX_TYPES,
} from '@/models/enums';
import {
  Group, OrderItem, OrderUser, ProfileUser,
} from '@/models/models';
import { getIfExist } from './common';

export const getRandomArrayElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
export const getRandomNumberBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const featureDate = (): number => new Date().getTime() + ((getRandomNumberBetween(10, 24) * 60 * 60 * 1000) * 0.9);

const NAMES = ['Анна', 'Мария', 'Саша', 'Виктория', 'Елена', 'Ольга'];
const DESCRIPTION = '1. Внутри с отражающим серебром и поставляется с передним полупрозрачный диффузор, отлично подходит для speedlite, monolight, стробоскопа или раба.\n 2. Быстрый и легкий способ производства красивого рассеянного света.\n 3. Специально разработан для speedlites и strobist, необходимо иметь для съемки местоположения.\n 4. Независимый моноблок вспышки\n 5. Предназначен для цифровых и пленочных камер.\n 6. Все металлические конструкции высокого качества.\n 7. Встроены в рабские устройства-нет грязных проводов.\n 8. Совместимость с большинством вспышек камеры (толщина вспышки должна быть более 47 мм, если ниже 47 мм, пожалуйста, используйте некоторые карты, чтобы сделать его более толстым)';
const PRODUCT_TITLES = ['Магнитный кабель с адаптером или адаптер', 'Просто кабель', 'Фото камера сумка через плечо крест цифровой'];
const FEATURES: ProductFeature[] = [
  {
    type: PRODUCT_FEATURES.DELIVERY,
    icon: '',
    title: '',
  },
  {
    type: PRODUCT_FEATURES.DISCOUNT,
    icon: '',
    title: '',
  },
  {
    type: PRODUCT_FEATURES.HOT,
    icon: '',
    time: featureDate(),
    title: '',
  }];

const createFeatures = () => {
  const featuresLength = getRandomNumberBetween(0, FEATURES.length);
  return FEATURES.slice(0, featuresLength);
};

const getRate = () => `${getRandomNumberBetween(0, 9)},${getRandomNumberBetween(0, 9)}`;

const getDate = () => new Date(getRandomNumberBetween(1970, 2010), getRandomNumberBetween(0, 11), getRandomNumberBetween(1, 31));

export const getShop = (): ProductShop => ({
  id: nanoid(),
  id_brand: nanoid(),
  name: 'Nike',
  description: 'Магазин электроники в котором есть все',
  image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/100`,
  orders: getRandomNumberBetween(100000, 500000),
  rate: getRate(),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
  category: 'Спортивные товары',
});

const createProduct = (item, index): Product => ({
  id: nanoid(),
  id_product: nanoid(),
  title: getRandomArrayElement(PRODUCT_TITLES),
  rate: getRate(),
  groups: getRandomNumberBetween(0, 999),
  maxCount: getRandomNumberBetween(0, 9999),
  images: {
    preview: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/300`,
    detail: new Array(getRandomNumberBetween(1, 25)).fill({}).map(() => ({
      url: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/700`,
    })),
  },
  features: createFeatures(),
  meta: {
    date: {
      title: 'Дата заказа',
      value: {
        label: Date.now().toString(),
        value: Date.now().toString(),
      },
    },
    index: {
      title: 'Номер',
      value: {
        label: 'Z635Y635',
        value: 'Z635Y635',
      },
    },
    status: {
      title: 'Статус',
      value: {
        label: 'Отправлен',
        value: ORDER_STATUSES.SEND,
      },
    },
    color: {
      title: 'Цвет',
      value: {
        label: 'Черный',
        value: 'black',
      },
    },
    size: {
      title: 'Размер',
      value: {
        label: 'M (48-50)',
        value: 'm',
      },
    },
    quantity: {
      title: 'Количество',
      value: {
        label: '1',
        value: '1',
      },
    },
    delivery: {
      title: 'Доставка',
      value: {
        label: `20.02.2020 —  23.03.2020
        Chine Standard Shipping
        230 ₽ `,
        value: `20.02.2020 —  23.03.2020
        Chine Standard Shipping
        230 ₽ `,
      },
    },
    resultCost: {
      title: 'Итоговая стоимость',
      value: {
        label: '244 585',
        value: '244 585',
      },
    },
  },
  options: {
    1: {
      title: 'Цвета',
      id: '1',
      values: [{ label: 'Красный', value: 'red' }, { label: 'Розовый', value: 'pink', selected: true }, {
        label: 'Фиолетовый',
        value: 'cyan',
      }],
    },
    2: {
      title: 'Размер',
      id: '2',
      values: [{ label: 'S (47)', value: 's' }, {
        label: 'M (48-50)',
        value: 'm',
        selected: true,
      }, { label: 'L (50-52)', value: 'l' }],
    },
    3: {
      title: 'Количество',
      id: '3',
      values: [{ label: '1', value: '1', selected: true }],
    },
  },
  description: DESCRIPTION,
  crossedPrice: getRandomNumberBetween(1000, 400000),
  selfPrice: getRandomNumberBetween(1000, 400000),
  groupPrice: getRandomNumberBetween(1000, 300000),
  orders: getRandomNumberBetween(1000, 700000),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
  brand: getShop(),
  contacts: {
    name: 'Nikulin Alexander Ivanovich',
    phone: '+7 995 115-55-16',
    address: {
      street: 'Lenina street',
      house: 'dom 34',
      flat: 'kv 24',
      city: 'Moscow',
      county: 'Russian Federation',
      index: '129343',
    },
  },
  delivery: {
    freeDelivery: '15-60 дней',
    refundFrom: '15 дек. 2018',
    refundTo: '22 янв. 2019',
  },
  users: [
    {
      id: '1',
      orderId: '1',
      name: 'Вы',
      avatar: `https://picsum.photos/id/${2 + getRandomNumberBetween(0, 100)}/50`,
    },
    {
      id: '2',
      orderId: '1',
      name: 'Сабина Фатулина',
      avatar: `https://picsum.photos/id/${2 + getRandomNumberBetween(0, 100)}/50`,
    },
  ],
  messages: [
    {
      userId: '1',
      date: '27 декбря 2018',
      text: 'Так, а че когда доставят товар?',
    },
    {
      userId: '2',
      date: '16 марта 2018',
      text: 'Добрый день. Простите, просто забыли отправить. Сейчас все сделаем.',
    },
  ],
  orderDate: getDate(),
});

const createGroup = (item, index): Group => ({
  id: nanoid(),
  isJoined: Boolean(getRandomNumberBetween(0, 1)),
  avatar: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/50`,
  allUsers: getRandomNumberBetween(10, 20),
  joinedUsers: [],
  title: 'Фото камера сумка через плечо крест цифровой',
  time: featureDate(),
});

const createUser = (item, index): OrderUser => ({
  id: nanoid(),
  orderId: nanoid(),
  name: getRandomArrayElement(NAMES),
  avatar: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/50`,
});

const createDefaultUser = (): object => ({
  id: null,
  orderId: null,
  name: null,
  avatar: getRandomNumberBetween(0, 1) ? require('../assets/icons/default-user-man.svg') : require('../assets/icons/default-user-women.svg'),
});

export const createProfileUser = (item, index): ProfileUser => ({
  id: nanoid(),
  name: getRandomArrayElement(NAMES),
  surname: 'Меньшов',
  patronymic: 'Иванович',
  sex: {
    label: 'Мужчина',
    value: SEX_TYPES.MALE,
  },
  birthday: getDate(),
  getFormatDate() {
    return `${this.birthday?.getDate().toString().padStart(2, '0')}.${this.birthday?.getMonth().toString().padStart(2, '0')}.${this.birthday?.getFullYear()}` || '';
  },
  get age() {
    const now = new Date(Date.now());
    return (now.getFullYear() - (this.birthday?.getFullYear() || NaN)).toString();
  },
  contacts: {
    phone: '+7 (927) 636-22-13',
    email: 'Blakhdb@khd.ru',
  },
  avatar: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/50`,
  addresses: [
    {
      id: nanoid(),
      isActive: true,
      [REQUIRED_ADDRESS_FIELDS.SURNAME]: 'Nikulin',
      [REQUIRED_ADDRESS_FIELDS.NAME]: 'Alexander',
      patronymic: 'Ivanovich',
      street: 'Lenina street',
      house: 'dom 34',
      building: undefined,
      part: undefined,
      flat: 'kv 24',
      [REQUIRED_ADDRESS_FIELDS.EMAIL]: 'Blakhdb@khd.ru',
      phone: '+7 (927) 636-22-13',
      [REQUIRED_ADDRESS_FIELDS.CITY]: 'Moscow',
      district: 'Moscow',
      [REQUIRED_ADDRESS_FIELDS.COUNTRY]: 'Russian Federation',
      [REQUIRED_ADDRESS_FIELDS.INDEX]: '129343',
      getFullName() {
        return `${this.surname} ${this.name} ${getIfExist(this.patronymic)}`;
      },
      getLocation() {
        return `${getIfExist(this.street)} ${getIfExist(this.house)} ${getIfExist(this.building)} ${getIfExist(this.part)} ${getIfExist(this.flat)}`;
      },
      getGlobal() {
        return `${this.city} ${getIfExist(this.district)} ${this.country} ${this.index}`;
      },
    },
    {
      id: nanoid(),
      isActive: false,
      [REQUIRED_ADDRESS_FIELDS.SURNAME]: 'Nikulin',
      [REQUIRED_ADDRESS_FIELDS.NAME]: 'Alexander',
      patronymic: '',
      street: 'Lenina street',
      house: 'dom 34',
      building: undefined,
      part: undefined,
      flat: 'kv 24',
      [REQUIRED_ADDRESS_FIELDS.EMAIL]: 'Blakhdb@khd.ru',
      phone: '+7 (927) 636-22-13',
      [REQUIRED_ADDRESS_FIELDS.CITY]: 'Moscow',
      district: 'Moscow',
      [REQUIRED_ADDRESS_FIELDS.COUNTRY]: 'Russian Federation',
      [REQUIRED_ADDRESS_FIELDS.INDEX]: '129343',
      getFullName() {
        return `${this.surname} ${this.name} ${getIfExist(this.patronymic)}`;
      },
      getLocation() {
        return `${getIfExist(this.street)} ${getIfExist(this.house)} ${getIfExist(this.building)} ${getIfExist(this.part)} ${getIfExist(this.flat)}`;
      },
      getGlobal() {
        return `${this.city} ${getIfExist(this.district)} ${this.country} ${this.index}`;
      },
    },
  ],
  cards: [
    {
      id: nanoid(),
      isActive: true,
      type: 'master',
      number: '5645',
      owner: 'owner',
      date: '04/22',
      cvv: '344',
    },
    {
      id: nanoid(),
      isActive: false,
      type: 'visa',
      number: '3322',
      owner: 'owner',
      date: '04/22',
      cvv: '344',
    },
  ],
});

const orderSuccessStatuses = [ORDER_STATUSES.FULFILL, ORDER_STATUSES.PREPARED, ORDER_STATUSES.SEND];
const orderFailStatuses = [ORDER_STATUSES.CANCELLED, ORDER_STATUSES.CANCELLED_BY_CUSTOMER, ORDER_STATUSES.DELIVERED];

const createOrder = (item, index, failed?): OrderItem => ({
  id: nanoid(),
  image: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/200`,
  date: '12 декабря 2019',
  title: 'Фото камера сумка через плечо крестовой срез через плечо через плечо',
  status: failed ? getRandomArrayElement(orderFailStatuses) : getRandomArrayElement(orderSuccessStatuses),
  time: getRandomNumberBetween(0, 1) ? featureDate() : undefined,
  price: getRandomNumberBetween(100000, 500000),
  users: new Array(getRandomNumberBetween(1, 25)).fill({}).map(createUser),
  maxUsers: getRandomNumberBetween(10, 20),
});

export const generateProducts = (count: number): Product[] => new Array(count).fill({}).map(createProduct);
export const generateOrders = (count: number): OrderItem[] => new Array(count).fill({}).map((item, index) => createOrder(item, index));
export const generateFailOrders = (count: number): OrderItem[] => new Array(count).fill({}).map((item, index) => createOrder(item, index, true));

export const generateGroups = (count: number) => new Array(count).fill({}).map(createGroup);
export const generateShops = (count: number) => new Array(count).fill({}).map(getShop);

export const generateUsers = (count: number) => new Array(count).fill({}).map(createUser);

export const generateDefaultUsers = (count: number) => new Array(count).fill({}).map(createDefaultUser);

const CATEGORIES_COLORS = ['pink', 'yellow', 'cyan'];
const CATEGORIES_TYPES = ['red', 'brown', 'blue', 'light-blue'];
const CATEGORIES_POSITIONS = ['bottom', 'center', 'top'];
const CATEGORIES_POSITIONS_MOBILE = ['right-center', 'center-bottom', 'right-top', 'light-blue'];

export const topCategories = [
  {
    title: 'Спортивный инвентарь',
    src: require('../assets/images/top-01.png'),
    position: 'bottom',
    positionMobile: 'right-center',
    type: 'red',
    color: 'pink',
  },
  {
    title: 'Cмарфтоны',
    src: require('../assets/images/top-02.png'),
    position: 'center',
    positionMobile: 'center-bottom',
    type: 'brown',
    color: 'yellow',
  },
  {
    title: 'Компьютеры и офис',
    src: require('../assets/images/top-03.png'),
    position: 'top',
    positionMobile: 'right-top',
    type: 'blue',
    color: 'cyan',
  },
  {
    title: 'Женский гардероб',
    src: require('../assets/images/top-04.png'),
    position: 'bottom',
    positionMobile: 'center-bottom',
    type: 'light-blue',
    color: 'pink',
  },
  {
    title: 'Спортивный инвентарь',
    src: require('../assets/images/top-01.png'),
    position: 'bottom',
    positionMobile: 'right-center',
    type: 'red',
    color: 'cyan',
  },
  {
    title: 'Cмарфтоны',
    src: require('../assets/images/top-02.png'),
    position: 'center',
    positionMobile: 'center-bottom',
    type: 'brown',
    color: 'yellow',
  },
];
