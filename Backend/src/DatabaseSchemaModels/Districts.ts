import * as mongoose from 'mongoose';

class Districts{

    public DistrictsSchema = new mongoose.Schema({
        name: {
            type: String
        },

        districts: {
            type: Array
        }
    });

}

let DS = new Districts();
export let districts = mongoose.model("districts", DS.DistrictsSchema);