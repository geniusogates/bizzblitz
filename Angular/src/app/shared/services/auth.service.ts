import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';


@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  createRandomString: any;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private userService: UserService) { 
    this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
            //////////////////////////////
            if(user.displayName ===null && user.emailVerified ===false){
              user.sendEmailVerification().then(function() {
                  // Email sent.
                }).catch(function(error) {
                  // An error happened.
                });
            }
            ///////
            if(user.displayName ===null && user.emailVerified ===true){
                var emaill = this.userDetails.email;
                emaill=emaill.replace(/@.*/,"");
                console.log(emaill);
                ///////////
                const credentials = ({
                  username: emaill,
                  image: 'https://media.wired.com/photos/59267d4dcefba457b079a273/master/w_1856,c_limit/Grindr-Logo-TA.jpg',
                  email: this.userDetails.email,
                  password: this.userDetails.uid
                });
             //////////
                  console.log('this are credentials-continue page:',credentials);
                  this.userService
                  .Register(credentials)
                  .subscribe(
                    data => this.router.navigateByUrl('/continue'),
                    err => {
                      //this.errors = err;
                  }
                );
             ///////// 
            }
            //////
            //////////////////////////////
            const credentials = ({
              username: this.userDetails.displayName,
              image: this.userDetails.photoURL,
              email: this.userDetails.email,
              password: this.userDetails.uid
            });
            
            console.log('this are credentials-continue page:',credentials);
            this.userService
            .Register(credentials)
            .subscribe(
              data => this.router.navigateByUrl('/continue'),
              err => {
                //this.errors = err;
      }
      );
            /////////////////////////////
            
          }
          else {
            this.userDetails = null;
          }
          
        }
      );

      /////////////////////////////////

             /* this.userService
              .add(this.userDetails)
              .subscribe(
                //updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
                err => {
                  throw err;
                  //this.errors = err;
                }
              );*/
              //this.router.navigateByUrl('/');
  
            ////////////////////////////////
  }


  /////////////////////////////////////
  
  ////////////////////////////////////

  //////////////////////////////////////
  signUpRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
   //const credential = firebase.auth.EmailAuthProvider.credential( email, password );
   //return this._firebaseAuth.auth.createUserWithEmailAndPassword( email, password );
   //////////////////
   //return this._firebaseAuth.auth.createUserWithEmailAndPassword( email, password )
     
       // email: this.emailAddress,
       // password: this.passWord
      //.then(
       // (success) => {
          // let user:any = firebase.auth().currentUser;
          // user.sendEmailVerification().then(
          //   (success) => {console.log("please verify your email")} 
          // ).catch(
           //  (err) => {
               //this.error = err;
           //  }
           //)

       // }).catch(
       //   (err) => {
            //this.error = err;
        //  })
   /////////////////
}
//////////////////////////////////////
login(email: string, password: string) {
    return this._firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {

        ///////////////////////////////////////////////
        this.user = this._firebaseAuth.authState;
        this.user.subscribe(
        (user) => {
          if (user) {
          if(user.displayName ===null && user.emailVerified ===true){
                var emaill = this.userDetails.email;
                emaill=emaill.replace(/@.*/,"");
                console.log(emaill);
                ///////////
                const credentials = ({
                  username: emaill,
                  image: 'https://media.wired.com/photos/59267d4dcefba457b079a273/master/w_1856,c_limit/Grindr-Logo-TA.jpg',
                  email: this.userDetails.email,
                  password: this.userDetails.uid
                });
             //////////
                  console.log('this are credentials-continue page:',credentials);
                  this.userService
                  .Register(credentials)
                  .subscribe(
                    data => this.router.navigateByUrl('/continue'),
                    err => {
                      //this.errors = err;
                  }
                );
             ///////// 
            }
        console.log('Nice, it worked!');

        }
          else {
            this.userDetails = null;
          }
          
        }
      );
      ////////////////////////////////////////////




      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
/////////////////////////////////////
signInRegular(email, password) {
   const credential = firebase.auth.EmailAuthProvider.credential( email, password );
   return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
}
  /////////////////////////////////////
passWordReset(email){
     var emailAddress = email;
        ////
        this._firebaseAuth.auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
          }).catch(function(error) {
          // An error happened.
          });
        ///
  }
  ////////////////////////////////////
  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }


  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }


  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }


  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

}
