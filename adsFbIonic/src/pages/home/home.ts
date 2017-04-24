import { Component } from '@angular/core';
import { ShareService } from '../../services/ShareService';
import * as moment from 'moment';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleRes = "";
  userInfo : '';
  userInfoString ={
  	activated : "False",
  	code : "False",
  	deadline : '',
  };
  constructor(public navCtrl: NavController,private shareService: ShareService) {
  }
  ngOnInit() {
    this.shareService.userUpdated.subscribe(
      (userInfo) => {
        this.userInfo = this.shareService.getUserInfo();
        console.log(this.userInfo);
        this.userInfoString = this.convertInfo(this.userInfo);
      }
    );
  }
  convertInfo(data){
  	var string = {
  		activated : "False",
  		code : "False",
  		deadline : '',
  	};
  	if(data.activated == "1"){
  		string.activated = "true";
  	}
  	if(data.code){
  		string.code = data.code;
  	}
  	if(data.deadline){
  		var date = moment(data.deadline).format('DD-MM-YYYY');
  		string.deadline = date;
  	}
  	return string;
  }
}
