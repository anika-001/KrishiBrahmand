import * as mongoose from 'mongoose';


class Carts {
    public CartsSchema = new mongoose.Schema({
        uid: {
            type: String
        },

        itemsList: [{
                productId: String,
                quantity: Number,
            }]
    });
}

let C = new Carts();
export let carts = mongoose.model("Carts", C.CartsSchema);
