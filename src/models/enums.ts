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
  PAYMENT_WAITING = 1, // Ожидается оплата
  PAID = 2, // Оплачен
  ERROR_PAY = 3, // Ошибка оплаты
  SENT = 4, // Отправлен
  DELIVERED = 5, // Доставлен
  EXPIRED = 6, // Просрочен
  REJECTED = 7, // Отклонен
  IN_PROCESS = 8, // В процессе оформления
  CANCELED_BY_CUSTOMER = 9, // Заказ отменен покупателем
}

export enum CARD_TYPES {
  MASTERCARD = 'MasterCard',
  VISA = 'Visa'
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
  FAVOURITES = 'fav',
}

export enum SERVER_ERRORS {
  UNAUTHORIZED = 'Unauthorized'
}

export enum PAY_STATUSES {
  SUCCEDED = 'succeeded',
  PENDING = 'pending'
}
