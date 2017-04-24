import { Injectable } from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import firebase from 'firebase';

@Injectable()
export class DataService {
    public db: any;
    public user_db : any;
    constructor() {
      var config = {
          apiKey: "AIzaSyCe85RpQcJuw_0k1FHci0aqgOG-6m-T4u8",
          authDomain: "autofacebook-2dce3.firebaseapp.com",
          databaseURL: "https://autofacebook-2dce3.firebaseio.com",
          projectId: "autofacebook-2dce3",
          storageBucket: "autofacebook-2dce3.appspot.com",
          messagingSenderId: "996448386805"
        };
        firebase.initializeApp(config);
        this.db = firebase.database().ref('/');
        this.user_db = firebase.database().ref('/userbase_ios');
    }
}
