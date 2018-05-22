import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProfilPage } from '../profil/profil';

import 'rxjs/add/operator/timeout';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';

/**
 * Generated class for the UbahPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ubah-password',
  templateUrl: 'ubah-password.html',
})
export class UbahPasswordPage {

  Newpassconf:any;
  Newpass:any;
  Userpassword:any;
  dataUser:any;
  id:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public data : Data,
    public http: Http
    ) {

      this.data.getData().then((data) =>
    {
      console.log(data);
      this.dataUser = data;
      this.id = this.dataUser.id
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbahPasswordPage');
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(ProfilPage);
          }
        }
      ]
    });
    alert.present();
  }

  confirm(){
    let prompt = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: "Masukan kata sandi lama anda untuk melanjutkan",
      inputs: [
        {
          name: 'pass',
          placeholder: 'password',
          type : 'password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.pass);
            this.Userpassword = data.pass;
            this.save();
          }
        }
      ]
    });
    prompt.present();
  }

  save(){

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present()

    if(this.Newpass && this.Newpassconf && this.Userpassword){
      //Jika semua data telah diinput
      if(this.Newpass == this.Newpassconf){
        // jika password baru dengan konfirmasi pasword sama
        let input = {
          old_password: this.Userpassword,
          new_password: this.Newpass,
        };
        console.log(input);
        this.http.post(this.data.BASE_URL+"/edit_password.php?id="+this.id,input).timeout(7000).subscribe(data => {
        let response = data.json();
        console.log(response); 
        if(response.status==200){    
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Ubah password berhasil',      
              message : 'Password anda telah berhasil diubah.',
              buttons: [{
                text: 'Ok',
                handler: data => {
                  this.data.logout();
                  this.data.login(response.data,"user");//ke lokal
                  this.navCtrl.setRoot(ProfilPage);
                  loading.dismiss();
                }
              },]
            });
            alert.present();
        }
        else if(response.status==401) {
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Ubah password Gagal',      
              message : 'Password yang anda masukan salah!',
              buttons: [{
                text: 'Ok',
                handler: data => {
                  this.navCtrl.setRoot(ProfilPage);
                  loading.dismiss();
                }
              },]
            });
            alert.present();
        }
        else {
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Ubah password Gagal',      
              message : 'Silahkan coba lagi',
              buttons: [{
                text: 'Ok',
                handler: data => {
                  this.navCtrl.setRoot(ProfilPage);
                  loading.dismiss();
                }
              },]
            });
            alert.present();
        }   
        },(err) => { loading.dismiss(); this.rto()});
        //apiPost
      }
      else{
        // jika password baru dengan konfirmasi pasword beda
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Ubah password gagal.',      
            message : 'Pastikan password baru dengan konfirmasi pasword baru sama.',
            buttons: [{
              text: 'Ok',
              handler: data => {
                loading.dismiss();
              }
            },]
          });
          alert.present();
      }
    }
    else{
      //jika ada borang yang kosng
      loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Ubah password gagal.',      
            message : 'Pastikan semua botang terisi dengan benar.',
            buttons: [{
              text: 'Ok',
              handler: data => {
                loading.dismiss();
              }
            },]
          });
          alert.present();
    }
    
  }

}
