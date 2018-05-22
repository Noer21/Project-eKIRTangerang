import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import { HomePage } from '../home/home';
import { Detail2homePage } from '../detail2home/detail2home';
import { EditKirPage } from '../edit-kir/edit-kir';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';


import 'rxjs/add/operator/timeout';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  temp:any;
  no:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http,
    public data: Data) {

      this.temp = this.navParams.data;
      console.log(this.temp);
      this.no = this.temp.no_uji
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverPage, {key1:this.temp});
    popover.present({
      ev: myEvent
    });
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

  back(){
    this.navCtrl.setRoot(Detail2homePage)
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
