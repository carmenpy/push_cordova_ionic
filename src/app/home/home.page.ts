import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token: string
  
  constructor(private platform: Platform,) {
    console.log("constructor home")
   }

}
