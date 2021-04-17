import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { AngularFireDatabase } from '@angular/fire/database';
//import * as firebase from 'firebase/app';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../../../../Major Project - Krishi Kalyan/mainwebsite/FrontEnd/Krishi-Bazaar/src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-products-statistics',
  templateUrl: './products-statistics.component.html',
  styleUrls: ['./products-statistics.component.scss']
})

export class ProductsStatisticsComponent implements OnInit {

  categoriesJson = [
    {
      "id": "fruits", "name": "Fruits", "Showcategory": false, "value": [
        {
          "Name": "Apple Banana Pear", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Apple", "id": "apple", "checked": false }, { "name": "Banana", "id": "banana", "checked": false },
          { "name": "Pear", "id": "pear", "checked": false }]
        },
        {
          "Name": "Berries", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Strawberry", "id": "strawberry", "checked": false }, { "name": "Blueberry", "id": "blueberry", "checked": false },
          { "name": "Cherry", "id": "cherry", "checked": false }, { "name": "Raspberry", "id": "raspberry", "checked": false }]
        },
        {
          "Name": "Citrus Fruits", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Orange", "id": "orange", "checked": false }, { "name": "Lemon", "id": "lemon", "checked": false },
          { "name": "Mosambi", "id": "mosambi", "checked": false }, { "name": "Kiwi", "id": "kiwi", "checked": false }]
        },
        {
          "Name": "Grapes Chickoo Pomegranate", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Grapes", "id": "grapes", "checked": false },
          { "name": "Chickoo", "id": "chickoo", "checked": false }, { "name": "Pomegranate", "id": "pomegranate", "checked": false }]
        },
        {
          "Name": "Mangoes", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Mangoes", "id": "mangoes", "checked": false }]
        },
        {
          "Name": "Melons", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Watermelon", "id": "watermelon", "checked": false },
          { "name": "Muskmelon", "id": "muskmelon", "checked": false }, { "name": "Sunmelon", "id": "sunmelon", "checked": false }]
        },
        {
          "Name": "Plums Peaches Figs Apricots", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Plums", "id": "plum", "checked": false }, { "name": "Peach", "id": "peach", "checked": false },
          { "name": "Fig", "id": "fig", "checked": false }, { "name": "Apricot", "id": "apricot", "checked": false }]
        },
        {
          "Name": "Dry Fruits and Dry seeds", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Dry Fruits", "id": "dryfruits", "checked": false },
          { "name": "Dry Seeds", "id": "dryseeds", "checked": false }]
        },
        { "Name": "Other Fruits", "id": "otherfruits", "Havesubsubcategories": false, "Showsubcategories": false, "checked": false, "sub": [] },
      ]
    },

    {
      "id": "dailyvegetables", "name": "Daily Vegetables", "Showcategory": false, "value": [
        {
          "Name": "Onions Potatoes Tomatoes", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Onion", "id": "onions", "checked": false },
          { "name": "Potato", "id": "potatoes", "checked": false }, { "name": "Tomato", "id": "tomatoes", "checked": false }]
        },
        {
          "Name": "Beans Brinjal Okra", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Beans", "id": "beans", "checked": false },
          { "name": "Brinjal", "id": "brinjal", "checked": false }, { "name": "Okra", "id": "okra", "checked": false }]
        },
        {
          "Name": "Broccoli Cabbage Cauliflower", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Broccoli", "id": "broccoli", "checked": false },
          { "name": "Cabbage", "id": "cabbage", "checked": false }, { "name": "Cauliflower", "id": "cauliflower", "checked": false }]
        },
        {
          "Name": "Gourd Pumpkin Drumstick", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Bitter Gourd - Karela", "id": "karela", "checked": false, },
          { "name": "Ridge Gourd - Dodka", "id": "dodka", "checked": false }, { "name": "Bottle Gourd - Lauki", "id": "lauki", "checked": false, },
          { "name": "Snake Gourd - Parwal", "id": "parwal", "checked": false }, { "name": "Tinda", "id": "tinda", "checked": false },
          { "name": "Pumpkin", "id": "pumpkin", "checked": false }, { "name": "Drumstick", "id": "drumstick", "checked": false }]
        },
        {
          "Name": "Chillies Garlic Lemon Ginger", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Chillies", "id": "chillies", "checked": false, }, { "name": "Garlic", "id": "garlic", "checked": false, },
          { "name": "Lemon", "id": "lemon", "checked": false, }, { "name": "Ginger", "id": "ginger", "checked": false, }]
        },
        {
          "Name": "Cucumber Capsicum", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Cucumber", "id": "cucumber", "checked": false, },
          { "name": "Red Capsicum", "id": "redcapsicum", "checked": false, },
          { "name": "Yellow Capsicum", "id": "yellowcapsicum", "checked": false, },
          { "name": "Green Capsicum", "id": "greencapsicum", "checked": false, }]
        },
        {
          "Name": "Peas Corn", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Peas", "id": "peas", "checked": false, }, { "name": "Corn", "id": "corn", "checked": false, }]
        },
        {
          "Name": "Root Vegetables", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Beetroot", "id": "beetroot", "checked": false, }, { "name": "Carrot", "id": "carrot", "checked": false, },
          { "name": "Turnip", "id": "turnip", "checked": false, }, { "name": "Radish", "id": "radish", "checked": false, }]
        },
        {
          "Name": "Other Daily Vegetables", "id": "otherdailyvegetables", "Havesubsubcategories": false,
          "checked": false, "Showsubcategories": false, "sub": []
        },
      ]
    },

    {
      "id": "exoticvegetables", "name": "Exotic Vegetables", "Showcategory": false, "value": [
        {
          "Name": "Avocados Peppers", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Avocados", "id": "avocados", "checked": false, },
          { "name": "Pepper", "id": "pepper", "checked": false, }]
        },
        {
          "Name": "Broccoli Zucchini", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Broccoli", "id": "broccoli", "checked": false, },
          { "name": "Zucchini", "id": "zucchini", "checked": false, }]
        },
        {
          "Name": "Asparagus Artichokes", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Asparagus", "id": "asparagus", "checked": false, },
          { "name": "Artichoke", "id": "artichoke", "checked": false, }]
        },
        {
          "Name": "Celery Fennel Leeks", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Celery", "id": "celery", "checked": false, },
          { "name": "Fennel", "id": "fennel", "checked": false, }, { "name": "Leek", "id": "leek", "checked": false, }]
        },
        {
          "Name": "Edible Flowers", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Edible Flowers", "id": "edibleflowers", "checked": false, }]
        },
        {
          "Name": "Lettuce Leafy Vegetables", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Lettuce", "id": "lettuce", "checked": false, },
          { "name": "Leafy Vegetables", "id": "leafyveg", "checked": false, }]
        },
        {
          "Name": "Mushrooms", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Mushrooms", "id": "mushrooms", "checked": false, }]
        },
        {
          "Name": "Other Exotic Vegetables", "id": "otherexoticvegetables", "Havesubsubcategories": false
          , "checked": false, "Showsubcategories": false, "sub": []
        },
      ]
    },

    {
      "id": "organic", "name": "Organic", "Showcategory": false, "value": [
        {
          "Name": "Organic Fruits", "id": "organicfruits", "Havesubsubcategories": false, "Showsubcategories": false,
          "checked": false, "sub": []
        },
        {
          "Name": "Organic Vegetables", "id": "organicvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
          "checked": false, "sub": []
        },
      ]
    },

    {
      "id": "exotic", "name": "Exotic", "Showcategory": false, "value": [
        {
          "Name": "Exotic Fruits", "id": "exoticfruits", "Havesubsubcategories": false, "Showsubcategories": false,
          "checked": false, "sub": []
        },
        {
          "Name": "Exotic Vegetables", "id": "exoticvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
          "checked": false, "sub": []
        },
      ]
    },

    {
      "id": "herbsandseasoning", "name": "Herbs and Seasoning", "Showcategory": false, "value": [
        {
          "Name": "Lemon Ginger Garlic", "Havesubsubcategories": true, "Showsubcategories": false,
          "sub": [{ "name": "Lemon", "id": "lemon", "checked": false }, { "name": "Ginger", "id": "ginger", "checked": false },
          { "name": "Garlic", "id": "garlic", "checked": false }]
        },
        {
          "Name": "Indian Herbs", "id": "indianherbs", "Havesubsubcategories": false, "Showsubcategories": false,
          "checked": false, "sub": []
        },
        {
          "Name": "Other Herbs and Seasoning", "id": "otherherbsandseasoning", "Havesubsubcategories": false,
          "Showsubcategories": false, "checked": false, "sub": []
        },
      ]
    }];

  selectedPickupAddress: any;
  addressesList: any[] = [];

  error: boolean = false;
  errormessage: string = "";
  error500: boolean = false;

  /* Details Tab validation variables */
  image: boolean = false;
  messageimage: string = "";
  title: boolean = false;
  messagetitle: string = "";
  description: boolean = false;
  messagedescription: string = "";
  categories: boolean = false;
  messagecategories: string = "";
  productremaining: boolean = false;
  messageproductremaining: string = "";

  /* Costing Tab validation variables */
  baseprice: boolean = false;
  messagebaseprice: string = "";
  // costing: boolean = false;
  // messagecosting: string = "";
  discount: boolean = false;
  messagediscount: string = "";
  quantity: boolean = false;
  messagequantity: string = "";

  /* Pickup Address Tab validation variables */
  addresstitle: boolean = false;
  messageaddresstitle: string = "";
  pickupaddress: boolean = false;
  messagepickupaddress: string = "";
  pickuppincode: boolean = false;
  messagepickuppincode: string = "";
  district: boolean = false;
  messagedistrict: string = "";
  state: boolean = false;
  messagestate: string = "";

  selectedState: string = "";
  selectedDistrict: string = "";

  pickupstate: boolean = false;
  messagepickupstate: string = "";
  pickupdistrict: boolean = false;
  messagepickupdistrict: string = "";

  existingadd: boolean = false;
  messageexistingadd: string = "";

  /* Tab validation variables */
  details: boolean = true;
  productcosting: boolean = false;
  address: boolean = false;
  tabChange: string = "Next";
  user: any;
  item: any;

  finalImageURL: any;

  totalCostingIndex: number = 0;

  prodId: any;

  url = "./assets/images/previewImage.jpg";

  urls = {
    'state': "http://localhost:5001/v1/location/states",
    'district': "http://localhost:5001/v1/location/states/districts",
    'address': "http://localhost:5001/v1/users/address",
    'item': 'http://localhost:5001/v1/products/categories/items/item',
  }

  states: any;
  districts: any;

  newAddress = {
    "uid": "",
    "newaddress": {
      "addresstitle": "",
      "address": "",
      "district": "",
      "state": "",
      "pincode": "",
    }
  }

  imageEvent: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private httpClient: HttpClient, private db: AngularFireDatabase, private as: AuthService,
    private router: Router, private cs: CookieService) { }

  ngOnInit(): void {

    if (this.cs.check('role')) {
      if (this.cs.get('role') == 'consumer') {
        this.router.navigate(['/home']);
      }

    }

    this.getStates();
    this.as.getUser().subscribe(res => {
      this.user = res;
      //console.log(this.user);
      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      this.newAddress.uid = this.user.payload.uid;
      this.existingAddress();
    })

    this.prodId = this.route.snapshot.queryParams['id'];
    this.defaultApiCall();

  }


  form = this.fb.group({
    image: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    categories: this.fb.array([]),
    productRemaining: ['', Validators.required],
    baseprice: ['', Validators.required],
    costing: this.fb.array([
      this.addCostingFormGroup()
    ]),
    rating: [3.5],
    noOfUsers: [0],
    comments: this.fb.array([]),
  })

  tempform = this.fb.group({
    addresstitle: ['', Validators.required],
    pickupaddress: ['', Validators.required],
    pickuppincode: ['', Validators.required],
  })

  defaultApiCall() {
    this.httpClient.get<any>(this.urls.item + "?id=" + this.prodId).subscribe(
      (res) => {
        console.log(res);
        this.item = res.payload;
        console.log("item");
        console.log(this.item);

        this.form.controls["title"].setValue(this.item.title);
        this.form.controls["description"].setValue(this.item.description);
        this.form.controls["productRemaining"].setValue(this.item.productRemaining);
        this.form.controls["baseprice"].setValue(this.item.baseprice);
        this.url = this.item.image;
        this.finalImageURL = this.url;
        console.log(this.form.value);
        //this.form.controls["image"].setValue(this.url);

      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
        }
      }
    );
  }

  onChange(x: any, e: any) {
    let isChecked: boolean = e.target.checked;
    let name: string = e.target.id;
    const catArray = <FormArray>this.form.controls.categories;
    x.checked = !x.checked;
    //console.log(name);
    if (isChecked) {
      catArray.push(new FormControl({ name }));
      //console.log(catArray);
      console.log("categories: ");
      console.log(this.form.controls.categories.value);
    }
    else {
      let index = catArray.controls.findIndex(x => x.value.name == (name));
      //console.log(name+" is to be removed at index "+index);
      catArray.removeAt(index);
      //console.log(catArray);
      console.log("categories: ");
      console.log(this.form.controls.categories.value);
    }
  }

  addCostingFormGroup() {
    return this!.fb!.group({
      discount: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  getCostingControls() {
    return (this.form.get('costing') as FormArray).controls;
  }

  addCostingButton() {
    (<FormArray>this.form.get('costing')).push(this.addCostingFormGroup());
    ++this.totalCostingIndex;
  }

  removeCostingButton() {
    (<FormArray>this.form.get('costing')).removeAt(this.totalCostingIndex);
    --this.totalCostingIndex;
    //console.log(this.totalCostingIndex);
  }

  submitValidate() {
    var flag = 'true';
    this.error = false;

    if (flag == 'true') {
      console.log("success");
      return true;
    }

    else {
      return false;
    }

  }

  detailsValidate() {
    var flag = 'true';
    this.error = false;

    this.image = false;
    this.title = false;
    this.description = false;
    this.categories = false;
    this.productremaining = false;

    //console.log(this.form.get("image")?.value == "");
    if (this.url == "") {
      console.log("IMAGE ERROR");
      this.image = true;
      this.messageimage = "Invalid image. Please upload an image."
      flag = 'false';
    }

    if (this.form.get("title")?.value == "" || !(/^[a-zA-Z][a-zA-Z ]{2,20}$/.test(this.form.get("title")?.value))) {
      this.title = true;
      this.messagetitle = "Invalid title. A title starts with and contains only Alphabets and has 20 characters."
      flag = 'false';
    }

    if (this.form.get("description")?.value == "" || !(/^[\.a-zA-Z0-9,!? ]{10,100}$/.test(this.form.get("description")?.value))) {
      this.description = true;
      this.messagedescription = "Invalid description. A description starts with and contains only Alphabets and has 10 to 100 characters."
      flag = 'false';
    }


    if ((this.form.get("productRemaining")?.value == "" || !(/^[1-9]\d*$/.test(this.form.get("productRemaining")?.value)))
      || (this.form.get("productRemaining")?.value > 1000)) {
      this.productremaining = true;
      this.messageproductremaining = "Invalid product remaining. It must be a positive integer less than 1001."
      flag = 'false';
    }

    if (this.form.get("categories")?.value.length == 0) {
      console.log("CATEGORIES ERROR");
      this.categories = true;
      this.messagecategories = "Invalid categories. At least one category must be selected."
      flag = 'false';
    }

    if (flag == 'true') {
      console.log("details tab has no error. success");
      return true;
    }

    else {
      console.log("details tab has error. failure");
      return false;
    }
  }

  costingValidate() {

    var flag = 'true';
    this.error = false;

    this.baseprice = false;
    // this.costing = false;
    this.discount = false;
    this.quantity = false;

    if (this.form.get("baseprice")?.value == "" || !(/^[1-9]\d*$/.test(this.form.get("baseprice")?.value))) {
      this.baseprice = true;
      this.messagebaseprice = "Invalid baseprice. A baseprice must be a positive integer."
      flag = 'false';
    }

    if (this.productremaining || this.form.get("productRemaining")?.value == "") {
      this.quantity = true;
      this.messagequantity = "Invalid. Kindly fill Details Tab"
      flag = 'false';
    }
    else {
      for (let a of (this.form.get("costing")?.value)) {
        if ((a.discount == "" || !(/^[1-9]\d*$/.test(a.discount)))
          || (a.discount >= 100)) {
          console.log("DISCOUNT ERROR");
          this.discount = true;
          this.messagediscount = "Invalid discount. Discount% must be less than 100."
          flag = 'false';
        }

        if ((a.quantity == "" || !(/^[1-9]\d*$/.test(a.quantity)))
          || (a.quantity > this.form.get("productRemaining")?.value)) {
          console.log("QUANTITY ERROR");
          this.quantity = true;
          this.messagequantity = "Invalid quantity. Quantity must be less than total produce."
          flag = 'false';
        }

      }
    }

    if (flag == 'true') {
      console.log("success");
      return true;
    }

    else {
      return false;
    }

  }

  addressValidate() {

    var flag = 'true';
    this.error = false;
    this.addresstitle = false;
    this.pickupaddress = false;
    this.pickuppincode = false;
    this.district = false;
    this.state = false;

    if (this.tempform.get("addresstitle")?.value == "" || !(/^[a-zA-Za-zA-Z0-9()\-,. ]+$/.test(this.tempform.get("addresstitle")?.value))) {
      this.addresstitle = true;
      this.messageaddresstitle = "Invalid Address Title. It is badly formatted."
      flag = 'false';
    }

    if (this.tempform.get("pickupaddress")?.value == "" || !(/^[a-zA-Za-zA-Z0-9()\-,. ]+$/.test(this.tempform.get("pickupaddress")?.value))) {
      this.pickupaddress = true;
      this.messagepickupaddress = "Invalid Address. Address is badly formatted."
      flag = 'false';
    }

    if (this.tempform.get("pickuppincode")?.value == "" || !(/^\d{6}$/.test(this.tempform.get("pickuppincode")?.value))) {
      this.pickuppincode = true;
      this.messagepickuppincode = "Invalid Pincode. Pincode is badly formatted."
      flag = 'false';
    }

    if (this.selectedState == "") {
      this.pickupstate = true;
      this.messagepickupstate = "Invalid pickup state. State cannot be empty";
      flag = 'false';
    }

    if (this.selectedDistrict == "") {
      this.pickupdistrict = true;
      this.messagepickupdistrict = "Invalid pickup district. District cannot be empty";
      flag = 'false';
    }

    if (flag == 'true') {
      console.log("success");
      return true;
    }

    else {
      return false;
    }
  }

  imageUploadPrev(e: any) {
    this.imageEvent = e;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        //this.form.controls["image"].setValue(this.url);
        //console.log(this.url);
      }
    }
    else {
      console.log("No image uploaded")
    }

  }

  imageUpload(e: any) {

    return new Promise((resolve, reject) => {
      if (e.target.files) {

        console.log("image: ");
        console.log(e.target.files)
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          //this.form.controls["image"].setValue(this.url);
          //console.log(this.url);
        }

        const file = e.target.files[0];
        console.log("Storage file name: ", file.name);

        var metadata = {
          contentType: file.type
        };

        var storageRef: firebase.storage.Reference = firebase.storage().ref('products/images/' + file.name);

        var uploadTask = storageRef.put(file, metadata);
        console.log("Uploading ", file.name);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            reject(error.code);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              //this.form.controls["image"].setValue(downloadURL);
              this.finalImageURL = downloadURL;
              resolve(null);
              console.log(this.form.value);
            }).catch(err => {
              reject(err);
            });

          }
        );

      }
      else {
        console.log("No image uploaded")
      }

    })
  }

  calcPrice(discp: any) {
    let basep = this.form.controls.baseprice.value;
    if (basep == 0)
      return 0;
    return (100 - discp) * basep / 100;
  }

  // toggle functions for tabs 
  detailsToggle(val: any) {
    this.form.controls["image"].setValue("");
    if (this.details == true) {
      return;
    }
    this.details = !val;
    this.productcosting = false;
    this.address = false;
    this.tabChange = "Next";
    console.log(this.form.value);

  }

  productcostingToggle(val: any) {
    if (this.productcosting == true) {
      return;
    }
    this.productcosting = !val;
    this.details = false;
    this.address = false
    this.tabChange = "Next";
  }

  addressToggle(val: any) {
    if (this.address == true) {
      return;
    }
    this.address = !val;
    this.details = false;
    this.productcosting = false;
    this.tabChange = "Submit";

  }

  getStates() {
    this.httpClient.get<any>(this.urls.state).subscribe(
      (res) => {
        //console.log(res);
        this.states = res.payload;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add item. Please contact customer service or try again later.";
        }
      }
    );
  }

  getDistricts(state: String) {
    //console.log(state);
    this.httpClient.get<any>(this.urls.district + "?state=" + state).subscribe(
      (res) => {
        //console.log(res);
        this.districts = res.payload.districts;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add item. Please contact customer service or try again later.";
        }
      }
    );
  }

  addAddress() {

    if (!this.addressValidate()) {
      // console.log(this.selectedState);
      // console.log(this.selectedDistrict);
      console.log("address invalid");
      return;
    }
    this.newAddress.newaddress.addresstitle = this.tempform.get("addresstitle")?.value;
    this.newAddress.newaddress.pincode = this.tempform.get("pickuppincode")?.value;
    this.newAddress.newaddress.address = this.tempform.get("pickupaddress")?.value;
    this.newAddress.newaddress.district = this.selectedDistrict;
    this.newAddress.newaddress.state = this.selectedState;
    this.httpClient.post<any>(this.urls.address, this.newAddress).subscribe(
      (res) => {
        this.tempform.controls.addresstitle.setValue('');
        this.tempform.controls.pickupaddress.setValue('');
        this.tempform.controls.pickuppincode.setValue('');
        this.states = undefined;
        this.districts = undefined;
        console.log("Add address: ");
        console.log(res.message);
        this.existingAddress();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
          console.log("Error");
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add items. Please contact customer service or try again later."
        }
      }
    );
  }

  existingAddress() {
    this.addressesList = [];
    this.httpClient.get<any>(this.urls.address + "?uid=" + this.user.payload.uid).subscribe(
      (res) => {
        //console.log(res.payload);
        this.addressesList.push(res.payload.defaultaddress);
        this.addressesList[0].addresstitle = "Registered Address";
        for (let add of res.payload.createnewaddress) {
          this.addressesList.push(add);
        }
        //console.log(this.addressesList);
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
          console.log("Error");
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add items. Please contact customer service or try again later."
        }
      }
    );

  }

  finSubmit() {
    let formObj = this.form.getRawValue(); // {name: '', description: ''}

    formObj['uid'] = this.user.payload.uid;
    formObj['pickupaddress'] = this.selectedPickupAddress;
    formObj['quantity'] = 0;
    formObj['image'] = this.finalImageURL;
    formObj['id'] = this.prodId;
    let serializedForm = JSON.stringify(formObj);
    console.log('Submit Button clicked: ' + serializedForm);

    this.httpClient.post<any>("http://localhost:5001/v1/products/product", formObj).subscribe(
      (res) => {

        if (res.statusCode == 0) {
          console.log("Success");
          this.form.reset();
          for (let x of this.categoriesJson) {
            for (let i of x.value) {
              if (i.Havesubsubcategories == true) {
                for (let a of i.sub) {
                  a.checked = false;
                }
              }
              else {
                i.checked = false;
              }
            }
          }
        }
        this.router.navigateByUrl("home/farmer");
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
          console.log("Error");
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add items. Please contact customer service or try again later."
        }
      }
    );
  }


  onSubmit() {
    if (this.details == true) {
      if (!this.detailsValidate()) return;
      this.details = false;
      this.productcosting = true;
      this.address = false;
      this.tabChange = "Next";
    }
    else if (this.productcosting == true) {
      if (!this.costingValidate()) return;
      this.details = false;
      this.productcosting = false;
      this.address = true;
      this.tabChange = "Sumbit";
    }
    else if (this.address == true) {
      if (!this.detailsValidate()) {
        this.existingadd = true; //vaish this is the boolean value for showing error
        this.messageexistingadd = "Please fill Details tab."
        console.log(this.messageexistingadd);
        return;
      }
      if (!this.costingValidate()) {
        this.existingadd = true; //vaish this is the boolean value for showing error
        this.messageexistingadd = "Please fill Costing tab."
        console.log(this.messageexistingadd);
        return;
      }
      if (this.selectedPickupAddress == null) {
        this.existingadd = true; //vaish this is the boolean value for showing error
        this.messageexistingadd = "You need to choose a pickup address."
        console.log(this.messageexistingadd);
        return;
      }
      //if (!this.addressValidate()) return;
      //this.tabChange = "Submit";
      if (this.imageEvent != undefined) {
        this.imageUpload(this.imageEvent).then(res => {
          this.finSubmit();
        }).catch(e => {
          this.router.navigateByUrl("/error500");
        });
      }
      else
        this.finSubmit();

    }

  }


}

