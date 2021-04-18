import { I3_0, I3_1, I3_2, IGetResponse, IPostResponse, itemreturn } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import { product } from '../DatabaseSchemaModels/Product';
import { users } from '../DatabaseSchemaModels/UserData';
import { pickup } from '../DatabaseSchemaModels/Pickup';
import { DatabaseOperations } from '../support/DatabaseOperations';
import { pastorders } from '../DatabaseSchemaModels/PastOrders';
import { bids } from '../DatabaseSchemaModels/Bids';


export class ProductsModel {

  static categories = {
    "fruits": ["apple", "banana", "pear", "strawberry", "blueberry", "cherry", "raspberry", "orange", "lemon", "mosambi", "kiwi", "grapes", "chickoo", "pomegranate", "mangoes", "watermelon", "muskmelon", "sunmelon", "plum", "peach", "fig", "apricot", "dryfruits", "dryseeds", "otherfruits"],
    "dailyvegetables": ["onions", "potatoes", "tomatoes", "beans", "brinjal", "okra", "broccoli", "cabbage", "cauliflower", "karela", "dodka", "lauki", "parwal", "tinda", "pumpkin", "drumstick", "chillies", "garlic", "lemon", "ginger", "cucumber", "redcapsicum", "yellowcapsicum", "greencapsicum", "peas", "corn", "beetroot", "turnip", "radish", "carrot", "otherdailyvegetables"],
    "exoticvegetables": ["avacados", "pepper", "broccoli", "zucchini", "asparagus", "artichoke", "celery", "fennel", "leek", "edibleflowers", "lettuce", "leafyveg", "mushrooms", "otherexoticvegetables"],
    "organic": ["organicfruits", "organicvegetables"],
    "exotic": ["exoticfruits", "exoticvegetables"],
    "herbsandseasoning": ["lemon", "ginger", "garlic", "indianherbs", "otherherbsandseasoning"]
  }

  /**
  * The method getCategories. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */
  public static getCategories(body: any): IPostResponse {
    let resp: IPostResponse = { "statusCode": StatusCodes.INTERNAL_SERVER_ERROR, "message": "NOT IMPLEMENTED" };


    return resp;
  }

  /**
  * The method getItems. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */
  public static getItems(category: string, uid: string): Promise<IGetResponse> {

    if (uid) {
      return new Promise((resolve, reject) => {
        product.find({ uid: uid }).then(val => {
          return resolve({ "statusCode": 0, "message": "Items retrieved", "payload": val })
        })
          .catch(e => {
            console.log(e)
            return reject({ "statusCode": 2, "message": e, "payload": "" })
          })
      })
    }

    else {
      var id: "exoticvegetables" | "fruits" | "dailyvegetables" | "organic" | "exotic" | "herbsandseasoning";
      if (category === "fruits") id = "fruits";
      if (category === "exoticvegetables") id = "exoticvegetables";
      if (category === "dailyvegetables") id = "dailyvegetables";
      if (category === "organic") id = "organic";
      if (category === "exotic") id = "exotic";
      if (category === "herbsandseasoning") id = "herbsandseasoning";
      // {"$in": [{name: "orange"}, {name: "kiwi"}, {name: "mangoes"}, {name: "exoticfruits"}]}
      return new Promise((resolve, reject) => {
        product.find({ "categories.name": { "$in": ProductsModel.categories[id] } }).then(val => {
          resolve({ "statusCode": 0, "message": "Items retrieved", "payload": val })
        })
          .catch(e => {
            console.log(e)
            reject({ "statusCode": 2, "message": e, "payload": "" })
          })
      })
    }

  }

  public static getFilterItems(category: Array<any>, uid?: string): Promise<IGetResponse> {
    console.log(category, uid);
    let mquery: { [key: string]: any } = { "categories.name": { "$in": category } }
    if (uid) {
      mquery.uid = uid;
    }
    // {"$in": [{name: "orange"}, {name: "kiwi"}, {name: "mangoes"}, {name: "exoticfruits"}]}
    return new Promise((resolve, reject) => {
      product.find(mquery).then(val => {
        console.log(val)
        resolve({ "statusCode": 0, "message": "Items retrieved", "payload": val })
      })
        .catch(e => {
          console.log(e)
          reject({ "statusCode": 2, "message": e, "payload": "" })
        })
    })
  }

