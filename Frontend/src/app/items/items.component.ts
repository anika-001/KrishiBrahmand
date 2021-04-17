import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  categoryValue: any = [];
  cat: string = "";
  error500: boolean = false;
  items: any;
  titlecat: string = "";
  catArray: string[] = [];
  user: any;
  urls = {
    'filter': "http://localhost:5001/v1/products/categories/items/filteritems",
    'default': "http://localhost:5001/v1/products/categories/items/items",
  };

  fruits = [
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
    {
      "Name": "Other Fruits", "id": "otherfruits", "Havesubsubcategories": false, "Showsubcategories": false, "checked": false,
      "sub": []
    },

  ];

  dailyvegetables = [
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
    }
  ];

  exoticvegetables = [
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
    }
  ];

  organic = [
    {
      "Name": "Organic Fruits", "id": "organicfruits", "Havesubsubcategories": false, "Showsubcategories": false,
      "checked": false, "sub": []
    },
    {
      "Name": "Organic Vegetables", "id": "organicvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
      "checked": false, "sub": []
    }
  ];

  exotic = [
    {
      "Name": "Exotic Fruits", "id": "exoticfruits", "Havesubsubcategories": false, "Showsubcategories": false,
      "checked": false, "sub": []
    },
    {
      "Name": "Exotic Vegetables", "id": "exoticvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
      "checked": false, "sub": []
    }
  ];

  herbsandseasoning = [
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
    }
  ];

  //numbers = [1, 2, 3, 4, 5];
  errormessage: string = "";
  error: boolean = false;
  rating = 3.5;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService,private cs: CookieService) {
  }


  ngOnInit(): void {

    if(this.cs.check('role')){
      if(this.cs.get('role') == 'farmer'){
        this.router.navigate(['/home/farmer']);
      }

    }

    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
      console.log(res);
      if(res.payload == "Unauthorized")
      {
        this.router.navigate(['/401']);
      }
    })

    this.cat = this.route.snapshot.queryParams['category']
    console.log(this.cat);
    if (this.cat == "fruits") {
      this.categoryValue = this.fruits;
      this.titlecat = "Fruits"
    }
    else if (this.cat == "dailyvegetables") {
      this.categoryValue = this.dailyvegetables;
      this.titlecat = "Daily Vegetables"
    }
    else if (this.cat == "exoticvegetables") {
      this.categoryValue = this.exoticvegetables;
      this.titlecat = "Exotic Vegetables"
    }
    else if (this.cat == "organic") {
      this.categoryValue = this.organic;
      this.titlecat = "Organic"
    }
    else if (this.cat == "exotic") {
      this.categoryValue = this.exotic;
      this.titlecat = "Exotic"
    }
    else if (this.cat == "herbsandseasoning") {
      this.categoryValue = this.herbsandseasoning;
      this.titlecat = "Herbs and Seasoning"
    }
    this.defaultApiCall();

  }


  onChange(x: any, e: any) {
    let isChecked: boolean = e.target.checked;
    let id: string = e.target.id;
    x.checked = !x.checked;
    //const catArray = <FormArray>this.form.controls.categories;
    //console.log(name);
    if (isChecked) {
      this.catArray.push(id);
      console.log(this.catArray);
      //console.log(this.form.controls.categories.value);
    }
    else {
      let index = this.catArray.indexOf(id);
      //console.log(name+" is to be removed at index "+index);
      this.catArray.splice(index, 1);
      console.log(this.catArray);
      //console.log(this.form.controls.categories.value);
    }

  }

  defaultApiCall() {
    this.httpClient.get<any>(this.urls.default + "?id=" + this.cat).subscribe(
      (res) => {
        console.log(res.message);
        this.items = res.payload;
        console.log(this.items);
      },
      (err) => {
        console.log(err);
      if (err.status == 0 || err.status == 500) {
        this.error500 = true;
      }
      else {
        this.error = true;
        this.errormessage = "Unable to retrieve items. Please contact customer service or try again later.";
      }
      }
    );
  }

  apiCall() {
    if (this.catArray.length === 0) {
      this.defaultApiCall();
    }

    else {
      let str: string = "";
      for (var i of this.catArray) {
        str = str + "&id=" + i;
      }
      //str = str.slice(1);
      this.httpClient.get<any>(this.urls.filter + "?" + str.slice(1)).subscribe(
        (res) => {
          console.log(res.message);
          this.items = res.payload;
          console.log(this.items);
        },
        (err) => {
          console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retrieve items. Please contact customer service or try again later.";
        }
        }
      );
    }
  }

  gotoItem(item: any) {
    this.router.navigate(['/item'], { queryParams: { id: item._id } });

  }
}
