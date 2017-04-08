import { Component,OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {FacebookService} from 'ng2-facebook-sdk/dist';
@Component({
  templateUrl: 'modal-content.html',
   providers: [ FacebookService ]
})
export class ModalContentPage {
  post;
  likeqty = 0;
  likebot : any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private fb: FacebookService,
  ) {
   console.log('Post content', params.get('post'));
   this.post = params.get('post');
   this.likebot = params.get('likebot');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  submitLikes(likeqty){
    this.likeqty = likeqty;
    var num = 0;
    if(likeqty > 100 || likeqty < 0){
      this.likeqty = 1;
    }
    console.log('like num ' + this.likeqty);
    console.log(this.likebot);
    var listRandomToken = [];
    var listToken = [];
    for(var key in this.likebot){
       listToken.push(this.likebot[key].access_token);
    }
    var num = 0;
    for(var i =1;i <= this.likeqty ; i++){
      var item = listToken[Math.floor(Math.random()*listToken.length)];
      listRandomToken.push(item);
    }

    for(var key in listRandomToken){
      var params = {
        access_token : listRandomToken[key],
        method : 'post',
      }
      if(this.post.object_id)
        var posturl = '/'+this.post.object_id+'/likes';
      else if(this.post.id)
        var posturl = '/'+this.post.id+'/likes';
      console.log(posturl);
      this.fb.api(posturl,'post',params).then(
        (response) => {
          console.log(response);
          alert(response);
        },

        (error: any) => {
          console.error(error);
        }
      ); 
    }
  }
}