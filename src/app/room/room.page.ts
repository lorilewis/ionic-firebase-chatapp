import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AddRoomPage } from '../add-room/add-room.page';
import { HomePage } from '../home/home.page';
import * as firebase from 'Firebase';


@Component({
  selector: 'page-room',
  templateUrl: 'room.page.html',
})
export class RoomPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key) {
    this.navCtrl.setRoot(HomePage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};