import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
/*import {Chart} from 'chart.js';
import { ChartsModule } from 'ng2-charts';*/

@Component({
  selector: 'app-aid',
  templateUrl: './aid.component.html',
  styleUrls: ['./aid.component.scss']
})
export class AidComponent implements OnInit {
  WeatherData:any;
    
  public PieChart=[];
  pickups: any;
  error500: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private as: AuthService,private cs: CookieService) { }

  urls = {}
 
  ngOnInit(): void {
   /* this.PieChart=new Chart('pieChart',{
    type:'pie',
    data:{labels:["Blue","Green","Pink"],
  datasets:[{
    label:'Vote Now',
    data:[101,102,103],
    backgroundColor:[
      'rgba(40,23,211,0.9)','rgba(192,255,0,0.9)','rgba(239,23,241,0.9)',
    ],
  }]
},

options:{
  title:{
    Text:'Bar Chart',
    display:true
  },
  scales:{
    yAxes:[{
      ticks:{
        beginAtZero:true
      }
    }]
  }
}

  });*/
    this.getWeatherData();

    if(this.cs.check('role')){
      if(this.cs.get('role') == 'consumer'){
        this.router.navigate(['/home']);
      }

    }

    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/401']);
      }
      else{
        
      }
    },
      (err) => {
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
      }
      
    );

  }
  getWeatherData(){
    //fetch('https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=26e5328b110058f21b8e2cf2969ea645')
    //.then(response=>response.json())
    //.then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
     //this.setWeatherData(data);
     //console.log(data);
     this.httpClient.get<any>("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=26e5328b110058f21b8e2cf2969ea645").subscribe(data =>{
     this.WeatherData=data;
     this.setWeatherData();
      //console.log(datares);
     },
     (err) => {
      if (err.status == 0 || err.status == 500) {
        this.error500 = true;
      }
    }
     );
   
     
  }

  setWeatherData(){
    //console.log(data);
    //this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    //this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
