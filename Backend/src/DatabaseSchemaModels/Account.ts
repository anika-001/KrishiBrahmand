import * as mongoose from 'mongoose';

class Account{

    public AccountSchema = new mongoose.Schema({
        uid: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
    });

}

let AS = new Account();
export let account = mongoose.model("Accounts", AS.AccountSchema);