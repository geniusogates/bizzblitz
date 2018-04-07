import { Component, OnInit } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  //currentUser: User;
  currentUser: any;

  ngOnInit() {
    
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
    /*this.authService.user.subscribe(
      (userData) => {
        this.currentUser = userData;
       // console.log(this.currentUser.photoURL);
      }
    )*/
  }

  /*navigate(){
    //this.router.navigateByUrl('/');
    window.location.href='http://localhost:4200/';
  }*/


}
