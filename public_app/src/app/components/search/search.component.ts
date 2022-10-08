import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { switchMap } from 'rxjs/operators';
import { Event } from 'src/app/service/event-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  // resultData: any;
  resultData: Event = new Event();

  ngOnInit(): void {
    this.getResult();
  }
  keyword: string;
  getResult() {
    // this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     return this.eventService.getResult(params['keyword'])
    //   })
    //   .subscribe((resultData: Event) => {
    //     this.resultData = resultData;
    //     console.log(resultData);
    //   })
    // )
    this.route.params.subscribe(event => {
      this.keyword = event.keyword; 
      console.log(this.keyword);
    });
    this.eventService.getResult(this.keyword).subscribe(data => {
      console.log(data);
    });
  }

  pageContent = {
    header: {
      pageTitle : "Search Result",
      body : "This page will display results"
    }
  };
  

}
