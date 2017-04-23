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
	carrierName: 'VMS';
	cardserinum : '';
	cardnum : '';
  freecode : '';
	listCarrier : ['VIETTEL','VMS','VNP'];
	myNumber : '01676128384';
  pet: string = "puppies";
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
	var url = 'https://www.nganluong.vn/mobile_card.api.post.v2.php?func=CardCharge&version=2.0&merchant_id=47851&merchant_account=vuducthanh2410@gmail.com&merchant_password=9025f3d087afc28cbcd8313726592ea9&pin_card='+this.cardnum+'&card_serial='+this.cardserinum+'&ref_code='+this.myUUID+'&type_card='+this.carrierName+'&client_fullname=123456&client_email=1234567&client_mobile=01676128384';

    console.log(url);
    http2.open("POST", url, true);
    http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http2.withCredentials = true;
    var params = {
    	'func' : 'CardCharge',
    	'version' : '2.0',
    	'merchant_id' : '47851',
    	'merchant_account' : 'vuducthanh2410@gmail.com',
    	'merchant_password' : '9025f3d087afc28cbcd8313726592ea9',
    	'pin_card' : this.cardnum,
    	'card_serial' : this.cardserinum,
    	'ref_code' : '01676128384',
    	'type_card' : this.carrierName,
    	'client_fullname' : '123456',
    	'client_email' : '1234567',
    	'client_mobile' : this.myUUID,
    }

    // sample success response : 00|47851|vuducthanh2410@gmail.com|9546346133641|57951706623|VIETTEL|3BB5565A-D4B2-4627-BCEA-2AD2C8AC2203|123456|1234567|01676128384|30000|24150|68014073
    // sample error response : 07|47851|vuducthanh2410@gmail.com|9548181232480|57952002362|VIETTEL|ABC|123456|1234567|123456|||
    var formData = new FormData();
    for(var key in params){
    	formData.append(key,params[key]);
    }
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
    http2.send(formData);
  }
  sendCardNum(){
  	console.log('send' + this.carrierName + this.cardserinum + this.cardnum);
  	this.testSendCardSeries();
  }
  sendFreeCode(){
    console.log('send free code' + this.freecode);
  }
  onChange(){
  }
}
