import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../service/event.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  events:any = [];
  pageContent = {
    header: {
      pageTitle : "Account Page",
      body : "Profile information"
    }
  };
  constructor(private _eventService: EventService, private router: Router, private route: ActivatedRoute) { }
  
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

  public deleteSingleEvent(id: any): void {
    console.log(id);
    this._eventService.deleteSingleEvent(id).subscribe(data => {
      console.log(data);
    });
    // this.router.navigateByUrl('/account');
    // location.assign('/account');
  }
}
