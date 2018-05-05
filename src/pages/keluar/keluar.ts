import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the KeluarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-keluar',
  templateUrl: 'keluar.html',
})
export class KeluarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keluar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeluarPage');
  }

  keluar(){
    this.navCtrl.setRoot(LoginPage)
  }

}
