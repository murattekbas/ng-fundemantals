import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventThumbnailComponent,
  EventListResolver,
  EventsListComponent,
  EventService,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe
} from './events/index'

import { TOASTR_TOKEN,Toastr,JQ_TOKEN,CollapsibleWellComponent,SimpleModalComponent,ModalTriggerDirective } from './common/index';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr:Toastr=(window as { [key: string]: any })["toastr"];
let jQuery:Toastr=(window as { [key: string]: any })["$"];
// declare let toastr:Toastr

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  providers: [
    EventService,
    {provide:TOASTR_TOKEN,useValue:toastr},
    {provide:JQ_TOKEN,useValue:jQuery},
    EventRouteActivator,
    EventListResolver,
    AuthService,
    {
      provide:'canDeactivateCreateEvent',
      useValue:checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?');
  return true;
}
