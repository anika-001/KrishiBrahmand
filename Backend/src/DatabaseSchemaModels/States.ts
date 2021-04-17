import * as mongoose from 'mongoose';

class States{

    public StatesSchema = new mongoose.Schema({
        name: {
            type: String
        }
    });

}

let SS = new States();
export let states = mongoose.model("states", SS.StatesSchema);