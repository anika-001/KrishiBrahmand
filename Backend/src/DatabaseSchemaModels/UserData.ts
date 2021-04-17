import * as mongoose from 'mongoose';

class UserData {
    public UserDataSchema = new mongoose.Schema({
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

        // address: {
        //     type: String,
        // },

        // district: {
        //     type: String,
        // },

        // state: {
        //     type: String,
        // }

    });
}

let UD = new UserData();
export let users = mongoose.model("Users", UD.UserDataSchema);
