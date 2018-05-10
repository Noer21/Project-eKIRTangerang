import { Component } from '@angular/core';
import { NavController, AlertController, ModalController  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  daftar: any

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {

  }

  detail(){
    this.navCtrl.push(DetailPage)
  }

  addVehicle() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  // add(){
  //   this.daftar = this.alertCtrl.create({
  //     title: 'Daftar',
  //     message: "Masukan nomor polisi kendaraan anda. Tanpa Spasi",
  //     inputs: [
  //       {
  //         name: 'policeNum',
  //         placeholder: 'Nomor Polisi'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Batal',
  //       },
  //       {
  //         text: 'Daftar',
  //         handler: data => {
  //           this.Reg(data.policeNum);
  //         }
  //       }
  //     ]
  //   });
  //   this.daftar.present();
  // }

}
