import * as mongoose from 'mongoose';


class Product {
    public ProductSchema = new mongoose.Schema({
        uid: {
            type: String
        },

        image:{
            type: String,
        },


        description: {
            type: String,
        },

        title: {
            type: String,
        },

        categories: [{
            name: {
              type:  String,
            }
        }],

        baseprice: {
            type: Number,
        },

        costing: [{
            discount: {
                type: Number
            },
            quantity: {
                type: Number
            }
        }],

        productRemaining :{
            type: Number
        },

        rating: {
            type: Number,
        },

        noOfUsers: {
            type: Number,
        },

        comments: [{
            uid: {
                type: String
            },
            content: {
                type: String
            },
            email: {
                type: String
            },
            rating: {
                type: Number
            },
            date:{
                type: Number
            }
        }],

        quantity: {
            type: Number
        },
    });
}

let P = new Product();
export let product = mongoose.model("products", P.ProductSchema);
