export interface IPostResponse {
    "statusCode": number; "message": any;
}

export interface IGetResponse {
    "statusCode": number;
    "message": any;
    "payload": any;
}

export interface I0_1 {
    email: string;
    password: string;
    // WIP
}

// export interface accountuser{
//     email: string;
//     password: string;
// }
export interface I0_2 {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    phone?: string;
    address?: string;
    district?: string;
    state?: string;
    pincode?: string;
    // WIP
}
export interface I0_3 {
    token: string;
    // WIP
}
export interface I0_4 {
    token: string;
    password: string;
    // WIP
}

export interface I0_5{
    uid: string,
    newaddress: {
        addresstitle: string,
        address: string,
        district: string;
        state: string;
        pincode: string;
    }
}

export interface I1_1 {
    type: string;
    email: string;
}

export interface I2_2 {
    state: string | undefined;
}

export interface I3_0{
    // id: "exoticvegetables" | "fruits" | "dailyvegetables" | "orgranic" | "exotic" | "herbsandsesoning";
    id?: String,
    image: String,
    description: String,
    title: String,
    categories: [String],
    costing: [{
        discount: Number,
        quantity: Number
    }],
    productRemaining: Number,
    baseprice: Number,
    rating: Number,
    noOfUsers: Number,
    comments: [{
        uid: String,
        content: String
    }],
    uid: string
    pickupaddress: {
        address: String,
        state: String,
        district: String,
        pincode: String

    }
}

export interface itemreturn{
    // id: "exoticvegetables" | "fruits" | "dailyvegetables" | "orgranic" | "exotic" | "herbsandsesoning";
    image: String,
    description: String,
    title: String,
    categories: [String],
    costing: [{
        discount: Number,
        quantity: Number
    }],
    productRemaining: Number,
    baseprice: Number,
    rating: Number,
    comments: [{
        uid: String,
        content: String
    }],
    sellername: string,
    uid: string,
    ratingpermission: Boolean
}

export interface I4_0 {
    uid: string,
    itemsList: {
        productId: string,
        quantity: number
    }
    // WIP
}
export interface I4_1 {
    uid: string,
    productId: string,
    // WIP
}

export interface I4_2 {
    OrderId: String,

    itemsList: [{
        itemId: String,
        quantity: Number,
        tracking: String,
        total: Number,
        discount: Number,
    }],

    deliveryaddress: {
        address: String,
        state: String,
        district: String,
        pincode: String

    },
    
    payment: String,
    // WIP
}


export interface I5_0 {
    trackingId: String,
    DeliveryPerson?:String,
    DeliveryBy?: String,
    tracking?: String
    deliveredon?: Date
    // WIP
}

export interface I5_1 {
    ReqId: String,
    ProductId?: String,
    quantity?: String,
    pickupPerson?:String,
    pickupDate?: Date
    status?: String
    // WIP
}

export interface I5_2{
    
}


export interface I8 {
    email?: string;
    // WIP
}
export interface I9 {
    email?: string;
    token?: string;
    // WIP
}
export interface I10 {
    // WIP
}
export interface I11 {
    // WIP
}
export interface I12 {
    // WIP
}
export interface I13 {
    // WIP
}
export interface I14 {
    // WIP
}
export interface I15 {
    uid?: string;
    description?: string;
    title?: string;
    costing?: string[];
    productRemaining?: number;
    rating?: number;
    noOfUsers?: number;
    comments?: string[];
    state?: string;
    // WIP
}
export interface I16 {
    // WIP
}
