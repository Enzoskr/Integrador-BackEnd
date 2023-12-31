import { Model, Schema, Types, model } from "mongoose";

interface IItem {
  desc: String;
  id: Number;
  price: Number;
  quantity: Number;
  title: String;
}
interface IShippingDetails {
  name: String;
  cellphone: Number;
  location: String;
  adress: String;
}

export interface IOrder {
  createdAt: Date;
  user: Types.ObjectId;
  price: number;
  shippingCost: number;
  items: IItem[];
  shippingDetails: IShippingDetails;
  status: String;
  total: Number;
}

const OrderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  items: {
    type: [
      {
        desc: {
          type: String,
          required: true,
        },
        id: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  shippingDetails: {
    name: {
      type: String,
      required: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
