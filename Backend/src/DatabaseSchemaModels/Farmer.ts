import * as mongoose from 'mongoose';


class Farmer {
    public FarmerSchema = new mongoose.Schema({
        uid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Users'
        },

        prodId: {
            type:  [{productid: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
        },

        rating: {
            type: Number,
        }

    });
}

let F = new Farmer();
export let farmer = mongoose.model("Farmer", F.FarmerSchema);
