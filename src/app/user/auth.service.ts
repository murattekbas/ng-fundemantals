import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable()

export class AuthService {
    currentUser:IUser|undefined;

    constructor(private http:HttpClient){}

    loginUser(userName:string,password:string){
        let loginInfo={username:userName,password:password};
        let options={headers:new HttpHeaders({'Content-Type':'application/json'})}

        return this.http.post('/api/login',loginInfo,options).pipe(tap((data)=>{
            this.currentUser=<IUser>(data as { [key: string]: any })["user"]
        })).pipe(catchError(err=>{
            return of(false);
        }))
        /* this.currentUser={
            id:1,
            userName:userName,
            firstName:'Murat',
            lastName:'Tekbas'
        } */

    }

    updateCurrentUser(firstName:string,lastName:string){
        (this.currentUser as IUser).firstName=firstName;
        (this.currentUser as IUser).lastName=lastName;
        let options={headers:new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.put(`/api/users/${(this.currentUser as IUser).id}`,this.currentUser,options);

    }

    logout(){
        this.currentUser=undefined;
        let options={headers:new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.post('api/logout',{},options);
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    checkAuthentiacationStatus(){
        this.http.get('/api/currentIdentity').pipe(tap(data =>{
            if (data instanceof Object){
                this.currentUser=<IUser>data;
            }
        })).subscribe()
       

    }

}