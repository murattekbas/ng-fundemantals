import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { IsActiveMatchOptions } from "@angular/router";
import { AuthService } from "src/app/user/auth.service";
import { IUser } from "src/app/user/user.model";
import { ISession } from "..";
import { VoterService } from "./voter.service";

@Component({
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})

export class SessionListComponent implements OnChanges{
    
    @Input() sessions: ISession[]|any;
    @Input() filterBy:string='';
    @Input() sortBy:string='';
    @Input() eventId:number|any;

    visibleSessions:ISession[]|any=[];

    constructor(public auth:AuthService, private voterService:VoterService){}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy==='name'?this.visibleSessions.sort(sortByNameAsc):this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session:ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId,session,(this.auth.currentUser as IUser).userName);

        } else {
            this.voterService.addVoter(this.eventId,session,(this.auth.currentUser as IUser).userName);
        }

        if (this.sortBy==='votes')
            this.visibleSessions.sort(sortByVotesDesc);
    }

    userHasVoted(session:ISession){
        return this.voterService.userHasVoted(session,(this.auth.currentUser as IUser).userName);
    }

    filterSessions(filter:string){
        if(filter==='all'){
            this.visibleSessions=this.sessions.slice(0);
        }else{
            this.visibleSessions=this.sessions.filter((session: ISession)=>{
                return session.level.toLowerCase()===filter;
            })

        }
    }

}

function sortByNameAsc(s1:ISession,s2:ISession){
    if (s1.name>s2.name) return 1
    else if (s1.name===s2.name) return 0
    else return -1
}

function sortByVotesDesc(s1:ISession,s2:ISession){
    return s2.voters.length-s1.voters.length;
}