  public static ifuserhaspurchased(uid: string, prodid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      pastorders.findOne({ uid: uid, "Orders.itemsList.itemId": { "$regex": prodid, "$options": "i" } }).then(val => {
        if (val) resolve(true);
        else resolve(false);
      })
        .catch(e => {
          reject(e);
        })
    })
  }
  public static getItem(id: string, uid?: string): Promise<IGetResponse> {
    return new Promise((resolve, reject) => {
      product.findById(id).then(val => {
        let retvalue: any = val;
        let itemReturn: itemreturn = {
          uid: retvalue.uid!,
          image: retvalue.image!,
          description: retvalue.description!,
          title: retvalue.title!,
          categories: retvalue.categories!,
          costing: retvalue.costing!,
          productRemaining: retvalue.productRemaining!,
          rating: retvalue.rating!,
          comments: retvalue.comments!,
          sellername: '',
          baseprice: retvalue.baseprice!,
          ratingpermission: false
        };
        users.findById(retvalue.uid).then(val => {
          let user: any = val;
          itemReturn["sellername"] = user.name;
          // for (let i in itemReturn) console.log(itemReturn[i]);
          // this.ifuserhaspurchased().then()
          if (uid != undefined) {
            this.ifuserhaspurchased(uid, id).then(val => {
              if (val) itemReturn["ratingpermission"] = true;
              else itemReturn["ratingpermission"] = false;
              resolve({ "statusCode": 0, "message": "Item retrieved", "payload": itemReturn })

            })
              .catch(e => {
                reject({ "statusCode": 2, "message": e, "payload": "" })
              })
          }
          else resolve({ "statusCode": 0, "message": "Item retrieved", "payload": itemReturn })
        })

          .catch(e => {
            console.log(e)
            reject({ "statusCode": 2, "message": e, "payload": "" })
          })
      })
        .catch(e => {
          console.log(e)
          reject({ "statusCode": 2, "message": e, "payload": "" })
        })
    })
  }


  /**
  * The method addProduct. undefined
  *
  * @param body of type any
  * @returns IPostResponse
  */
  public static addProduct(body: I3_0): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      if (body?.id) {
        let products;
        DatabaseOperations.FindOneOp(product, { _id: body.id })
          .then((val) => {
            products = val; DatabaseOperations.UpdateOneOp(product, { _id: body.id },
              { "$set": { description: (body.description != '' && body?.description) ? body.description : products.ProductId, title: (body.title != '' && body?.title) ? body.title : products.title, categories: (body.categories != null && body?.categories) ? body.categories : products.categories, costing: (body.costing != null && body?.costing) ? body.costing : products.costing, productRemaining: (body.productRemaining != null && body?.productRemaining) ? body.productRemaining : products.productRemaining, baseprice: (body.baseprice != null && body?.baseprice) ? body.baseprice : products.baseprice, image: (body.image != null && body?.image) ? body.image : products.image } })
          })
          .then((val) => { resolve({ statusCode: 0, message: "Product updated" }); })
          .catch(e => { reject({ statusCode: 2, message: e }); })
      }

      else {
        let products = new product(body);
        products.save().then(data => {
          let pickupadd = new pickup({ productId: data._id, pickupaddress: body.pickupaddress })
          pickupadd.save().then(res => {
            resolve({ statusCode: 0, message: "Product added" });
          }).catch(e => {
            console.log(e);
            reject({ statusCode: 2, message: e });
          })

        })
          .catch(e => {
            reject({ statusCode: 2, message: e });
          })
      }
    })
  }

  public static addabid(body: I3_2): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {

      bids.findOneAndUpdate({ uid: body.uid, productId: body.productId }, body).then(val => {
        if (val) resolve({ statusCode: 0, message: "Bid added" });
        else {
          let bid = new bids(body);
          bid.save().then(val => {
            resolve({ statusCode: 0, message: "Bid added" });
          })
            .catch(e => {
              reject({ statusCode: 2, message: e });
            })
        }
      })
        .catch(e => {
          reject({ statusCode: 2, message: e });
        })

    })
  }

  public static getProduct(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      product.find({ uid: id }).then(res => {
        return resolve(res);
      })
        .catch(e => {
          return reject(e);
        })
    })
  }


  public static getbid(id: String, role: String): Promise<IGetResponse>{
    return new Promise((resolve, reject) => {
      if(role == "farmer"){
        this.getProduct(id).then(res => {
          let arr: any = [];
          for (let x of res) {
            arr.push(x._id);
          }
          bids.find({productId: { "$in": arr }}).then((val: any) => {
            let s1 = new Set()
            for(let x of val){
              s1.add(x.productId);
            }
            resolve({ "statusCode": 0, "message": "Bid retrieved", "payload": Array.from(s1) })
          })
          .catch(e => {
            reject({ "statusCode": 2, "message": e, "payload": "" })
          })
        })
        .catch(e => {
          reject({ "statusCode": 2, "message": e, "payload": "" })
        })
      }

      else if(role == "consumer"){
        bids.find({uid: id}).then(val => {
          resolve({ "statusCode": 0, "message": "Bid retrieved", "payload": val })
        })
        .catch(e => {
          reject({ "statusCode": 2, "message": e, "payload": "" })
        })
      }

      else{
        bids.find({productId: id}).then(val => {
          resolve({ "statusCode": 0, "message": "Bid retrieved", "payload": val })
        })
        .catch(e => {
          reject({ "statusCode": 2, "message": e, "payload": "" })
        })
      }
    })

  }


  public static addreview(body: I3_1): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {
      product.findById(body.id).then((prod: any) => {
        product.updateOne({ _id: body.id, "comments.uid": body.uid }, { "$set": { "comments.$.content": body.content, "comments.$.rating": body.rating, "comments.$.date": body.date, "comments.$.email": body.email } }).then(val => {
          if (val.nModified == 0 && val.n == 0) {
            product.updateOne({ _id: body.id }, { $push: { comments: body } }).then(val => {
              product.updateOne({ _id: body.id }, { rating: (Number(Number(body.rating) + Number(prod.rating)) / Number(prod.noOfUsers)) }).then(val => {
                resolve({ statusCode: 0, message: "Rating added" });
              })
                .catch(e => {
                  reject({ statusCode: 2, message: e });
                })

            })
              .catch(e => {
                reject({ statusCode: 2, message: e });
              })
          }
          else {
            let currrate = 0;
            for (let x of prod.comments) {
              if (x.uid == body.uid) {
                currrate = x.rating;
                break;
              }
            }
            console.log(prod.rating, prod.noOfUsers, currrate, body.rating)
            product.updateOne({ _id: body.id }, { rating: Number(Number(Number(prod.rating) * Number(prod.noOfUsers) - Number(currrate) + Number(body.rating)) / Number(prod.noOfUsers)) }).then(val => {
              resolve({ statusCode: 0, message: "Rating added" });
            })
              .catch(e => {
                reject({ statusCode: 2, message: e });
              })
          }
        })
          .catch(e => {
            reject({ statusCode: 2, message: e });
          })
      })
        .catch(e => {
          reject({ statusCode: 2, message: e });
        })
    })
  }

}


export let productsmodel = new ProductsModel();