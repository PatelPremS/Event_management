import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _eventService: EventService, private router: Router) { }
  length:any;

  ngOnInit(): void {
    this.getData();
  }

  pageContent = {
    header: {
      pageTitle : "Home",
      pageLink : "",
      body : "Home page with Statistics"
    }
  };
  getData() {
    this._eventService.getEvents()
    .subscribe(
      res => console.log(this.length = res.length),
      err => console.log(err)
    )
    console.log(this.length);
    // console.log(this.events.length());
  }

}
