import { EventEmitter } from '@angular/core';

export class ShareService {  
  
    usersBotList: '';
    usersCommentBotList: '';
    userSearchToken : string;
    userInfo : '';
    constructor() {
    }
    setUserBotList(data) {
        this.usersBotList = data;  
    }
    getUserBotList() {
        return this.usersBotList;
    }
    setUserCommentBotList(data) {
        this.usersCommentBotList = data;  
    }
      
    getUserCommentBotList() {
        return this.usersCommentBotList;
    }
    setUserSearchToken(data) {
        this.userSearchToken = data;  
    }
      
    getUserSearchToken() {
        return this.userSearchToken;
    } 
    setUserInfo(data){
        this.userInfo = data;
        this.userUpdated.emit(this.userInfo);
    }  
    getUserInfo(){
        return this.userInfo;
    }
    userUpdated = new EventEmitter();
}