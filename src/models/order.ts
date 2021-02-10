import { Product } from '@/models/product';
import { ORDER_STATUSES } from '@/models/enums';

export interface OrderPaymentOption {
  propValue: {
    id_property_value?: number;
    title: string | Date;
  };
  property: {
    id_property?: number;
    is_required?: number;
    title: string;
    type?: string;
  };
  isDate?: boolean;
}

export interface OrderPaymentItem {
  orderProductOptions: OrderPaymentOption[];
  product: Product;
}

export interface Order {
  created_at: string;
  group_id?: number;
  id: number;
  is_group: number;
  oid: string;
  payment_card_id?: number;
  payment_id?: number;
  price: number;
  order_status_id: ORDER_STATUSES;
  updated_at: string;
  user_address_id?: number;
  user_id: number;
}

export interface OrderPaymentPos {
  amount: number;
  created_at: string;
  id: number;
  order_id: number;
  price: number;
  product_id: number;
  updated_at: string;
}

export interface OrderStatus {
  code: string; // 'in_process'
  comment: string; // 'Юзер нажал кнопку, оформляет'
  id: number;
  is_bad: number;
  message?: any;
  notify?: any;
  sms?: any;
  title: string; // 'В процессе оформления'
}

export interface OrderDelivery {
  from: number;
  title: string;
  to: number;
}

export interface OrderData {
  address: null;
  order: Order;
  orderItems: OrderPaymentItem[];
  orderPos: OrderPaymentPos[];
  order_status: OrderStatus;
  delivery?: OrderDelivery;
}
