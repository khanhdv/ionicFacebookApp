import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {FacebookService, FacebookInitParams} from 'ng2-facebook-sdk/dist';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [ FacebookService ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform,private fb: FacebookService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    let fbParams: FacebookInitParams = {
       appId: '562383860628503',
       xfbml: true,
       version: 'v1.0'
       };
    this.fb.init(fbParams);
    console.log('init!!!');
  }
}
