import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LikesPage } from '../likes/likes';

import { DataService } from '../../providers/data/data.service';
import { ShareService } from '../../services/ShareService';
import { LoadingController } from 'ionic-angular';
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
  constructor(public loadingCtrl: LoadingController,public _dataService : DataService,private shareService: ShareService) {
  	this.getUserInfo();
  }
  getUserInfo() : void{
  	console.log('getUserInfo');
  	var myUUID = Device.uuid;
  	console.log(myUUID);
  	if(!myUUID){
  		myUUID = 'AAAA-AAAA-AAAA';
  	}
  	let loader = this.loadingCtrl.create({
      content: "Geting data from database, please wait...",
    });
    loader.present();

    this._dataService.db.child('userbase_ios').child(myUUID).on('value', data => {
     console.log(data.val());
     this.loadingComponentCount++;
     if(!data.val()){
     	this.insertNewUser(myUUID,this._dataService);
     }
     else{
     	this.shareService.setUserInfo(data.val());
     	this.userInfo = data.val();
     }
     this.dismisLoading(loader);
    });

    this._dataService.db.child('users').on('value', data => {
         this.usersBotList = data.val();
         this.loadingComponentCount++;
         this.dismisLoading(loader);
         this.shareService.setUserBotList(this.usersBotList);
    });
    // list bot to commebt
    this._dataService.db.child('usercomment').on('value', data => {
         this.usersCommentBotList = data.val();
         this.loadingComponentCount++;
         this.dismisLoading(loader);
         this.shareService.setUserCommentBotList(this.usersCommentBotList);
    });
    this._dataService.db.child('usersearch').on('value', data => {
         this.userSearchToken = data.val();
         this.loadingComponentCount++;
         this.dismisLoading(loader);
         this.shareService.setUserSearchToken(this.userSearchToken);
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
    	dataService.db.child('userbase_ios/'+key).set(newUser);
    	dataService.db.child('userbase_ios/'+key).off();
	    this._dataService.db.child('userbase_ios').child(key).on('value', data => {
	     	this.shareService.setUserInfo(data.val());
	     	this.userInfo = data.val();
	    });
    }

    dismisLoading(loader) : void {
    	if(this.loadingComponentCount == 4){
    		loader.dismissAll();
    		this.loadingComponentCount = 0;
    	}
    }
    openHomeTab(){
    	this.getUserInfo();
    }
}
