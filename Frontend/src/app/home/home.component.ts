import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FilldbentryService } from '../services/filldbentry.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: any;
  //role: string = "";
  // roleFarmer: boolean = false;
  user: any;
  urls = {
    'profile': "http://localhost:5001/v1/users/profile",
  }

  products =
    [

      {
        _id: "6049cee350b5b0ceecba6d85",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fasparagus1.jpg?alt=media&token=2dc6eab5-c361-43f1-851b-dc962237851f",
        title: "Asparagus",
        description: "Fresh and nutritious asparagus grown organically",
        categories: [{ name: 'asparagus' }, { name: 'organicvegetables' }, { name: 'exoticvegetables' }],
        productRemaining: 190,
        baseprice: 80,
        costing: [
          {
            discount: 5,
            quantity: 3,
          }
        ],
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },
      {
        _id: "6049cee550b5b0ceecba6db3",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fapple1.jpeg?alt=media&token=fa7f74e3-39fd-42db-bc0b-376d345a8d20",
        title: "Apples",
        description: "Juicy fresh apples from Nagpur grown organically",
        categories: [{ name: 'apple' }, { name: 'organicfruits' }],
        productRemaining: 100,
        baseprice: 55,
        costing: [
          {
            discount: 10,
            quantity: 5,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6d8e",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fbrinjal2.jpg?alt=media&token=37769276-218f-4a72-a6a7-f21673cb05dc",
        title: "Eggplant",
        description: "Organically grown eggplant very sweet",
        categories: [{ name: "brinjal" }, { name: "organicvegetables" }, { name: "otherexoticvegetables" }, { name: "exoticvegetables" }],
        productRemaining: 90,
        baseprice: 48,
        costing: [
          {
            discount: 8,
            quantity: 5,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee550b5b0ceecba6dc5",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fbrinjal1.jfif?alt=media&token=16e626d8-d4ab-47f0-91dc-7c803dee9c73",
        title: "Brinjal",
        description: "Sweet brinjal fresh from farm to plate",
        categories: [{ name: "brinjal" }],
        productRemaining: 50,
        baseprice: 35,
        costing: [
          {
            discount: 5,
            quantity: 6,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee350b5b0ceecba6d8a",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fbrinjal3.jfif?alt=media&token=ec1266af-5c99-4fce-8747-2577b7c519c5",
        title: "Brinjal",
        description: "Eggplant grown in Dhule very fresh and ripe",
        categories: [{ name: "brinjal" }, { name: "organicvegetables" }],
        productRemaining: 30,
        baseprice: 37,
        costing: [
          {
            discount: 8,
            quantity: 2,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6d8e",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fgreenapples1.jfif?alt=media&token=c04c0838-a968-4a3b-9765-73066edf77f8",
        title: "Green Apples",
        description: "Juicy sweet and scrumptious apples",
        categories: [{ name: "apple" }, { name: "organicfruits" }, { name: "exoticfruits" }],
        productRemaining: 150,
        baseprice: 72,
        costing: [
          {
            discount: 12,
            quantity: 5,
          }
        ],
        rating: 4.5,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6d93",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Flemon1.jpg?alt=media&token=9df30159-7ce5-4f4b-8757-a1771a09602c",
        title: "Lemon",
        description: "Juicy lemons with sour sweet taste",
        categories: [{ name: "lemon" }, { name: "lemon" }, { name: "organicfruits" }, { name: "lemon" }],
        productRemaining: 60,
        baseprice: 15,
        costing: [
          {
            discount: 3,
            quantity: 3,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
      },

      {
        _id: "6049cee450b5b0ceecba6d99",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fmango1.jpg?alt=media&token=8cbcf909-4611-414f-9515-4ea830fd563c",
        title: "Alphanso Mangoes",
        description: "Very very sweet and juicy mangoes ",
        categories: [{ name: "mangoes" }, { name: "exoticfruits" }, { name: "organicfruits" }],
        productRemaining: 200,
        baseprice: 150,
        costing: [
          {
            discount: 10,
            quantity: 3,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6d9e",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fmango2.jfif?alt=media&token=cdec6e83-b460-4f74-b7e9-481da156bd52",
        title: "Ratnagiri Mangoes",
        description: "Mangoes grown in Ratnagiri very sweet and fresh",
        categories: [{ name: "mangoes" }, { name: "exoticfruits" }],
        productRemaining: 190,
        baseprice: 55,
        costing: [
          {
            discount: 8,
            quantity: 5,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6da2",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fpotato2.jpg?alt=media&token=f73e473d-11e3-4924-9497-2542e7c1e45b",
        title: "Potato",
        description: "Potatoes grown organically with great skill very fresh",
        categories: [{ name: "potatoes" }, { name: "organicvegetables" }],
        productRemaining: 50,
        baseprice: 30,
        costing: [
          {
            discount: 5,
            quantity: 4,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6da6",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fpotato1.jpg?alt=media&token=c562f67f-f079-41fe-b6c9-402ffcb393d2",
        title: "Potatoes",
        description: "Potatoes grown fresh ready to eat",
        categories: [{ name: "potatoes" }],
        productRemaining: 100,
        baseprice: 35,
        costing: [
          {
            discount: 5,
            quantity: 2,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6da9",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fredcapsicum1.jpg?alt=media&token=66a037a1-eae2-4841-8100-5275e3227079",
        title: "Red Capsicum",
        description: "Red capsicum grown organically in our farm located in Lonavala",
        categories: [{ name: "redcapsicum" }, { name: "organicvegetables" }, { name: "exoticvegetables" }],
        productRemaining: 18,
        baseprice: 50,
        costing: [
          {
            discount: 7,
            quantity: 1,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee450b5b0ceecba6dae",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fstrawberry1.jpg?alt=media&token=857967e0-d74e-4da2-a904-2e10f27e23aa",
        title: "Strawberry",
        description: "Strawberries grown in farms of Pune with fresh sweet taste",
        categories: [{ name: "strawberry" }, { name: "exoticfruits" }, { name: "organicfruits" }],
        productRemaining: 40,
        baseprice: 85,
        costing: [
          {
            discount: 10,
            quantity: 3,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee550b5b0ceecba6dbd",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Favocado.jpg?alt=media&token=2bbcd9a7-6d68-4d21-85ec-6bd98adf0ae2",
        title: "Vaishnavi Avocado",
        description: "Yummy and Healthy",
        categories: [{ name: "avocados" }, { name: "exoticvegetables" }],
        productRemaining: 100,
        baseprice: 110,
        costing: [
          {
            discount: 15,
            quantity: 10,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
      },

      {
        _id: "6049cee550b5b0ceecba6dc1",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fcarrots1.jpg?alt=media&token=417c8b50-5e34-4b88-a81a-a4ecdf23393b",
        title: "Carrots",
        description: "Carrots grown organically very sweet and fresh",
        categories: [{ name: "carrot" }, { name: "organicvegetables" }],
        productRemaining: 140,
        baseprice: 45,
        costing: [
          {
            discount: 10,
            quantity: 4,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee550b5b0ceecba6dc8",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fonions1.jpeg?alt=media&token=c45a8e03-b1bf-47b7-9f05-7eefb66c3239",
        title: "Onions",
        description: "Red onions very sweet and fresh",
        categories: [{ name: "onions" }],
        productRemaining: 200,
        baseprice: 65,
        costing: [
          {
            discount: 15,
            quantity: 4,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee550b5b0ceecba6dcb",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Ftomatoes1.png?alt=media&token=a9e94129-64a6-49e8-a145-1c08fe254c4e",
        title: "Tomatoes",
        description: "Red big tomatoes grown organically ripe and ready to buy",
        categories: [{ name: "tomatoes" }, { name: "organicvegetables" }],
        productRemaining: 200,
        baseprice: 40,
        costing: [
          {
            discount: 10,
            quantity: 5,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "603dea5d815001486c3a4fdc"
      },

      {
        _id: "6049cee550b5b0ceecba6dcf",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fcabbage_veggie_2.jpg?alt=media&token=91e3fcd9-0610-4cc2-947d-6f7bf1312e6c",
        title: "Vaishnavi Cabbage",
        description: "Yummy healthy Cabbage",
        categories: [{ name: "cabbage" }, { name: "organicvegetables" }],
        productRemaining: 140,
        baseprice: 55,
        costing: [
          {
            discount: 10,
            quantity: 5,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
      },

      {
        _id: "6049cee550b5b0ceecba6dd3",
        image: "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/products%2Fimages%2Fcabbage_veggie_2.jpg?alt=media&token=91e3fcd9-0610-4cc2-947d-6f7bf1312e6c",
        title: "Isha Delicious Cabbage",
        description: "Yummy and healthy",
        categories: [{ name: "cabbage" }, { name: "organicvegetables" }],
        productRemaining: 160,
        baseprice: 45,
        costing: [
          {
            discount: 10,
            quantity: 4,
          }
        ],
        quantity: 0,
        rating: 0,
        noOfUsers: 0,
        comments: [],
        uid: "6018037140772447043d29f5"
      }


    ]

  // role: string = "";

  constructor(config: NgbCarouselConfig, private route: ActivatedRoute, private router: Router, private as: AuthService,
     private fs: FilldbentryService, private cs: CookieService) {
      config.interval = 4000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = true; 
      }

  
  ngOnInit(): void {

    if (this.cs.check('role')) {
      if (this.cs.get('role') == 'farmer') {
        this.router.navigate(['/home/farmer']);
      }

    }
    // this.ac.getValuerole().subscribe(res => {
    //   this.role = res;
    // })    
    // if(this.cs.check('role')){
    //   if(this.cs.get('role') == 'farmer'){
    //     this.role = "farmer";
    //   }

    //   if(this.cs.get('role') == 'consumer'){
    //     this.role = "consumer";
    //   }

    //   if(this.cs.get('role') == 'consumeron'){
    //     this.role = "consumer";
    //   }

    // }
    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(res);
      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      // this.as.getProfile(res.payload.uid).subscribe(
      //   res2 => {
      //     // if(res2.payload.role == "farmer"){
      //     //   if(!this.cs.check('role')){
      //     //     this.cs.set( 'role', 'farmer' );
      //     //     this.ac.setValuerole('farmer');
      //     //   }
      //     // }
      //     // else{
      //     //   this.cs.set( 'role', 'consumeron' );
      //     //   this.ac.setValuerole('consumeron');
      //     // }
      //   //   this.profile = res2;
      //   //   this.role = res2.payload.role;
      //   //   if(this.role == "farmer")
      //   //     this.roleFarmer = true;
      //    }
      // )
    })


  }

  navigate(categ: String) {
    //var myurl = `/items?category=${categ}`;
    this.router.navigate(['/items'], { queryParams: { category: categ } });
  }

  addtodb() {
    for (let dben of this.products) {
      this.fs.filldb(dben).subscribe((res) => {

      },
        (err) => { console.log(err) })
    }


  }
}
