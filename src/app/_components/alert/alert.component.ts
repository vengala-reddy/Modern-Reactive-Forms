import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Alert,AlertType } from '@app/_models/alert';
import { AlertService } from '@app/_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() id='default-alert';
  @Input() fade=true;

  alerts:Alert[] = [];
  //!=> means it cannot be null or undefined
  alertSubscription!:Subscription;
  routeSubscription!:Subscription;

  constructor(private router:Router,private alertService:AlertService) { }

  ngOnInit(): void {
    //subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
                                              .subscribe(alert => {
                                                //clear alerts when an empty alert is recieved
                                                if(!alert.message){
                                                  //filter out alerts without 'keepAfterRouteChang' flag
                                                  this.alerts=this.alerts.filter(x => x.keepAfterRouteChange);
                                                  //reset 'keepAfterRouteChange' flag on the reset
                                                  this.alerts.forEach(x => x.keepAfterRouteChange = false);
                                                  return;
                                                }
                                                //add alert to array
                                                this.alerts.push(alert);
                                                //auto close alert if required
                                                if(alert.autoClose){
                                                  setTimeout(()=> this.removeAlert(alert),3000);
                                                }
                                              });
    //clear alerts on location change
    this.routeSubscription=this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.alertService.clear(this.id);
      }
    });
  }
  ngOnDestroy(){
    //unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
  removeAlert(alert:Alert){
    //check if already removed to prevent error on auto close
    if(!this.alerts.includes(alert)) return;
    if(this.fade){
      //fade out alert
      alert.fade=true;
      //remove alert after faded out
      setTimeout(()=> {
        this.alerts=this.alerts.filter(x=>x!==alert);
      },250);
    }else{
      //remove alert
      this.alerts=this.alerts.filter(x=> x!==alert);
    }
  }
  cssClass(alert:Alert){
    if(alert?.type===undefined) return;
    const classes=['alert','alert-dismissable','mt-4','container'];

    const alertTypeClass={
      [AlertType.Success]:'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'


    }
    classes.push(alertTypeClass[alert.type]);
    if(alert.fade){
      classes.push('fade');
    }
    return classes.join('');
  }

}
