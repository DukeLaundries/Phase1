import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from './about-popover';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }
  conferenceDate = '1960-01-01';

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
