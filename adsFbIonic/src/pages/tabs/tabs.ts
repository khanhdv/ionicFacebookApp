import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LikesPage } from '../likes/likes';

import { DataService } from '../../providers/data/data.service';
import { ShareService } from '../../services/ShareService';
import { LoadingController,Platform } from 'ionic-angular';
import { Device } from 'ionic-native';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
  providers: [ DataService,ShareService ]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = LikesPage;
  userInfo : any;
  isLoading = true;
  loadingComponentCount = 0;
  usersBotList = [];
  usersCommentBotList = [];
  userSearchToken = "";
  constructor(public loadingCtrl: LoadingController,public _dataService : DataService,private shareService: ShareService,private platform: Platform) {
     let loader = this.loadingCtrl.create({
      content: "Geting data from database, please wait...",
    });
    loader.present();  
    platform.ready().then(() => {
      this.getUserInfo(loader);
    });
  }
  getUserInfo(loader) : void{
  	console.log('getUserInfo');
  	var myUUID = Device.uuid;
  	console.log(myUUID);
  	if(!myUUID){
  		myUUID = 'D7BACFA9-BFBA-4DA2-B7CA-EE6E19AD4435';
  	}
    this._dataService.user_db.child(myUUID).on('value', data => {
     console.log(data.val());
     if(!data.val()){
     	this.insertNewUser(myUUID,this._dataService);
     }
     else{
     	this.shareService.setUserInfo(data.val());
     	this.userInfo = data.val();
     }
     this.dismisLoading(loader);
    });

    }

    insertNewUser(uuid,dataService) : void{
    	console.log('insert new');
    	var now = new Date();
    	var newUser = {
    		deadline : now.toString(),
    		actived : '0',
    		code : '',
    	}
    	console.log(newUser);
    	var key = uuid;
    	dataService.user_db.child(key).set(newUser);
    	dataService.user_db.child(key).off();
	    this._dataService.user_db.child(key).on('value', data => {
	     	this.shareService.setUserInfo(data.val());
	     	this.userInfo = data.val();
	    });
    }

    dismisLoading(loader) : void {
    		loader.dismissAll();
    }
    openHomeTab(){
    }
}
