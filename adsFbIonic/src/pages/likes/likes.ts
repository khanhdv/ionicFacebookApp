import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import {FacebookService} from 'ng2-facebook-sdk/dist';
import { LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';

@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
  providers: [ FacebookService ,DataService ]
})
export class LikesPage implements OnInit{

  constructor(public navCtrl: NavController,private fb: FacebookService,public loadingCtrl: LoadingController,public _data : DataService) {
    console.log('onInit');
    // list bot to like
    this._data.db.child('users').on('value', data => {
         this.usersBotList = data.val();
     });
    // list bot to commebt
    this._data.db.child('usercomment').on('value', data => {
         this.usersCommentBotList = data.val();
     });
  }

  sampleRes = "";
  usersBotList = [];
  usersCommentBotList = [];
  currentId = "";
  postsById = "";
  envAvai = false;
  postList = "";

  ngOnInit() {
    
  }
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
