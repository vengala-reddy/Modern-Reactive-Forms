import { Component, OnInit } from "@angular/core";
import { User } from "@app/_models/user";
import { UserService } from "@app/_services/user.service";
import { first } from "rxjs/operators";

@Component({templateUrl:'list.component.html'})
export class ListComponent implements OnInit{
  // getUsers():void{
  //   this.userService.getAll()
  //                   .subscribe(users => this.users=users);
  // }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.userService.getAll()
                    .pipe(first())
                    .subscribe(users => this.users = users);
  }

  users!:User[];

  deleteUser(id:string){
    const user=this.users.find(x => x.id === id);
    if(!user) return;
    user.isDeleting=true;
    this.userService.delete(id)
                    .pipe(first())
                    .subscribe(()=>{
                      this.users=this.users.filter(x=>x.id!==id)
                    });
  }

  constructor(private userService:UserService){}


}
