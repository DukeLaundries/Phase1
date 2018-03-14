import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ISignUp } from "../../interfaces/user-options";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    signupForm: FormGroup;
    signup: ISignUp; // Declare the signupForm 
    user: any;
    //Inject the formbuilder into the constructor
    constructor(private fb: FormBuilder) { }

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


    public onFormSubmit() {
        if (this.signupForm.valid) {
            this.signup = this.signupForm.value;
            console.log(this.signup);
            /* Any API call logic via services goes here */
        }


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
