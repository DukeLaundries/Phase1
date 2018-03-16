import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from "../login/login";


@Component({
  template: `
    <style>
      
      div.existpopover{text-align: center;}
      b{text-align: center;}
    </style>
    <div class="modall">
    <div class="existpopover" padding>
        <b>You have entered wrong password</b>
    </div>
    
    </div>
  `
})
export class WrongPasswordPopover {
//<div class="existpopover">
//<button width=50 ion-button class="round icon-center button-positive" data-dismiss="modall" padding>Try Again</button>
//</div>
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