import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { AlertService } from '@app/_services/alert.service';
import { UserService } from '@app/_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  // selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form!:FormGroup;
  id!:string;
  isAddMode!:boolean;
  loading=false;
  submitted=false;

  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    //password not required in edit mode
    const passwordValidators=[Validators.minLength(6)];
    if(this.isAddMode){
      passwordValidators.push(Validators.required);
    }
    const formOptions:AbstractControlOptions={validators:MustMatch('password','confirmPassword')};
    this.form=this.formBuilder.group({
      title:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required],
      password:['',[Validators.minLength(6),this.isAddMode?Validators.required:Validators.nullValidator]],
      confirmPassword:['',this.isAddMode?Validators.required:Validators.nullValidator]

    },formOptions);
    if(!this.isAddMode){
      this.userService.getById(this.id)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
    }
  }
  // convenience getter for easy access to form fields
  get f(){return this.form.controls;}

  private createUser(){
    this.userService.create(this.form.value)
        .pipe(first())
        .subscribe(()=>{
          this.alertService.success('User added',{keepAfterRouteChange:true});
          this.router.navigate(['../'],{relativeTo:this.route});
        })
        .add(()=>this.loading=false);
  }
  private updateUser(){
    this.userService.update(this.id,this.form.value)
        .pipe(first())
        .subscribe(()=>{
          this.alertService.success('User updated',{keepAfterRouteChange:true});
          this.router.navigate(['../../'],{relativeTo:this.route});
        })
        .add(()=>this.loading=false);
  }

  onSubmit(){
    this.submitted=true;
    //resets alerts on submit
    this.alertService.clear();
    //stop here if form is invalid
    if(this.form.invalid){
      return;
    }
    this.loading=true;
    if(this.isAddMode){
      this.createUser();
    }else{
      this.updateUser();
    }
  }



}
