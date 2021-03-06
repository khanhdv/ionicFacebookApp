import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import {FacebookService} from 'ng2-facebook-sdk/dist';
import { LoadingController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ModalContentPage } from './modal-page';

@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
  providers: [ FacebookService ]
})
export class LikesPage implements OnInit{

  constructor(public navCtrl: NavController,private fb: FacebookService,public loadingCtrl: LoadingController,public _data : DataService,public modalCtrl: ModalController) {
    console.log('onInit');
    // list bot to like
    let loader = this.loadingCtrl.create({
      content: "Initialize list bot,Please wait...",
    });
    loader.present();
    this._data.db.child('users_ionic').on('value', data => {
         this.usersBotList = data.val();
     });
    // list bot to commebt
    this._data.db.child('usercomment_ionic').on('value', data => {
         this.usersCommentBotList = data.val();
         loader.dismissAll();
     });
    this._data.db.child('usersearch').on('value', data => {
         this.userSearchToken = data.val();
     });
  }

  sampleRes = "";
  usersBotList = [];
  usersCommentBotList = [];
  userSearchToken = "";
  currentId = "";
  postsById = "";
  envAvai = false;
  postList: any;
  shouldShowCancel : true;
  cordova: any;
  ngOnInit() {
    
  }
  searchFacebookByID(event) : void{
    event.preventDefault();
    this.currentId = event.target.value;
    this.envAvai = false;
    if (this.currentId == null || this.currentId == "" || this.currentId == undefined ){
      return;
    }
    var searchTokenList = this.userSearchToken.split(';');
    var tokenValue = searchTokenList[Math.floor(Math.random()*searchTokenList.length)];
    if(!this.userSearchToken){
      var defaultToken = 'EAAAAUaZA8jlABAAfVM4REYR73Q6fs9C5BG5cJZAoVbjWY3lr9cy15L4jNBFiYzqYzmdal5CblOOaw90cGYpFTbe3Gbhu0YxMsVy6d6vc1z1sZA3OD2uyqktwrcJqS8LS2QVYu79GTnslH3teWw7THetrWaK5HJkMOwPcFoqAQrOymaKAwyu';
    }
    else{
      //var defaultToken = this.userSearchToken;
      //var defaultToken = 'EAAAAUaZA8jlABAAfVM4REYR73Q6fs9C5BG5cJZAoVbjWY3lr9cy15L4jNBFiYzqYzmdal5CblOOaw90cGYpFTbe3Gbhu0YxMsVy6d6vc1z1sZA3OD2uyqktwrcJqS8LS2QVYu79GTnslH3teWw7THetrWaK5HJkMOwPcFoqAQrOymaKAwyu';
      var defaultToken = tokenValue;
    }
    let posturl = '/'+this.currentId+'/posts?&access_token='+defaultToken+'&limit=30';
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
        loader.dismissAll();
        this.envAvai = true;
        this.handlerSearchResponse(response.data);
      },

      (error: any) => {
        console.error(error);
        loader.dismissAll();
        this.envAvai = false;
      }
    );

  }
  openLikeModal(post) {
    console.log(post);
    let modal = this.modalCtrl.create(ModalContentPage, {'post' : post,'likebot' : this.usersBotList,'commentbot' : this.usersCommentBotList,'type' : 'LIKE' , 'id' : this.currentId});
    modal.present();
  }
  openCommentModal(post) {
    console.log(post);
    let modal = this.modalCtrl.create(ModalContentPage, {'post' : post,'likebot' : this.usersBotList,'commentbot' : this.usersCommentBotList,'type' : 'COMMENT', 'id' : this.currentId});
    modal.present();
  }
  handlerSearchResponse(jsonData): void{
      this.postList = jsonData;
      if(this.postList.length > 0){
        for(var key in this.postList){
          if(this.postList[key].from.id){
            this.currentId = this.postList[key].from.id;
            break;
          }
          break;
        }

      }
      console.log(this.postList);
  }
  closeKeyboard(){
    //this.cordova.plugins.Keyboard.close();
  }
}

