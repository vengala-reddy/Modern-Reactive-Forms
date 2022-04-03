import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { LayoutComponent } from "./layout.component";
import { ListComponent } from "./list.component";

const routes:Routes=[
  {
    path:'',
    component:LayoutComponent,
    children:[
        {path:'',component:ListComponent},
        {path:'add',component:AddEditComponent},
        {path:'edit/:id',component:AddEditComponent}
    ]
  },

];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class UsersRoutingModule{}
