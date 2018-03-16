import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from "../login/login";


@Component({
  template: `
    <style>
      
      div.existpopover{text-align: center;}
      b{text-align: center;}
    </style>
    <div class="existpopover" padding>
        <b>User already exist</b>
    </div>
    <div class="existpopover">
        <b>Please login</b>
    </div>
    <div class="existpopover">
    <button width=50 ion-button class="round icon-center button-positive" padding (click)="login()">Login</button>
    </div>
  `
})
export class UserExistPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  login() {
    this.app.getRootNav().push(LoginPage);
    this.viewCtrl.dismiss();
  }

  // close(url: string) {
  //   window.open(url, '_blank');
  //   this.viewCtrl.dismiss();
  // }
}