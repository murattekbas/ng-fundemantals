import { toBase64String } from "@angular/compiler/src/output/source_map";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "../common/toastr.service";
import { EventService } from "./shared/event.service";


@Component({
    selector:'events-list',
    template:`
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr />
        <div class="row">
          <div class="col-md-5" *ngFor="let event of events">
            <event-thumbnail (click)="handleThumbnailClick(event.name)"  [event]="event"></event-thumbnail>
          </div>
        </div>
   </div>`
})

export class EventsListComponent implements OnInit {
    events:any[] | undefined;
    constructor(private eventService:EventService, private toastr:ToastrService) {
        
    }
    ngOnInit(): void {
        this.events=this.eventService.getEvents();
    }

    handleThumbnailClick(eventName:string){
        this.toastr.success(eventName);


    }


}