import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { ModalPage } from '../modal/modal';
import 'rxjs/add/operator/timeout';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
    console.log(this.navCtrl.length())
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
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

  detail(data){
    this.navCtrl.setRoot(DetailPage, data)
  }

  addVehicle() {
    this.navCtrl.push(ModalPage)
  }

  getVehicle(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()
    
    let  temp = this.id;
    this.http.get(this.data.BASE_URL+"/all_kendaraan.php?user_id="+temp).timeout(7000).subscribe(data => {
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
