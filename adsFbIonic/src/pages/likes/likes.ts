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
  url = '/10202967337398238_10210107860906863?fields=id,message,created_time,story,from,comments.summary(true),likes.summary(true)&access_token=EAAAAUaZA8jlABAAfVM4REYR73Q6fs9C5BG5cJZAoVbjWY3lr9cy15L4jNBFiYzqYzmdal5CblOOaw90cGYpFTbe3Gbhu0YxMsVy6d6vc1z1sZA3OD2uyqktwrcJqS8LS2QVYu79GTnslH3teWw7THetrWaK5HJkMOwPcFoqAQrOymaKAwyu&limit=30';
  envAvai = false;
  postList = "";
  pictureList = "";
  searchFacebookByID(event) : void{
  	this.currentId = event.target.value;
  	this.envAvai = false;
  	if (this.currentId == null || this.currentId == "" || this.currentId == undefined ){
  		return;
  	}
  	let posturl = '/'+this.currentId+'/posts?&access_token=EAAAAUaZA8jlABAAfVM4REYR73Q6fs9C5BG5cJZAoVbjWY3lr9cy15L4jNBFiYzqYzmdal5CblOOaw90cGYpFTbe3Gbhu0YxMsVy6d6vc1z1sZA3OD2uyqktwrcJqS8LS2QVYu79GTnslH3teWw7THetrWaK5HJkMOwPcFoqAQrOymaKAwyu&limit=30';
  	console.log(posturl);
  	// call search posts
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
  	this.fb.api(posturl,'get',{}).then(
      (response) => {
        let body = JSON.stringify(response);
        this.postsById = body;
        console.log(response);
        loader.dismissAll();
        this.envAvai = true;
        this.handlerSearchResponse(response.data);
      },

      (error: any) => {
        console.error(error);
        loader.dismissAll();
        this.envAvai = false;}
    );

  }

  handlerSearchResponse(jsonData): void{
      this.postList = jsonData;

  }
}
