// import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   currentDate;
//   constructor(public navCtrl: NavController) {
//     this.currentDate = new Date();}

// }


import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
   selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
currentDate;
items = [];
ref = firebase.database().ref('items/');
firstName: string = '';  
lastName: string = '';

constructor(public navCtrl: NavController, private inBrowser: InAppBrowser) { 
  this.currentDate = new Date();  
  this.ref.on('value', resp => {
      this.items = snapshotToArray(resp);
    });
  }
 addItem(item) {
   if(item !== undefined && item !== null){
let newItem = this.ref.push();
newItem.set(item);
this.firstName = '';
this.lastName = '';
   }
 }

 async deleteItem(key) {
   firebase.database().ref('items/'+key).remove();
 }

 showPreview(){
   this.inBrowser.create("https://github.com/apache/cordova-plugin-inappbrowser", '_self')
 }


}
