import {
  Group, ORDER_STATUSES, OrderItem, OrderUser, Product, PRODUCT_FEATURES, ProductFeature, ProductShop,
} from '@/utils/models';
import { nanoid } from 'nanoid';

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
  },
  {
    type: PRODUCT_FEATURES.DISCOUNT,
    icon: '',
  },
  {
    type: PRODUCT_FEATURES.HOT,
    icon: '',
    time: featureDate(),
  }];

const createFeatures = () => {
  const featuresLength = getRandomNumberBetween(0, FEATURES.length);
  return FEATURES.slice(0, featuresLength);
};

const getRate = () => `${getRandomNumberBetween(0, 9)},${getRandomNumberBetween(0, 9)}`;

export const getShop = (): ProductShop => ({
  id: nanoid(),
  name: 'Nike',
  description: 'Магазин электроники в котором есть все',
  image: `https://picsum.photos/id/${3 * 2 + getRandomNumberBetween(0, 100)}/100`,
  orders: getRandomNumberBetween(100000, 500000),
  rate: getRate(),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
});

const createProduct = (item, index): Product => ({
  id: nanoid(),
  title: getRandomArrayElement(PRODUCT_TITLES),
  rate: getRate(),
  groups: getRandomNumberBetween(0, 999),
  images: {
    preview: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/300`,
    detail: new Array(getRandomNumberBetween(1, 5)).fill({}).map(() => ({
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
  options: [
    {
      title: 'Цвета',
      id: '1',
      values: [{ label: 'Красный', value: 'red' }, { label: 'Розовый', value: 'pink', selected: true }, {
        label: 'Фиолетовый',
        value: 'cyan',
      }],
    },
    {
      title: 'Размер',
      id: '2',
      values: [{ label: 'S (47)', value: 's' }, { label: 'M (48-50)', value: 'm', selected: true }, { label: 'L (50-52)', value: 'l' }],
    },
    {
      title: 'Количество',
      id: '3',
      values: [{ label: '1', value: '1', selected: true },],
    },],
  description: DESCRIPTION,
  selfPrice: getRandomNumberBetween(1000, 400000),
  groupPrice: getRandomNumberBetween(1000, 300000),
  orders: getRandomNumberBetween(1000, 700000),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
  shop: getShop(),
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
  ]
});

const createGroup = (item, index): Group => ({
  id: nanoid(),
  isJoined: Boolean(getRandomNumberBetween(0, 1)),
  avatar: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/50`,
  allUsers: getRandomNumberBetween(10, 20),
  joinedUsers: getRandomNumberBetween(0, 20),
  title: 'Фото камера сумка через плечо крест цифровой',
  time: featureDate(),
});

const createUser = (item, index): OrderUser => ({
  id: nanoid(),
  orderId: nanoid(),
  name: getRandomArrayElement(NAMES),
  avatar: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/50`,
});

const createDefaultUser = (item, index): object => ({
  id: null,
  orderId: null,
  name: null,
  avatar: getRandomNumberBetween(0, 1) ? require(`../assets/icons/default-user-man.svg`) : require(`../assets/icons/default-user-women.svg`),
});

const createOrder = (item, index): OrderItem => ({
  id: nanoid(),
  image: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/200`,
  date: '12 декабря 2019',
  title: 'Фото камера сумка через плечо крестовой срез через плечо через плечо',
  status: Object.values(ORDER_STATUSES)[getRandomNumberBetween(0, 5)],
  time: getRandomNumberBetween(0, 1) ? featureDate() : undefined,
  price: getRandomNumberBetween(100000, 500000),
  users: getRandomNumberBetween(0, 1) ? new Array(getRandomNumberBetween(1, 3)).fill({}).map(createUser) : [],
  maxUsers: getRandomNumberBetween(10, 20),
});

export const generateProducts = (count: number): Product[] => new Array(count).fill({}).map(createProduct);
export const generateOrders = (count: number): OrderItem[] => new Array(count).fill({}).map(createOrder);

export const generateGroups = (count: number) => new Array(count).fill({}).map(createGroup);

export const generateUsers = (count: number) => new Array(count).fill({}).map(createUser);

export const generateDefaultUsers = (count: number) => new Array(count).fill({}).map(createDefaultUser);
