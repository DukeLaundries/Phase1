import { Component,OnInit,ViewChild  } from '@angular/core';
import { NavController,Slides  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { NgForm } from '@angular/forms';

import {  ILogin } from "../../interfaces/user-options";
import { TabsPage } from "../tabs-page/tabs-page";
import { SignUpPage } from "../signup/signup";

import { UserDataProvider } from "../../providers/user-data/user-data";





@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


// export class LoginPage {
//     login: ILogin = { username: '', password: '' };
//     submitted = false;
  
//     constructor(public navCtrl: NavController, public userData: UserDataProvider) { }
  
//     onLogin(form: NgForm) {
//       this.submitted = true;
  
//       if (form.valid) {
//         this.userData.login(this.login.username);
//         this.navCtrl.push(TabsPage);
//       }
//     }
  
//     onSignup() {
//       this.navCtrl.push(SignUpPage);
//     }
//   }


export class LoginPage implements OnInit {
    // @ViewChild(Slides) slides: Slides;
    loginForm: FormGroup; // Declare the loginForm 
    user:any;
    username: ''; password: '';
    submitted = false;
    //Inject the formbuilder into the constructor
    constructor(private fb:FormBuilder, public navCtrl: NavController) {}
     
    ngOnInit() {
        this.loginForm  = this.fb.group({
            username:['',[Validators.required]],
            password:['',[Validators.required]],
            })
        }

    public onFormSubmit() {
        if(this.loginForm.valid) {
            this.submitted = true;;
            this.user = this.loginForm.value;
            console.log(this.user);
            /* Any API call logic via services goes here */
        }
    }

        onSignup() {
      this.navCtrl.push(SignUpPage);
    }
  
}
