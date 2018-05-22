import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RiwayatPage } from '../riwayat/riwayat';
import { Data } from '../../providers/data';

import 'rxjs/add/operator/timeout';
import { Http } from '@angular/http';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { UbahPasswordPage } from '../ubah-password/ubah-password';
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

  dataUser:any;
  email:any;
  telpon:any;
  ktp:any;
  alamat:any;
  nama:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public data: Data,
    public loadCtrl: LoadingController,
    public http: Http) {
      
      this.data.getData().then((data) =>
    {
      console.log(data);
      this.dataUser = data;
      this.email = this.dataUser.email;
      this.nama = this.dataUser.name;
      this.alamat = this.dataUser.alamat;
      this.ktp = this.dataUser.ktp_num;
      this.telpon = this.dataUser.phone_num;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  get

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
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
            //session over
            this.data.logout();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    prompt.present();
  }

  riwayat(){
    this.navCtrl.push(RiwayatPage)
  }

  editProfile(){
    this.navCtrl.push(EditProfilPage)
  }

  change(){
    this.navCtrl.push(UbahPasswordPage);
  }
  

}
