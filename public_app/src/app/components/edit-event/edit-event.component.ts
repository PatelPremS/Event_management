import { switchMap } from 'rxjs/operators';
import { Event } from './../../service/event-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  editEvent: Event = new Event();
  constructor(private eventDataService: EventService, private router: Router, private route: ActivatedRoute) { }
  pageContent = {
    header: {
      pageTitle : "Event Edit",
      body : "Event Event Page , Edit Existing Event"
    }
  };
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.eventDataService.getSingleEvent(params['eventid'])
      })
    )
    .subscribe((editEvent: Event) => {
      this.editEvent = editEvent;
      console.log(editEvent);
    })
  }

  public updateEvent(newEvent: Event) {
    let id = newEvent._id;
    this.eventDataService.updatePost(newEvent, String(id));
    
  }

}
