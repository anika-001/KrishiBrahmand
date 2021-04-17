import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { dailyVegetables, exotic, exoticVegetables, fruits, herbsandseasoning, organic } from '../assets/data';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-farmer-home',
  templateUrl: './farmer-home.component.html',
  styleUrls: ['./farmer-home.component.scss']
})
export class FarmerHomeComponent implements OnInit {

  categoryValue: any = [];
  cat: string = '';
  error500: boolean = false;
  items: any;
  titlecat: string = '';
  catArray: string[] = [];
  user: any;
  urls = {
    // TODO: Provide only one url and uid param to api call
    'filter': 'http://localhost:5001/v1/products/categories/items/filteritems',
    'default': 'http://localhost:5001/v1/products/categories/items/items',
  };

  categories: Node[] = [];

  //numbers = [1, 2, 3, 4, 5];
  errormessage: string = '';
  error: boolean = false;
  rating = 3.5;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService,private cs: CookieService) {
  }


  ngOnInit(): void {

    if(this.cs.check('role')){
      if(this.cs.get('role') == 'consumer'){
        this.router.navigate(['/home']);
      }

    }

    this.categories = this.init();

    this.as.getUser().subscribe(res => {
      if (res.payload == 'Unauthorized') {
        this.router.navigate(['/401']);
      } else {
        this.user = res.payload;
        this.defaultApiCall(res.payload.uid);
      }
    });

  }

  onChange(node: Node, event: Event) {
    // console.log(node.id, event);
    node.checked = !node.checked;

    if (node.checked) {
      this.catArray.push(node.id);
      // console.log(this.catArray);
    } else {
      let index = this.catArray.indexOf(node.id);
      this.catArray.splice(index, 1);
      console.log(this.catArray);
    }
  }

  getData() {
    if (this.catArray.length !== 0) {
      let urlQuery = '?uid=' + this.user.uid + '&id=' + this.catArray.join('&id=');
      console.log('>>>>>>>>>>>>>>>', urlQuery);

      this.httpClient.get<any>(this.urls.filter + urlQuery).subscribe(
        (res) => {
          console.log('>>', res);
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
            this.errormessage = 'Unable to retrieve items. Please contact customer service or try again later.';
          }
        }
      );
    }

    else {
      this.defaultApiCall(this.user.uid);
    }
  }

  // initData = {

  //   "Fruits": {
  //     "Apple Banana Pear": {
  //       "Apple": 'apple',
  //       "Banana": 'banana',
  //       "Pear": 'pear'
  //     },
  //     "Berries": {
  //       "Strawberry": 'strawberry',
  //       "Blueberry": 'blueberry',
  //       "Cherry": 'cherry',
  //       "Raspberry": 'raspberry'
  //     },
  //     "Citrus Fruits": {
  //       "Orange": 'orange',
  //       "Lemon": 'lemon',
  //       "Mosambi": 'mosambi',
  //       "Kiwi": 'kiwi'
  //     },
  //     "Grapes Chickoo Pomegranate": {
  //       "Grapes": 'grapes',
  //       "Chickoo": 'chickoo',
  //       "Pomegranate": 'pomegranate'
  //     },
  //     "Mangoes": 'mangoes',

  //     "Melons": {
  //       "Watermelon": 'watermelon',
  //       "Muskmelon": 'muskmelon',
  //       "Sunmelon": 'sunmelon'
  //     },
  //     "Plums Peaches Figs Apricots": {
  //       "Plums": 'plum',
  //       "Peach": 'peach',
  //       "Fig": 'fig',
  //       "APricot": 'apricot'
  //     },
  //     "Dry Fruits and Dry seeds": {
  //       "Dry Fruits": 'dryfruits',
  //       "Dry Seeds": 'dryseeds'
  //     },
  //     "Other Fruits": 'otherfruits',
  //   },
  //   "Vegetables": {
  //     "Onions Potatoes Tomatoes": {
  //       "Onion": 'onions',
  //       "Potato": 'potatoes',
  //       "Tomato": 'tomatoes'
  //     },
  //     "Beans Brinjal Okra": {
  //       "Beans": 'beans',
  //       "Brinjal": 'brinjal',
  //       "Okra": 'okra'
  //     },
  //     "Broccoli Cabbage Cauliflower": {
  //       "Broccoli": 'broccoli',
  //       "Cabbage": 'cabbage',
  //       "Cauliflower": 'cauliflower'
  //     },
  //     "Gourd Pumpkin Drumstick": {
  //       "Bitter Gourd - Karela": 'karela',
  //       "Ridge Gourd - Dodka": 'dodka',
  //       "Bottle Gourd - Lauki": 'lauki',
  //       "Snake Gourd - Parwal": 'parwal',
  //       "Tinda": 'tinda',
  //       "Pumpkin": 'pumpkin',
  //       "Drumstick": 'drumstick'
  //     },
  //     "Chillies Garlic Lemon Ginger": {
  //       "Chillies": 'chillies',
  //       "Garlic": 'garlic',
  //       "Lemon": 'lemon',
  //       "Ginger": 'ginger'
  //     },
  //     "Cucumber Capsicum": {
  //       "Cucumber": 'cucumber',
  //       "Red Capsicum": 'redcapsicum',
  //       "Yellow Capsicum": 'yellowcapsicum',
  //       "Green Capsicum": 'greencapsicum'
  //     },
  //     "Peas Corn": {
  //       "Peas": 'peas',
  //       "Corn": 'corn'
  //     },
  //     "Root Vegetables": {
  //       "Beetroot": 'beetroot',
  //       "Carrot": 'carrot',
  //       "Turnip": 'turnip',
  //       "Radish": 'radish'
  //     },
  //     "Other Daily Vegetables": 'otherdailyvegetables',
  //   },
  //   "Exoticvegetables": {
  //     "Avocados Peppers": {
  //       "Avocados": 'avocados',
  //       "Pepper": 'pepper'
  //     },
  //     "Broccoli Zucchini": {
  //       "Broccoli": 'broccoli',
  //       "Zucchini": 'zucchini'
  //     },
  //     "Asparagus Artichokes": {
  //       "Asparagus": 'asparagus',
  //       "Artichoke": 'artichoke'
  //     },
  //     "Celery Fennel Leeks": {
  //       "Celery": 'celery',
  //       "Fennel": 'fennel',
  //       "Leek": 'leek'
  //     },
  //     "Edible FLowers": 'edibleflowers',
  //     "Lettuce Leafy Vegetables": {
  //       "Lettuce": 'lettuce',
  //       "Leafy Vegetables": 'leafyveg'
  //     },
  //     "Mushrooms": 'mushrooms',
  //     "Other Exotic Vegetables": 'otherexoticvegetables'
  //   },
  //   "organic": {
  //     "Organic Fruits": 'organicfruits',
  //     "Organic Vegetables": 'organicvegetables'
  //   },
  //   "exotic": {
  //     "Exotic Fruits": 'exoticfruits',
  //     "Exotic Vegetables": 'exoticvegetables'
  //   },
  //   "herbsandseasoning": {
  //     "Lemon Ginger Garlic": {
  //       "Lemon": 'lemon',
  //       "Ginger": 'ginger',
  //       "Garlic": 'garlic'
  //     },
  //     "Indian Herbs": 'indianherbs',
  //     "Other Herbs and Seasoning": 'otherherbsandseasoning'
  //   }
  // }
  defaultApiCall(uid: String) {
    this.httpClient.get<any>(this.urls.default + '?uid=' + uid).subscribe(
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
          this.errormessage = 'Unable to retrieve items. Please contact customer service or try again later.';
        }
      }
    );
  }

  apiCall() {
    if (this.catArray.length === 0) {
      this.defaultApiCall(this.user.uid);
    } else {
      let str: string = '';
      for (var i of this.catArray) {
        str = str + '&id=' + i;
      }
      //str = str.slice(1);
      this.httpClient.get<any>(this.urls.filter + '?' + str.slice(1)).subscribe(
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
            this.errormessage = 'Unable to retrieve items. Please contact customer service or try again later.';
          }
        }
      );
    }
  }

  gotoStats(item: any) {
    this.router.navigate(['/productstats'], { queryParams: { id: item._id } });
  }

  initData = [
    { name: 'Fruits', children: fruits },
    { name: 'Daily Vegetables', children: dailyVegetables },
    { name: 'Exotic Vegetables', children: exoticVegetables },
    { name: 'Organic', children: organic },
    { name: 'Exotic', children: exotic },
    { name: 'Herbs and Seasoning', children: herbsandseasoning }
  ]

  init(initData?: any[]): Node[] {

    if (!initData) {
      initData = this.initData
    }

    let retVal: Node[] = [];

    initData.forEach((each) => {
      let data = new Node(each.name, each.id);
      if (each.children && (each.children.length > 0)) {
        data.children = this.init(each.children);
      }

      retVal.push(data);

    });

    return retVal;
  }

}

class Node {

  checked: boolean = false;
  expanded: boolean = false;
  children: Node[] = [];
  constructor(public name: string, public id: string) { }

  clicked() {
    if (this.children.length) {
      this.expanded = !this.expanded;
    }
  }

  getClass(): string {
    let retVal = '';
    if (this.children.length) {
      retVal = this.expanded ? 'fa fa-minus-circle' : 'fa fa-plus-circle';
    }
    return retVal;
  }

}
