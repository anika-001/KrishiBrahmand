import * as mongoose from 'mongoose';


class Pickup {
    public PickupSchema = new mongoose.Schema({
        productId: {
            type: String
        },

        pickupaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        }
    });
}

let P = new Pickup();
export let pickup = mongoose.model("Pickup", P.PickupSchema);