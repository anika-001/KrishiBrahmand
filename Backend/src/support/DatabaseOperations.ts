import * as mongoose from 'mongoose';
export class DatabaseOperations{
    public static FindOneOp(name: mongoose.Model<mongoose.Document<any>>, body: any): Promise<any>{
        return new Promise((resolve, reject) => {
            name.findOne(body).then(res => {
                resolve(res);
             })
             .catch(e => {
                 reject(e);
             })
        })    
    }

    public static FindOp(name: mongoose.Model<mongoose.Document<any>>, body: any){
        name.find(body).then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        })
    }

    public static FindandDeleteOneOp(name: mongoose.Model<mongoose.Document<any>>, body: any): Promise<any>{
        return new Promise((resolve, reject) => {
            name.findOneAndDelete(body).then(res => {
                resolve(res);
             })
             .catch(e => {
                 reject(e);
             })
        })    
    }

    public static DeleteOneOp(name: mongoose.Model<mongoose.Document<any>>, body: any): Promise<any>{
        return new Promise((resolve, reject) => {
            name.deleteOne(body).then(res => {
                resolve(res);
             })
             .catch(e => {
                 reject(e);
             })
        })
    }

    public static DeleteOp(name: mongoose.Model<mongoose.Document<any>>, body: any): Promise<any>{
        return new Promise((resolve, reject) => {
            name.deleteMany(body).then(res => {
                resolve(res);
             })
             .catch(e => {
                 reject(e);
             })
        })
    }


    public static SaveOp(name: mongoose.Model<mongoose.Document<any>>, body: any): Promise<mongoose.Document<any>>{
        return new Promise((resolve, reject) => {
            let temp = new name(body);
            temp.save().then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e);
            })
        })
    }

    public static UpdateOneOp(name: mongoose.Model<mongoose.Document<any>>, query: any, body: any): Promise<mongoose.Document<any>>{
        return new Promise((resolve, reject) => {
            name.updateOne(query, body).then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e);
            })
        })
    }
}