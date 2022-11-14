import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  private pushObj: PushObject;

  constructor(private push: Push,  private platform: Platform,) {
    this.platform.ready().then(() => { this.init(); });
   }

  init() { 
    console.log("init app components")
     // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

    this.initPush()
    this.subscribePush()
  }

  private initPush(): void {
    const options: PushOptions = { android: { clearNotifications: false }, ios: { fcmSandbox: false } };
    this.pushObj = this.push.init(options);
    this.pushObj.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    this.pushObj.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    this.pushObj.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  private subscribePush(): void {
    if (this.platform.is("ios")) { this.pushObj.subscribe('_ios_');
    } else if (this.platform.is("android")) { this.pushObj.subscribe('_android_'); }
}
}
