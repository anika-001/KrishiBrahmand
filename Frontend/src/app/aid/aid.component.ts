import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';


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
  public doughnutChartLabels_f = ['Sangli', 'Pune', 'Nagpur', 'Mumbai'];
  public doughnutChartData_f = [80, 160, 200, 100];
  public doughnutChartType_f = 'doughnut';
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  public radarChartType='radar';
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Potatoes', 'Tomatoes', 'Onions', 'Banana', 'Apples', 'Oranges', 'Papaya'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Market Rate'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Your Rate'}
  ];
  public polarAreaChartLabels = ['November Sales', 'December Sales', 'January Sales', 'March sales', 'April Sales'];
  public polarAreaChartData= [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';
  /*public bubbleChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        'Potatoes', 'Tomatoes', 'Onions', 'Banana', 'Apples', 'Oranges', 'Papaya'
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ]
    }
  };
  public bubbleChartType='bubble';
  public bubbleChartLegend = true;

  public bubbleChartData= [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Bids',
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
  ];

  public bubbleChartColors= [
    {
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ]
    }
  ];*/
  public doughnutChartLabels=['Potatoes', 'Tomatoes', 'Onions', 'Banana', 'Apples', 'Oranges', 'Papaya'];
  public doughnutChartData =[
    [350, 450, 100,600,635,826,432],
    [50, 150, 120,87,654,432,65],
    [250, 130, 70,65,765,342,98],
  ];
  public doughnutChartType = 'doughnut';
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
