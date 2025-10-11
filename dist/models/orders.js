import { Schema, model } from "mongoose";
const OrderSchema = new Schema({
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
const Order = model("Order", OrderSchema);
export default Order;
