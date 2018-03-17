import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides, PopoverController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignUp } from "../../interfaces/user-options";


import { TabsPage } from "../tabs-page/tabs-page";
import { UserExistPopoverPage } from "../popover/userexist-popover";
import { UserDataProvider } from "../../providers/user-data/user-data";


@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    signupForm: FormGroup;
    signupdata: SignUp;

    signupdataInput: SignUp; // Declare the signupForm 
    // user: any;
    data: any;
    //Inject the formbuilder into the constructor
    //=====================================================================
    private user: SignUp;
	private formSubmitted = false;
	private usernameAlreadyExists = false;

	// Info messages
	private msgUsernameAlreadyExists = "Username already exists!";
    private msgUserAdded = "User added successfully! Redirecting...";
    //========================================================================
    constructor(private fb: FormBuilder, 
                private db: UserDataProvider, 
                public navCtrl: NavController,
                public popoverCtrl: PopoverController,
                public loadingCtrl: LoadingController) { }

    ngOnInit() {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required,
            Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
            // lastname:['',[Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
            dob: ['', [Validators.required]],

            email: ['', [Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // password: this.fb.group({
            //     pwd: ['', [Validators.required, 
            //                Validators.minLength(8)]],
            //     confirmPwd: ['', [Validators.required,
            //                       Validators.minLength(8)]]
            // }),

            // gender: ['', Validators.required],
            // mobno:['',[Validators.required]],
            mobileNo: ['', [Validators.required,
            Validators.pattern("[0-9]*"),
            Validators.maxLength(10),
            Validators.minLength(10)]],

            password: ['', [Validators.required,
            Validators.minLength(8)]],

            address: ['', [Validators.required]],

            pincode: ['', [Validators.maxLength(6),
            Validators.minLength(6),
            Validators.pattern("[0-9]*"),
            Validators.required]],


            checkbox: ['', [Validators.requiredTrue]]
            // terms: ['', Validators.requiredTrue]
        })


    }


    public onFormSubmit(event: Event) {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
          });
          loader.present();
        if (this.signupForm.valid) {
            this.signupdata = this.signupForm.value;
            // this.signupdata.username = this.signupdataInput.username;
            // this.signupdata.dob = this.signupdataInput.dob;
            // this.signupdata.email = this.signupdataInput.email;
            // this.signupdata.mobileNo = this.signupdataInput.mobileNo;
            // this.signupdata.address = this.signupdataInput.address;
            // this.signupdata.pincode = this.signupdataInput.pincode;
            // this.signupdata.password = this.signupdataInput.password;
            console.log(this.signupdata.username);
            console.log(this.signupdata);
            //================================================
            this.db.mongoSelect("users", "{mobileNo:'" + this.signupdata.mobileNo + "'}").subscribe(
                data => {
                    console.log(data);
                    if (data.length > 0) {
                        this.usernameAlreadyExists = true;
                        console.log(this.usernameAlreadyExists);
                        let popover = this.popoverCtrl.create(UserExistPopoverPage);
                        popover.present();
                        //popover.present({ ev: event }); //use this to position popover at the point of click on screen
                        // popover.present({
                        //     ev: myEvent
                        // });
                    } else {
                        // Select the max user ID
                        this.db.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
                            data => {
                                // the new user will have maxID+1
                                // this.user = new ISignUp(data[0].id + 1,
                                //                           signupdata.username,
                                //                         //   bcrypt.hashSync(userForm.password, bcrypt.genSaltSync(10)),
                                //                           userForm.email,
                                //                           userForm.role,
                                //                           "");
                                // this.db.users.push(this.user);
                                this.db.mongoInsert("users", this.signupdata).subscribe();
                            }
                        );
                        this.formSubmitted = true;
                        setTimeout(() => {
                            this.formSubmitted = false;
                            // this.router.navigate(['../../Upload']);
                        }, 2000);
                        this.navCtrl.push(TabsPage);
                    }
                }
            );

        }
            /* Any API call logic via services goes here */
        }


    
    get username() {
        return this.signupForm.get('username');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get mobileNo() {
        return this.signupForm.get('mobileNo');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get address() {
        return this.signupForm.get('address');
    }
    get pincode() {
        return this.signupForm.get('pincode');
    }
    get checkbox() {
        return this.signupForm.get('checkbox');
    }

    // CustId:number;
    // FName:string;
    // LName:string;
    // Dob:Date;
    // Email:string;
    // MobNo:number;




}
