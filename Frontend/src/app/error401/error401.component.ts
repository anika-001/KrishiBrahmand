import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {

  selected: any = "farmer";
  constructor() { }

  ngOnInit(): void {
  }

}
