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
    }],
  description: DESCRIPTION,
  selfPrice: getRandomNumberBetween(1000, 400000),
  groupPrice: getRandomNumberBetween(1000, 300000),
  orders: getRandomNumberBetween(1000, 700000),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
  shop: getShop(),
  delivery: {
    freeDelivery: '15-60 дней',
    refundFrom: '15 дек. 2018',
    refundTo: '22 янв. 2019',
  },
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

const createOrder = (item, index): OrderItem => ({
  id: nanoid(),
  image: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/200`,
  date: '12 декабря 2019',
  title: 'Фото камера сумка через плечо крестовой срез через плечо через плечо',
  status: getRandomNumberBetween(0, 1) ? ORDER_STATUSES.SUCCESS : ORDER_STATUSES.SUCCESS,
  time: getRandomNumberBetween(0, 1) ? featureDate() : undefined,
  price: getRandomNumberBetween(100000, 500000),
  users: getRandomNumberBetween(0, 1) ? new Array(getRandomNumberBetween(1, 3)).fill({}).map(createUser) : [],
  maxUsers: getRandomNumberBetween(10, 20),
});

export const generateProducts = (count: number): Product[] => new Array(count).fill({}).map(createProduct);
export const generateOrders = (count: number): OrderItem[] => new Array(count).fill({}).map(createOrder);

export const generateGroups = (count: number) => new Array(count).fill({}).map(createGroup);
