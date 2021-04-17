import * as mongoose from 'mongoose';

class TempUsers {
    public TempDataSchema = new mongoose.Schema({
        name: {
            type: String,
        },

        role: {
            type:String,
        },

        phone: {
            type: Number,
        },

        email: {
            type: String,
        },

        address: {
            type: String,
        },

        district: {
            type: String,
        },

        state: {
            type: String,
        },

        pincode: {
            type: String,
        },

        password: {
            type: String,
        }

    });
}

let TU = new TempUsers();
export let tempusers = mongoose.model("TempUsers", TU.TempDataSchema);