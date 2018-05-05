import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  daftar: any

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController) {

  }

  addVehicle(){
    this.daftar = this.alertCtrl.create({
      title: 'Daftar',
      message: "Masukan nomor polisi kendaraan anda. Tanpa Spasi",
      inputs: [
        {
          name: 'policeNum',
          placeholder: 'Nomor Polisi'
        },
      ],
      buttons: [
        {
          text: 'Batal',
        },
        {
          text: 'Daftar',
          handler: data => {
            this.Reg(data.policeNum);
          }
        }
      ]
    });
    this.daftar.present();
  }

  Reg(data){
    
  }

}
