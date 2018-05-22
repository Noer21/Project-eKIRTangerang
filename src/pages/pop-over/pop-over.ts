import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EditKirPage } from '../edit-kir/edit-kir';
import { HomePage } from '../home/home';

import 'rxjs/add/operator/timeout';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { Detail2homePage } from '../detail2home/detail2home';
/**
 * Generated class for the PopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {

  temp:any;
  no:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public data: Data,
    public loadCtrl: LoadingController) {
      console.log(this.navParams.data);
      this.temp = this.navParams.get('key1');
      this.no = this.temp.no_uji
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverPage');
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda!',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.push(Detail2homePage);
          }
        }
      ]
    });
    alert.present();
  }

  editKir(data){
    this.navCtrl.push(EditKirPage, data)
  }

  hapusKir(){
    let prompt = this.alertCtrl.create({
      title: 'Hapus pendaftaran KIR',
      message: "Apakah anda yakin ingin menghapus pendaftaran ini?",
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
            this.haps()
          }
        }
      ]
    });
    prompt.present();
  }

  haps(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()

    this.http.get(this.data.BASE_URL+"/delete_kir.php?no_uji="+this.no).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Uji KIR berhasil dihapus',
          subTitle: 'Jadwal uji KIR dengan nomor uji ' + this.no + ' berhasil dihapus',      
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                console.log('oke click')
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
