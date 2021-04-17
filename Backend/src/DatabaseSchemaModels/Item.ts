import * as mongoose from 'mongoose';

class Item{

    public ItemSchema = new mongoose.Schema({
        img: 
            { data: Buffer, contentType: String },
        
    });

}

let IS = new Item();
export let item = mongoose.model("Items", IS.ItemSchema);