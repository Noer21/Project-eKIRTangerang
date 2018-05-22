import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController  } from 'ionic-angular';

import 'rxjs/add/operator/timeout';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { ProfilPage } from '../profil/profil';
/**
 * Generated class for the RiwayatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-riwayat',
  templateUrl: 'riwayat.html',
})
export class RiwayatPage {

  daftar: any;
  cars:any;
  dataUser:any;
  id:number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public data: Data,
    public http: Http) {

      
  }

  ionViewWillEnter() {
    this.data.getData().then((data) => {
      console.log(data);
      this.id= data.id
      this.getVehicle();  
    })
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(ProfilPage);
          }
        }
      ]
    });
    alert.present();
  }

  getVehicle(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()
    
    let  temp = this.id;
    this.http.get(this.data.BASE_URL+"/riwayat_kir.php?user_id="+temp).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      console.log(this.id); 
      if(response.status==200){    
        this.cars = response.data;
        console.log(this.cars)
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Something Wrong',      
            message : 'Mohon buka dan tutup aplikasi',
            buttons: ['OK']
          });
          alert.present();
      }    
      },(err) => { loading.dismiss(); this.rto()});
  }

}
