import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
  // go to facebook page
  goToFacebookPage() : void {
  	let windowObjectReference;
    windowObjectReference = window.open("https://www.facebook.com/groups/ung.dung.quang.cao/","_system");
  }
}
