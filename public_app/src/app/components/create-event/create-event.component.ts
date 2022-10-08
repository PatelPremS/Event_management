import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from '../../service/event-model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [EventService]

})
export class CreateEventComponent implements OnInit {
  pageContent = {
    header: {
      pageTitle : "Create Event",
      body : "To Create Events "
    }
  };
  public newEvent: Event = {
    _id: '',
    title: '',
    speaker: '',
    date: '',
    time: '',
    description: '',
    address: '',
    country: '',
    state: '',
    postal: ''
  }
  constructor(private eventDataService: EventService, private router: Router) { }

  ngOnInit(): void {
    
  }
  public createEvent(newEvent: Event) {
    console.log(newEvent);

    this.eventDataService.createSingleEvent(newEvent);
    this.router.navigate(['/account']);
  }

}
