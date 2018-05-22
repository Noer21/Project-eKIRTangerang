import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import 'rxjs/add/operator/timeout';

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

  Username:any;
  Email:any;
  Telphone:any;
  Password:any;
  KTPnum:any;
  Address:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private data : Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submitted = false;
  status = "password";
  lihat = true;
  checked = false;

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

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()

    if(this.Username && this.Email && this.Telphone && this.Password && this.KTPnum){
      if(this.checked==false){
        this.notacc()
      }
      else{  
        //apiPost
        let input = {
          email: this.Email, 
          password: this.Password,
          nama: this.Username,
          phone_num: this.Telphone,
          ktp_num: this.KTPnum,
          alamat: this.Address
        };
        console.log(input);
        this.http.post(this.data.BASE_URL+"/register_user.php",input).timeout(7000).subscribe(data => {
        let response = data.json();
        console.log(response); 
        if(response.status==200){    
          this.data.logout();
          this.data.login(response.data,"user");//ke lokal
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
        else if(response.status==405) {
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Registrasi Gagal',      
              message : 'Email yang anda masukan sudah terdaftar.',
              buttons: ['OK']
            });
            alert.present();
        }
        else {
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Registrasi Gagal',      
              message : 'Cek Jaringan Anda',
              buttons: ['OK']
            });
            alert.present();
        }   
        },(err) => { loading.dismiss(); this.rto()});
        //apiPost   
      }
    }
    else{
      loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Registrasi Gagal',      
            message : 'Mohon isi semua borang dengan benar.',
            buttons: ['OK']
          });
          alert.present();
    }
    
  }

  acc(){
    if (this.checked == false)
      this.checked = true;
    else
    this.checked = false;
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
