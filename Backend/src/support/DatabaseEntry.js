//import * as rs  from './RestService';
// const rs = require('./RestService.ts');
const request = require('request');

products = [
    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Apples",
        description: "Juicy fresh apples from Nagpur grown organically",
        categories: ["apple", "organicfruits"],
        productRemaining: 100,
        baseprice: 55,
        costing: [
            {
                discount: 50,
                quantity: 5,
            }
        ],
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Eggplant",
        description: "Organically grown eggplant very sweet",
        categories: ["brinjal", "organicvegetables", "otherexoticvegetables", "exoticvegetables"],
        productRemaining: 90,
        baseprice: 48,
        costing: [
            {
                discount: 43,
                quantity: 5,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Brinjal",
        description: "Sweet brinjal fresh from farm to plate",
        categories: ["brinjal"],
        productRemaining: 50,
        baseprice: 35,
        costing: [
            {
                discount: 30,
                quantity: 6,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Brinjal",
        description: "Eggplant grown in Dhule very fresh and ripe",
        categories: ["brinjal", "organicvegetables"],
        productRemaining: 30,
        baseprice: 37,
        costing: [
            {
                discount: 32,
                quantity: 2,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Green Apples",
        description: "Juicy sweet and scrumptious apples",
        categories: ["apple", "organicfruits", "exoticfruits"],
        productRemaining: 150,
        baseprice: 72,
        costing: [
            {
                discount: 67,
                quantity: 5,
            }
        ],
        rating: 4.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Lemon",
        description: "Juicy lemons with sour sweet taste",
        categories: ["lemon", "lemon", "organicfruits", "lemon"],
        productRemaining: 60,
        baseprice: 15,
        costing: [
            {
                discount: 10,
                quantity: 3,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdd"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Alphanso Mangoes",
        description: "Very very sweet and juicy mangoes ",
        categories: ["mangoes", "exoticfruits", "organicfruits"],
        productRemaining: 200,
        baseprice: 150,
        costing: [
            {
                discount: 100,
                quantity: 3,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Ratnagiri Mangoes",
        description: "Mangoes grown in Ratnagiri very sweet and fresh",
        categories: ["mangoes", "exoticfruits"],
        productRemaining: 190,
        baseprice: 55,
        costing: [
            {
                discount: 50,
                quantity: 5,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Potato",
        description: "Potatoes grown organically with great skill very fresh",
        categories: ["potatoes", "organicvegetables"],
        productRemaining: 50,
        baseprice: 30,
        costing: [
            {
                discount: 25,
                quantity: 4,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Potatoes",
        description: "Potatoes grown fresh ready to eat",
        categories: ["potatoes"],
        productRemaining: 100,
        baseprice: 35,
        costing: [
            {
                discount: 30,
                quantity: 2,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Red Capsicum",
        description: "Red capsicum grown organically in our farm located in Lonavala",
        categories: ["redcapsicum", "organicvegetables", "exoticvegetables"],
        productRemaining: 18,
        baseprice: 50,
        costing: [
            {
                discount: 45,
                quantity: 1,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Strawberry",
        description: "Strawberries grown in farms of Pune with fresh sweet taste",
        categories: ["strawberry", "exoticfruits", "organicfruits"],
        productRemaining: 40,
        baseprice: 85,
        costing: [
            {
                discount: 80,
                quantity: 3,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Vaishnavi Avocado",
        description: "Yummy and Healthy",
        categories: ["avocados", "exoticvegetables"],
        productRemaining: 100,
        baseprice: 110,
        costing: [
            {
                discount: 100,
                quantity: 10,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Carrots",
        description: "Carrots grown organically very sweet and fresh",
        categories: ["carrot", "organicvegetables"],
        productRemaining: 140,
        baseprice: 45,
        costing: [
            {
                discount: 40,
                quantity: 4,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Onions",
        description: "Red onions very sweet and fresh",
        categories: ["onions"],
        productRemaining: 200,
        baseprice: 65,
        costing: [
            {
                discount: 60,
                quantity: 4,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Tomatoes",
        description: "Red big tomatoes grown organically ripe and ready to buy",
        categories: ["tomatoes", "organicvegetables"],
        productRemaining: 200,
        baseprice: 40,
        costing: [
            {
                discount: 35,
                quantity: 5,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Vaishnavi Cabbage",
        description: "Yummy healthy Cabbage",
        categories: ["cabbage", "organicvegetables"],
        productRemaining: 140,
        baseprice: 55,
        costing: [
            {
                discount: 50,
                quantity: 5,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
    },

    {
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot...",
        title: "Isha Delicious Cabbage",
        description: "Yummy and healthy",
        categories: ["cabbage", "organicvegetables"],
        productRemaining: 160,
        baseprice: 45,
        costing: [
            {
                discount: 40,
                quantity: 4,
            }
        ],
        rating: 3.5,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
    }


]



for (let dben of products) {
    request.post({
        headers: { 'content-type': 'application/javascript' },
        url: 'http://localhost:5001/v1/products/product',
        body: dben
    }, function (error, response, body) {
        console.log(error);
    });
}


