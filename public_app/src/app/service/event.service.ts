import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";

  constructor(private http: HttpClient) { }


  // regular event
  getEvents() {
    return this.http.get<Event[]>(this._eventsUrl);
  }
  getSingleEvent(id: string) {
    return this.http.get<Event>(this._eventsUrl + '/' + id);
  }  

  createSingleEvent(event: Event) {
    return this.http.post<Event>(this._eventsUrl, event)
      .subscribe((event : Event)=>{
        console.log(event);  
      })
  }

  updatePost(eventData: Event, id: string) {
    return this.http.put(this._eventsUrl + '/' + id, eventData)
      .subscribe(data => {
        console.log(data);
        location.assign('/account');
      }
    );
  }
  
  deleteSingleEvent(id: string) {
    return this.http.delete(this._eventsUrl + '/' + id);
  }

  getResult(keyword: string) {
    console.log(keyword);
    return this.http.get<Event>(this._eventsUrl + '/search/' + keyword);
  }

  
  

}
