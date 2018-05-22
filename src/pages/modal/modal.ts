import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/timeout';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  submitted = false;
  dataUser:any;
  Datetest:any;
  Numtest:any;
  id:any

  minDate: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public data: Data,
    public http: Http) {

      this.data.getData().then((data) =>
    {
      console.log(data);
      this.dataUser = data;
      this.id = this.dataUser.id
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage', this.minDate);
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda!',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  batal(){
    this.navCtrl.pop();
  }

  daftar(){
    this.submitted = true

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()

    if(this.Datetest && this.Numtest){
       //apiPost
       console.log(this.Datetest)
       let input = {
        tanggal_uji: this.Datetest,
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/booking_uji.php?no_uji="+this.Numtest+"&user_id="+this.id,input).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Daftar Uji Berhasil',      
            message : 'Kendaraan anda degan nomor uji '+this.Numtest+' berhasil terdaftar',
            buttons: [{
              text: 'Oke',
              handler: data => {
                this.detail(response.data[0])
              }
            }]
          });
          alert.present();
      }
      else if (response.status==402) {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Registrasi Gagal',      
            message : 'Nomor uji belum terdaftar.',
            buttons: ['OK']
          });
          alert.present();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Registrasi Gagal',      
            message : 'Silahkan coba lagi',
            buttons: ['OK']
          });
          alert.present();
      }      
      },(err) => { loading.dismiss(); this.rto()});
      //apiPost
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Gagal',
        subTitle: 'Harap isi borang dengan benar!',      
        buttons: [
          {
            text: 'Refresh',
            handler: data => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
  }

  detail(data){
    this.navCtrl.setRoot(DetailPage, data);
  }


}
