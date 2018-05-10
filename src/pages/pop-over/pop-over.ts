import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditKirPage } from '../edit-kir/edit-kir';
import { HomePage } from '../home/home';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverPage');
  }

  editKir(){
    this.navCtrl.push(EditKirPage)
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
            this.navCtrl.setRoot(HomePage);
            //delete post
          }
        }
      ]
    });
    prompt.present();
  }

}
