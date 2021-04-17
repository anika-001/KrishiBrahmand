import * as mongoose from 'mongoose';


class Shipment {
    public ShipmentSchema = new mongoose.Schema({
        uid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Users'
        },

        itemList: [{
            itemId: {type: String}
        }]

    });
}

let S = new Shipment();
export let shipment = mongoose.model("Shipment", S.ShipmentSchema);
