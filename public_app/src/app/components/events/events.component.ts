import { EventService } from './../../service/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventService]
})
export class EventsComponent implements OnInit {

  search: any;

  events:any = [];
  constructor(private _eventService: EventService, private router: Router) { }
  pageContent = {
    header: {
      pageTitle : "Event",
      body : "Event Page , Display Events List"
    }
  };
  ngOnInit(): void {
    this.fatchEvents();
  }
  
  fatchEvents() {
    this._eventService.getEvents()
    .subscribe(
      res => this.events = res,
      err => console.log(err)
    )
    console.log(this.events);
  }

  searchEvent(search: string) {
    let url = '/search/' + search;
    this.router.navigateByUrl(url);
    console.log(search);
  }

}
