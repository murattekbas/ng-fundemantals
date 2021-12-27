import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute,Params } from "@angular/router";
import { IEvent, ISession } from "..";
import { ThisReceiver } from "@angular/compiler";

@Component({
    templateUrl:'./event-details.component.html',
    styles:[`
        .container {.padding-left:20px;padding-right:20px;}
        .event-image { height:100px}
        a {cursor:pointer}
    `]

})

export class EventDetailsComponent implements OnInit{
    event: IEvent | undefined;
    addMode!:boolean;
    filterBy:string ='all';
    sortBy:string='votes';

    constructor(private eventService:EventService,private route:ActivatedRoute) {

    }

    ngOnInit(): void {

        //Kendine yönlenen routelarda problem yaşanıyordu. Sadece route parametresi değişiyorsa state değişmez
        this.route.data.forEach((data)=>{
            this.event=data['event'];
            this.addMode=false;
            });
            
        /* this.event=this.eventService.getEvent(+this.route.snapshot.params['id']);
        console.log(this.event) */
    }

    addSession(){
        this.addMode=true;
    }

    saveNewSession(session:ISession){
        session.id=566
        this.event?.sessions.push(session);
        this.eventService.saveEvent(this.event!).subscribe();
        this.addMode=false

    }

    cancelAddSession(){
        this.addMode=false

    }

}