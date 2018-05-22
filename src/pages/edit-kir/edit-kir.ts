import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import 'rxjs/add/operator/timeout';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { Detail2homePage } from '../detail2home/detail2home';

/**
 * Generated class for the EditKirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-kir',
  templateUrl: 'edit-kir.html',
})
export class EditKirPage {

  temp:any;
  no:any;
  tanggalUji:any;

  minDate: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public loadCtrl : LoadingController,
    public http : Http,
    public data : Data
    ) {

      this.temp = this.navParams.data;
      this.no = this.temp.no_uji
      console.log(this.temp.tanggal_uji);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditKirPage');
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda!',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  save(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()
    let input = {
      tanggal_uji: this.tanggalUji,
    };
    this.http.post(this.data.BASE_URL+"/edit_kir.php?no_uji="+this.no, input).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Sunting Uji Berhasil',      
            message : 'Kendaraan anda degan nomor uji '+this.no+' berhasil disunting',
            buttons: [
              {
                text: 'Ok',
                handler: data => {
                  this.navCtrl.push(Detail2homePage);
                }
              }
            ]
          });
          alert.present();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'hapus Gagal',      
            message : 'Silahkan coba lagi',
            buttons: ['OK']
          });
          alert.present();
      }      
      },(err) => { loading.dismiss(); this.rto()});
  }

}
