import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk/dist';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
  providers: [ FacebookService ]
})
export class LikesPage {
	sampleRes = "";
  constructor(public navCtrl: NavController,private fb: FacebookService,public loadingCtrl: LoadingController) {

  }
  currentId = "";
  postsById = "";
  url = '/10202967337398238_10210107860906863?fields=id,message,created_time,story,from,comments.summary(true),likes.summary(true)&access_token=EAACEdEose0cBALtlLUM4WsiMlaK1hUGD2J1hlTmYePgJakZCE1otmqXxZB2eVK1ENlGv0mJ14K1nYq2ZBJNzoMKuGUKAWstLxXdkYfPZBUCHNdeCSC4DBpMRILPNbysHGZCISItyjd7V4ReoAT8IEPg6jnWqMYePMUf0t6ZAf2ZBQZDZD&limit=30';
  envAvai = false;

  searchFacebookByID(event) : void{
  	this.currentId = event.target.value;
  	this.envAvai = false;
  	if (this.currentId == null || this.currentId == "" || this.currentId == undefined ){
  		return;
  	}
  	let posturl = '/'+this.currentId+'/posts?&access_token=EAACEdEose0cBALtlLUM4WsiMlaK1hUGD2J1hlTmYePgJakZCE1otmqXxZB2eVK1ENlGv0mJ14K1nYq2ZBJNzoMKuGUKAWstLxXdkYfPZBUCHNdeCSC4DBpMRILPNbysHGZCISItyjd7V4ReoAT8IEPg6jnWqMYePMUf0t6ZAf2ZBQZDZD&limit=10';
  	console.log(posturl);
  	// call search posts
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
  	this.fb.api(posturl,'get',{}).then(
      (response: FacebookLoginResponse) => {let body = JSON.stringify(response);this.postsById = body;alert(JSON.stringify(response));console.log(response);loader.dismissAll();this.envAvai = true;},
      (error: any) => {console.error(error);loader.dismissAll();this.envAvai = false;}
    );

  }

  //test function
   someFunction(event): void {
    this.fb.api(this.url,'get',{}).then(
      (response: FacebookLoginResponse) => {let body = response['message'];this.sampleRes = body;console.log(response);alert(JSON.stringify(response));},
      (error: any) => console.error(error)
    );
  }

  handlerSearchResponse(jsonData): void{

  }
}
