import * as mongoose from 'mongoose';


class OngoingOrders {
    public OngoingOrdersSchema = new mongoose.Schema({
        OrderId: {
            type: String
        },

        itemsList: [{
            itemId: String,
            // productId: String,
            quantity: Number,
            tracking: String,
            DeliveryBy: String,
            DeliveryPerson: String,
            total: Number,
            discount: Number,
        }],

        deliveryaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        },
        
        payment:{
            type: String
        },
    });
}

let oo = new OngoingOrders();
export let ongoingorders = mongoose.model("OngoingOrders", oo.OngoingOrdersSchema);