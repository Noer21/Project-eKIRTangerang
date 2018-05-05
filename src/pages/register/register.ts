import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submitted = false;
  status = "password";
  lihat = true;
  checked = false

  showPassword(){
    this.status = "text";
    this.lihat = false;
    console.log(this.status);
  }

  hidePassword(){
    this.status = "password";
    this.lihat = true;
    console.log(this.status);
  }

  
  signUp(data){
    this.submitted = true;
    if(this.checked==false){
      this.notacc()
    }
    else{
      this.navCtrl.setRoot(HomePage)
    }
  }

  acc(){
    this.checked = true
    console.log(this.checked)
  }

  notacc(){
    let alert = this.alertCtrl.create({
      title: 'Syarat & Ketentuan',
      subTitle: 'Untuk dapat mendaftar, anda harus menyetujui syarat dan ketentuan.',
      buttons: ['OK']
    });
    alert.present();
  }

}
