import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';

import 'rxjs/add/operator/timeout';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { ProfilPage } from '../profil/profil';

/**
 * Generated class for the EditProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html',
})
export class EditProfilPage {

  dataUser:any;
  Useremail:any;
  Username:any;
  Userktp:any;
  Useraddress:any;
  Userphone:any;
  Userpassword:any;
  status="password";
  id:any;
  lihat = true;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http) {

      this.data.getData().then((data) =>
    {
      console.log(data);
      this.dataUser = data;

      this.Username = this.dataUser.name;
      this.Useraddress = this.dataUser.alamat;
      this.Userktp = this.dataUser.ktp_num;
      this.Userphone = this.dataUser.phone_num;
      this.Useremail=this.dataUser.email;
      this.Userpassword = this.dataUser.password;
      this.id=this.dataUser.id
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilPage');
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(EditProfilPage);
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

  confirm(){
    let prompt = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: "Masukan kata password anda untuk melanjutkan",
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

    if(this.Useraddress && this.Useremail && this.Username && this.Userphone && this.Userpassword && this.Userktp){
      //apiPost
      let input = {
        name : this.Username,
        alamat : this.Useraddress,
        ktp_num : this.Userktp,
        phone_num : this.Userphone,
        email : this.Useremail,
        password : this.Userpassword,
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/edit_profile.php?id="+this.id,input).timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Sunting berhasil',      
            message : 'Data diri anda telah berhasil diubah.',
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
            title: 'Sunting Gagal',      
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
            title: 'Sunting Gagal',      
            message : 'Email yang anda masukan sudah terdaftar',
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
      let alert = this.alertCtrl.create({
        title: 'Gagal Menyunting',
        subTitle: 'Isi semua borang dengan benar!',      
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
