import { Component, Input, Output,EventEmitter } from "@angular/core";
import { IEvent } from ".";

@Component({
    selector:'event-thumbnail',
    template:`
    <div [routerLink]="['/events',event?.id]" class="well hoverwell thumbnail">
        <h2>{{event?.name |uppercase}}</h2>
        <div>Date: {{event?.date|date:'d/M/y'}}</div>
        <div [ngClass]="{green:event?.time === '8:00 am',bold:event?.time==='8:00 am'}" [ngSwitch]="event?.time">
           Time: {{event?.time}}
           <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price: {{event?.price | currency:'USD'}}</div>
        <div [hidden]="!event?.location">
            <span>Location:{{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div [hidden]="!event?.onlineUrl">
            Online URL: {{event?.onlineUrl}}
        </div>
    </div>
    `,
    styles:[`
         .green {color:#003300 !important}
         .bold {font-weight:bold;}
         .thumbnail {min-height: 220px}
         .pad-left {margin-left:10px;}
         .well div {color:#bbb;}
    `]

})

export class EventThumbnailComponent{
    @Input() event:IEvent | undefined;

}