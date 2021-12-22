import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from "@angular/router";
import { Observable } from "rxjs";
import { EventService } from "../shared/event.service";

@Injectable()

export class EventRouteActivator implements CanActivate{
    constructor(private eventService:EventService, private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const eventExist=!!this.eventService.getEvent(+route.params['id']);

        if (!eventExist)
          this.router.navigate(['/404']);
        return eventExist;  
    }

}