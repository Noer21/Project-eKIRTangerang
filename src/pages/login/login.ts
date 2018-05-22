import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';

import 'rxjs/add/operator/timeout';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  submitted = false;
  status = "password";
  lihat = true;
  Email:any;
  Password:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private data : Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http) {
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

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

  register(){
    this.navCtrl.push(RegisterPage)
  }

  signIn(){
    this.submitted = true

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    if(this.Email && this.Password){
    
      //apiPost
      let input = {
        email: this.Email, 
        password: this.Password
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/login_user.php",input).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.data.logout();
        this.data.login(response.data,"user");//ke lokal
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login Gagal',      
            message : 'Email dan Password yang anda masukan tidak cocok.',
            buttons: ['OK']
          });
          alert.present();
      }    
      },(err) => { loading.dismiss(); this.rto()});
      //apiPost    
    }
    else{
      loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login Gagal',      
            message : 'Mohon isi semua borang dengan benar.',
            buttons: ['OK']
          });
          alert.present();
    }
  }
}
