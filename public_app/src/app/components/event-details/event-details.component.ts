import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { switchMap } from 'rxjs/operators';

import { Event } from '../../service/event-model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [EventService]
})
export class EventDetailsComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // newMovie!: Movie;
  newEvent: Event = new Event();

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.eventService.getSingleEvent(params['eventid'])
      })
    )
    .subscribe((newEvent: Event) => {
      this.newEvent = newEvent;
      console.log(newEvent);
    })
  }
  
  public deleteSingleMovie(id: any): void {
    console.log(id);
    this.eventService.deleteSingleEvent(id).subscribe(data => {
      console.log(data);
    });
    this.router.navigateByUrl('');
  }
  pageContent = {
    header: {
      pageTitle : "Event Detail",
      body : "Event Detail Page for event information"
    }
  };
}
