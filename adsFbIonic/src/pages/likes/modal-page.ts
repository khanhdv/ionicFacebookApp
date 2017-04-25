
import { Component,OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {FacebookService} from 'ng2-facebook-sdk/dist';
import { LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController
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
    if(likeqty > 100 || likeqty < 0){
      alert('Only limit 100 likes per request!');
      return;
    }
    var listRandomToken = [];
    var listToken = [];
    for(var key in this.likebot){
       listToken.push(this.likebot[key].access_token);
    }
    var num = 0;
    var sucessnum = 0;
    var numFail = 0;
    for(var i =1;i <= this.likeqty ; i++){
      var item = listToken[Math.floor(Math.random()*listToken.length)];
      listRandomToken.push(item);
    }
    let loader = this.loadingCtrl.create({
      content: "Adding likes,please wait...",
    });
    var hasProcess = false;
    //loader.present();
    if(listRandomToken.length < 1){
      loader.dismissAll();
    }

    for(var key in listRandomToken){
      var params = {
        access_token : listRandomToken[key],
        method : 'post',
      }
      num++;

      if(this.post.id)
        var posturl = '/'+this.post.id+'/likes';
      else if(this.post.object_id)
        var posturl = '/'+this.post.object_id+'/likes';
      console.log(posturl);
      this.fb.api(posturl,'post',params).then(
        (response) => {
          console.log(response);
          //alert(response);
          sucessnum++;
          if(sucessnum + numFail > listRandomToken.length -1){
            console.log(sucessnum + numFail);
            console.log(listRandomToken.length -1);
            if(!hasProcess){
              this.processLike(sucessnum);
              hasProcess = true;
            }
            
            loader.dismissAll();
          }
        },

        (error: any) => {
          numFail++;
          console.error(error);
          if(sucessnum + numFail> listRandomToken.length -1){
            console.log(sucessnum + numFail);
            console.log(listRandomToken.length -1);
            if(!hasProcess){
              this.processLike(sucessnum);
              hasProcess = true;
            }
            loader.dismissAll();
          }
        }
      ); 
    }
  }

  onChange(value){
  }
  processSuccess(num){
    console.log('success' + num);
    alert(num + ' comments added!');
  }
  processLike(num){
    console.log('success' + num);
    alert(num + ' likes added!');
  }
  submitComment(botName){
     console.log('submitComment');
     console.log(botName);
     console.log(this.commentContent);
     var numComment = 0;
     var numFail = 0;
     var count = 0;
    let loader = this.loadingCtrl.create({
      content: "Adding comment,please wait...",
    });
    if(botName.length < 1){
      alert('Please select bot to comment');
    }
    else{
      loader.present();
    }
    for(var key in botName){
      var params = {
        access_token : botName[key],
        method : 'post',
        message : this.commentContent,
      }
      count++;
      if(this.post.id)
        var posturl = '/'+this.post.id+'/comments?message='+this.commentContent+'&access_token='+botName[key];
      else if(this.post.object_id)
        var posturl = '/'+this.post.object_id+'/comments?message='+this.commentContent+'&access_token='+botName[key];
      console.log(posturl);
      this.fb.api(posturl,'post',params).then(
        (response) => {
          console.log(response);
          //alert(response);
          numComment++;
          if(numComment + numFail > botName.length -1){
            this.processSuccess(numComment);
            loader.dismissAll();
          } 
        },
        (error: any) => {
          //alert(error);
          console.error(error);
          numFail++;
          if(numComment + numFail > botName.length -1){
            this.processSuccess(numComment);
            loader.dismissAll();
          } 
        }
      ); 
    }
     this.botName = [];
  }

}