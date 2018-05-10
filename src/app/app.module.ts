import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { KeluarPage } from '../pages/keluar/keluar';
import { ProfilPage } from '../pages/profil/profil';
import { RiwayatPage } from '../pages/riwayat/riwayat';
import { DetailPage } from '../pages/detail/detail';
import { ModalPage } from '../pages/modal/modal';
import { EditKirPage } from '../pages/edit-kir/edit-kir';
import { PopOverPage } from '../pages/pop-over/pop-over';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    KeluarPage,
    ProfilPage,
    RiwayatPage,
    DetailPage,
    EditKirPage,
    PopOverPage,
    EditKirPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    KeluarPage,
    ProfilPage,
    RiwayatPage,
    DetailPage,
    EditKirPage,
    PopOverPage,
    EditKirPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
