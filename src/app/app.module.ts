import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
import { SignUpPage } from "../pages/signup/signup";
import { WelcomePage } from "../pages/welcome/welcome";
import { TabsPage } from "../pages/tabs-page/tabs-page";
import { ContactPage } from "../pages/contact/contact";
import { MapPage } from "../pages/map/map";
import { AboutPage } from "../pages/about/about";
import { PopoverPage } from "../pages/popover/about-popover";
import { SupportPage } from "../pages/support/support";
import { UserExistPopoverPage } from "../pages/popover/userexist-popover";
import { WrongPasswordPopover } from "../pages/popover/wrongpasswordpopover";
import { WrongUserNamePopover } from "../pages/popover/wrongusername-popover";


import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    WelcomePage,
    TabsPage,
    ContactPage,
    MapPage,
    AboutPage,
    PopoverPage,
    SupportPage,
    UserExistPopoverPage,
    WrongPasswordPopover,
    WrongUserNamePopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    WelcomePage,
    TabsPage,
    ContactPage,
    MapPage,
    AboutPage,
    PopoverPage,
    SupportPage,
    UserExistPopoverPage,
    WrongPasswordPopover,
    WrongUserNamePopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider
  ]
})
export class AppModule {}
