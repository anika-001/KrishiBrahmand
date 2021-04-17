import * as mongoose from 'mongoose';


class Address {
    public AddressSchema = new mongoose.Schema({
        uid: {
            type: String
        },

        defaultaddress: {
            address: String,
            state: String,
            district: String,
            pincode: String

        },

        createnewaddress: [{
            addresstitle: String,
            address: String,
            state: String,
            district: String,
            pincode: String           
        }]
    });
}

let A = new Address();
export let address = mongoose.model("Address", A.AddressSchema);
