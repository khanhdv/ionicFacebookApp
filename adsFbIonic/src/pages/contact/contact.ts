import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	myUUID : any;
	carrierName: 'VIETTEL';
	cardserinum : '';
	cardnum : '';
	listCarrier : ['VIETTEL','MOBI','VINA'];
  constructor(public navCtrl: NavController,private http:Http) {
  	console.log(Device.uuid);
  	this.myUUID = Device.uuid;
  }
  // go to facebook page
  goToFacebookPage() : void {
  	let windowObjectReference;
    windowObjectReference = window.open("https://www.facebook.com/groups/ung.dung.quang.cao/","_system");
  }
  testSendCardSeries(){
	var http2 = new XMLHttpRequest();
	var url = 'https://www.nganluong.vn/mobile_card.api.post.v2.php?func=CardCharge&version=2.0&merchant_id=47851&merchant_account=vuducthanh2410@gmail.com&merchant_password=9025f3d087afc28cbcd8313726592ea9&pin_card='+this.cardnum+'&card_serial='+this.cardserinum+'&ref_code=ABC&type_card='+this.carrierName+'&client_fullname=123456&client_email=1234567&client_mobile='+this.myUUID;
	console.log(url);
    var params = "func=CardCharge&version=2.0&merchant_id=47851&merchant_account=vuducthanh2410@gmail.com&merchant_password=9025f3d087afc28cbcd8313726592ea9&pin_card=9548181232480&card_serial=57952002362&ref_code=ABC&type_card=VIETTEL&client_fullname=123456&client_email=1234567&client_mobile="+this.myUUID;

    http2.open("POST", url, true);

    http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http2.onreadystatechange = function() {
        if (http2.readyState == 4 && http2.status == 200) {
        	console.log(http2.responseText);
        	var result = http2.responseText.substring(0,2);
        	console.log(result);
        	if(result == '00'){
        		alert('Success!!');
        	}
        	else{
        		alert('Error' + http2.responseText);
        	}
        }
    }
    http2.send(params);
  }
  sendCardNum(){
  	console.log('send' + this.carrierName + this.cardserinum + this.cardnum);
  	this.testSendCardSeries();
  }
  onChange(){
  }
}
