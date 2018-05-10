import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RiwayatPage } from '../riwayat/riwayat';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  keluar(){
    let prompt = this.alertCtrl.create({
      title: 'Sign Out',
      message: "Apakah anda yakin ingin keluar aplikasi",
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ya',
          handler: data => {
            this.navCtrl.setRoot(LoginPage);
            //session over
          }
        }
      ]
    });
    prompt.present();
  }

  riwayat(){
    this.navCtrl.push(RiwayatPage)
  }

  

}
