import * as mongoose from 'mongoose';


class PastOrders {
    public PastOrdersSchema = new mongoose.Schema({
        uid: {
            type: String
        },

        Orders: [{
            OrderId: {
                type: String
            },

            itemsList: [{
                itemId: String,
                quantity: Number,
                deliveredOn: Date,
                total: Number,
                discount: Number
            }],

            deliveryaddress: {
                address: String,
                state: String,
                district: String,
                pincode: String

            },

        }]

    });
}

let po = new PastOrders();
export let pastorders = mongoose.model("PastOrders", po.PastOrdersSchema);