import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';

import { Errors, UserService } from '../shared';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'continue-page',
  templateUrl: './continue.component.html'
})
export class ContinueComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  flash: any;
  user = null;
  userDetails: any;
  continueAs: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService
    //private _flashMessagesService: FlashMessagesService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
     /* // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }*/
    });
    ///////////////////////////////////////
    this.authService.user.subscribe(
      (userData) => {
        this.userDetails = userData;
       // console.log(this.currentUser.photoURL);
      }
    )
    //////////////////////////////////////
    if(this.userDetails.displayName === null){
      var emaill = this.userDetails.email;
                emaill=emaill.replace(/@.*/,"");
                console.log(emaill);
      this.continueAs = this.userDetails.email;
    }else{this.continueAs = this.userDetails.displayName;}
    
    //////////////////////////////////////
  }

  login(){
      //this.isSubmitting = true;
      const credentials = ({
              //username: this.userDetails.displayName,
              email: this.userDetails.email,
              password: this.userDetails.uid
            });
            
            console.log('this are credentials-continue page:',credentials);
            this.userService
            .Login(credentials)
            .subscribe(
              data => this.router.navigateByUrl('settings'),
              err => {
                this.errors = err;
      }
      );
      //this.router.navigate(["/same/route/path?refresh=1"]);
      //this.router.navigateByUrl('settings'),
  }

  submitForm() {
    this.isSubmitting = true;
    /*if (this.authType === 'register') {
      this._flashMessagesService.show('We have sent you an email to the email account you provided, kindly click on the link provided in the email to verify. The email we sent may not be in your inbox, if you dont see it check other folders like spam, social etc... ', { cssClass: 'alert-success', timeout: 180000 });
    }*/
    this.errors = new Errors();
    //console.log(this.user1);  
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/settings'),
      err => {
        this.errors = err;
        /*//console.log(this.errors);
        //this.error = err;
        //if(this.errors){this.isSubmitting = false;}else{this.isSubmitting = true;}
        //this.flash = err;
        if(this.isSubmitting = false)
        {this.flash === 7}else{this.flash === 6}
        console.log(this.isSubmitting);

        /////////////
      //if(this.errors){
      if (this.authType === 'register' && this.flash === 6) {
      this._flashMessagesService.show('We have sent you an email to the email account you provided, kindly click on the link provided in the email to verify. The email we sent may not be in your inbox, if you dont see it check other folders like spam, social etc... ', { cssClass: 'alert-success', timeout: 180000 });
      }
     //}*/
        /////////////
     }
    );
    ///////////////
    console.log(this.isSubmitting);
    //////////////
  }
/////////////////////////////////////////////////////////////////
signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['editor'])
        })
      .catch((err) => console.log(err));
    }

}
