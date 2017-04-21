
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
  commentbot : any;
  type : any;
  botName : any;
  listBotCommentToken =[];
  commentContent = '';
  id : any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private fb: FacebookService,
  ) {
   this.post = params.get('post');
   this.likebot = params.get('likebot');
   this.commentbot = params.get('commentbot');
   this.type = params.get('type');
   this.id = params.get('id');
   console.log(this.id);
   this.getListBooCommentTokenAndName(this.commentbot);
  }
  getListBooCommentTokenAndName(data){
    for (var key in data){
      this.listBotCommentToken.push({
        'token' : data[key].access_token.split(";")[1],
        'name' : data[key].access_token.split(";")[0],
        'id' : key ? key : 100016321961318,
      })
    }
    console.log(this.listBotCommentToken);
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
    var listRandomToken = [];
    var listToken = [];
    for(var key in this.likebot){
       listToken.push(this.likebot[key].access_token);
    }
    var num = 0;
    for(var i =1;i <= this.likeqty * 1.5 ; i++){
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

  onChange(value){
  }
  submitComment(botName){
     console.log('submitComment');
     console.log(botName);
     console.log(this.commentContent);

    for(var key in botName){
      var params = {
        access_token : botName[key],
        method : 'post',
        message : this.commentContent,
      }
      if(this.post.object_id)
        var posturl = '/'+this.post.object_id+'/comments?message='+this.commentContent+'&access_token='+botName[key];
      else if(this.post.id)
        var posturl = '/'+this.post.id+'/comments?message='+this.commentContent+'&access_token='+botName[key];
      console.log(posturl);
      this.fb.api(posturl,'post',params).then(
        (response) => {
          console.log(response);
          alert(response);
        },
        (error: any) => {
          alert(error);
          console.error(error);
        }
      ); 
    }
     this.botName = [];
  }

}