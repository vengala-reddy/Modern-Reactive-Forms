import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@app/_models/user";
import { environment } from "@environments/environment";
import { Observable, of } from "rxjs";
// import { USERS } from "./mock-users";

const baseUrl=`${environment.apiUrl}/users`;
@Injectable({providedIn:'root'})
export class UserService{
  constructor(private http:HttpClient){}
  getAll():Observable<User[]>{
    // const users=of(USERS);
    return this.http.get<User[]>(baseUrl);
    // return users;
  }
  getById(id:string){
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  create(params:any){
    return this.http.post(baseUrl,params);

  }
  update(id:string,params:any){
    return this.http.put(`${baseUrl}/${id}`,params);
  }
  delete(id:string){
    return this.http.delete(`${baseUrl}/${id}`);
  }
}