import {OrderItemInterface} from "./order-item";

export interface OrderInterface {
  id?: string;
  orderItems?: OrderItemInterface[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
