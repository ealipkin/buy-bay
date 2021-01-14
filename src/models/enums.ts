export enum CONFIRMATION_STEPS {
  PHONE = 'phone',
  CODE = 'code',
}

export enum SORT_PARAMS {
  POPULAR = 'popular',
  DATE = 'fav_product.date',
  DATE_DESC = 'fav_product.date_desc',
  RATE = 'rate',
  RATE_DESC = 'rate_desc',
  PRICE = 'price',
  PRICE_DESC = 'price_desc',
  GROUPS = 'u_group',
  DISCOUNT = 'discount'
}

export enum PRODUCT_FEATURES {
  DELIVERY = 'delivery',
  HOT = 'hot',
  DISCOUNT = 'discount',
}

export enum ORDER_STATUSES {
  // SUCCESS = 'success', // заказ доставлен
  // PENDING = 'pending', // ожидаем участников группы
  // FAIL = 'fail', // группа не сформирована
  REJECT = 'reject', // заказ отменен
  // success order statuses
  FULFILL = 'fulfill', // группа сформирована
  PREPARED = 'prepared', // Заказ передан продавцу
  SEND = 'send', // заказ отправлен
  // fail order statuses
  CANCELLED = 'cancelled', // Заказ отменён продавцом
  CANCELLED_BY_CUSTOMER = 'cancelledByCustomer', // Заказ отменён покупателем
  DELIVERED = 'delivered', // Заказ доставлен
}

export enum REQUIRED_ADDRESS_FIELDS {
  SURNAME = 'surname',
  NAME = 'name',
  EMAIL = 'email',
  COUNTRY = 'country',
  CITY = 'city',
  INDEX = 'index',
}

export enum NOTIFICATIONS_TYPES {
  MESSAGE = 'message',
  GROUP = 'group',
  DELIVERY = 'delivery',
}

export enum SEX_TYPES {
  MALE = 'male',
  FEMALE = 'female',
}

export enum SEARCH_ITEM_TYPE {
  BRAND = 'brand',
  PRODUCT = 'product',
  CATEGORY = 'category',
}

export enum PROFILE_NAV_TYPES {
  PROFILE = 'profile',
  GROUPS = 'groups',
  ORDERS = 'orders',
  FAVOURITES = 'favourites',
}
