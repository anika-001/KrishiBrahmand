import * as mongoose from 'mongoose';


class Orders {
    public OrdersSchema = new mongoose.Schema({
        type: [{
            uid: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Users'
            },
            orders: [{
                orderId: {
                    type: String
                },
                Items: [{
                    itemId: { type: String },
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                    price: { type: Number },
                    quantity: { type: Number },
                    trackStatus: { type: String }
                }]
            }]
        }]

    });
}

let O = new Orders();
export let orders = mongoose.model("Orders", O.OrdersSchema);
