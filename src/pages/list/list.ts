import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  rules: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public data: Data,) {

      this.getRule();
    
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(ListPage);
          }
        }
      ]
    });
    alert.present();
  }

  getRule(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    this.http.get(this.data.BASE_URL+"/get_rule.php").timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.rules = response.data;
      }   
      },(err) => { loading.dismiss(); this.rto()});
  }


}
