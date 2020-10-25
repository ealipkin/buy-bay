import { Group, Product, PRODUCT_FEATURES, ProductFeature } from '@/utils/models';
import { nanoid } from 'nanoid';

const getRandomArrayElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
const getRandomNumberBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const featureDate = () => {
  return new Date().getTime() + ((getRandomNumberBetween(10, 24) * 60 * 60 * 1000) * 0.9);
};

const PRODUCT_IMAGES = [''];
const PRODUCT_TITLES = ['Магнитный кабель с адаптером или адаптер', 'Просто кабель', 'Фото камера сумка через плечо крест цифровой'];
const FEATURES: ProductFeature[] = [
  {
    type: PRODUCT_FEATURES.DELIVERY,
    icon: '',
    border: '#ffffff4c',
    background: '#ffcc01',
  },
  {
    type: PRODUCT_FEATURES.DISCOUNT,
    icon: '',
    border: '#ffffff4c',
    background: '#5a9bff',
  },
  {
    type: PRODUCT_FEATURES.HOT,
    icon: '',
    border: '#ffffff4c',
    background: '#ef4141',
    time: featureDate(),
  }];

const createFeatures = () => {
  const featuresLength = getRandomNumberBetween(0, FEATURES.length);
  return FEATURES.slice(0, featuresLength);
};
const createProduct = (item, index): Product => ({
  id: nanoid(),
  title: getRandomArrayElement(PRODUCT_TITLES),
  rate: parseFloat(`${getRandomNumberBetween(0, 9)}.${getRandomNumberBetween(0, 9)}`),
  groups: getRandomNumberBetween(0, 999),
  images: {
    preview: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/300`,
    detail: new Array(getRandomNumberBetween(1, 5)).fill({}).map(() => ({
      url: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/700`,
    }))
  },
  features: createFeatures(),
  options: [
    {
      title: 'Цвета',
      id: '1',
      values: [{ label: 'Красный', value: 'red' }, { label: 'Розовый', value: 'pink', selected: true }, {
        label: 'Фиолетовый',
        value: 'cyan'
      }]
    },
    {
      title: 'Размер',
      id: '2',
      values: [{ label: 'S (47)', value: 's' }, { label: 'M (48-50)', value: 'm', selected: true }, { label: 'L (50-52)', value: 'l' }]
    }],
  description: '',
  selfPrice: getRandomNumberBetween(1000, 400000),
  groupPrice: getRandomNumberBetween(1000, 300000),
  orders: getRandomNumberBetween(1000, 700000),
  isFavourite: Boolean(getRandomNumberBetween(0, 1)),
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

export const generateProducts = (count: number) => new Array(count).fill({}).map(createProduct);

export const generateGroups = (count: number) => new Array(count).fill({}).map(createGroup);
