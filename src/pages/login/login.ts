import { Component,OnInit,ViewChild  } from '@angular/core';
import { NavController,Slides, PopoverController, LoadingController, ToastController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { NgForm } from '@angular/forms';

import { Login } from "../../interfaces/user-options";
import { SignUp } from "../../interfaces/user-options";
import { TabsPage } from "../tabs-page/tabs-page";
import { SignUpPage } from "../signup/signup";

import { WrongUserNamePopover } from "../popover/wrongusername-popover";
import { WrongPasswordPopover } from "../popover/wrongpasswordpopover";

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
    //user:any;
    LoginUser: Login;
    username: ''; password: '';
    submitted = false;
    ReceivedUserData: SignUp[] = [];
    private correctCredentials = false;
	private wrongUsername = false;
	private wrongPassword = false;
	private formSubmitted = false;

	// Info messages
	private msgWrongCredentials = "Wrong username or password!";
	private msgLoggedin = "You successfully logged in! Redirecting...";
	private msgAlreadyLoggedin = "You seem to be already logged in.";

    //Inject the formbuilder into the constructor
    constructor(private fb:FormBuilder, 
                public navCtrl: NavController,
                //private router: Router,
                private db: UserDataProvider,
                public popoverCtrl: PopoverController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController) {}
     
    ngOnInit() {
        this.loginForm  = this.fb.group({
            username:['',[Validators.required]],
            password:['',[Validators.required]],
            })
        }

    public onFormSubmit() {
        if(this.loginForm.valid) {
            //this.submitted = true;;
            this.LoginUser = this.loginForm.value;
            console.log(this.LoginUser);
            /* Any API call logic via services goes here */

            this.db.mongoSelect("users", "{mobileNo:'" + this.LoginUser.username + "'}").subscribe(
                data => {
                    this.ReceivedUserData = data;
                    if (data.length === 0) {
                        this.wrongUsername = true;
                        // let popover = this.popoverCtrl.create(WrongUserNamePopover);
                        // popover.present();
                        this.presentToast();
                        console.log("wrong username");
                        console.log(data);
                    } else if ((this.ReceivedUserData[0].mobileNo == this.LoginUser.username) && (this.ReceivedUserData[0].password == this.LoginUser.password)) {
                        console.log("mobile number matched");
                    // } else if (bcrypt.compareSync(fileForm.password, data[0].password)) {
                        // localStorage.removeItem("id"); localStorage.removeItem("session");
                        // localStorage.setItem("session", Math.random().toString(36).slice(2));
                        // localStorage.setItem("id", data[0].id);
                        // this.db.mongoUpdate("users", "{id:" + data[0].id + "}", { session: localStorage.getItem("session") }).subscribe(
                        //     data => false,
                        //     error => console.log(error),
                        //     () => this.auth.login());
                        this.correctCredentials = true;
                        this.formSubmitted = true;
                        setTimeout(() => {
                            //this.router.navigate(['Home']);
                        }, 1000);
                        this.navCtrl.push(TabsPage);
                    } else {
                        this.wrongPassword = true;
                        // let popover = this.popoverCtrl.create(WrongPasswordPopover);
                        // popover.present();
                        this.presentToast();
                        console.log("wrong password");
                    }
                }
            );
        }
    }

    onSignup() {
      this.navCtrl.push(SignUpPage);
    }

    presentToast(){
        {
            let toast = this.toastCtrl.create({
              message: 'You have entered wrong Username or Password',
              duration: 3000,
              position: 'middle',
              closeButtonText: 'Close',
              showCloseButton: true,
            });
          
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
          
            toast.present();
          }
    }

  
}
