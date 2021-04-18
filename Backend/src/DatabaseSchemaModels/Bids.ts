import * as mongoose from 'mongoose';

class Bids{

    public BidsSchema = new mongoose.Schema({
        uid: {
            type: String
        },
        productId: {
            type: String
        },
        cost: {
            type: Number
        },
        quantity:{
            type: Number
        },
        date:{
            type: Date
        },
        status:{
            type: String
        }
    });

}

let BS = new Bids();
export let bids = mongoose.model("Bids", BS.BidsSchema);