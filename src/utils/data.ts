import { Product, PRODUCT_FEATURES, ProductFeature } from '@/utils/models';
import { nanoid } from 'nanoid';

const featureDate = () => {
  const dateOffset = (24 * 60 * 60 * 1000) * 0.9;
  const date = new Date();
  date.setTime(date.getTime() - dateOffset);
  return +date;
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

const getRandomArrayElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
const getRandomNumberBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const createFeatures = () => {
  const featuresLength = getRandomNumberBetween(0, FEATURES.length);
  return FEATURES.slice(0, featuresLength);
};
const createProduct = (item, index): Product => ({
  id: nanoid(),
  title: getRandomArrayElement(PRODUCT_TITLES),
  rate: parseFloat(`${getRandomNumberBetween(0, 9)}.${getRandomNumberBetween(0, 9)}`),
  groups: getRandomNumberBetween(0, 999),
  images: { preview: `https://picsum.photos/id/${index * 2 + getRandomNumberBetween(0, 100)}/300` },
  features: createFeatures(),
  options: [],
  description: '',
  selfPrice: getRandomNumberBetween(1000, 400000),
  groupPrice: getRandomNumberBetween(1000, 300000),
  orders: getRandomNumberBetween(1000, 700000),
  isFavourite: false,
});

export const generateProducts = (count: number) => new Array(count).fill({}).map(createProduct);
