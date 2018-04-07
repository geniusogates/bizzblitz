import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { User, UserService, Profile } from '../shared';

@Component({
  selector: 'profilebiz-page',
  templateUrl: './profilebiz.component.html'
})
export class ProfilebizComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  profile: Profile;
  followings:any;
  followers: any;
  currentUser: User;
  isUser: boolean;

  ngOnInit() {
    this.route.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.followings = data.profile.followingz;
        this.followers = data.profile.followers;
        // Load the current user's data.
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        );
      }
    );



  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }


  openFollowing(followingzz: TemplateRef<any>) {
    this.modalRef = this.modalService.show(followingzz);
  }


  openFollowers(followerz: TemplateRef<any>) {
    this.modalRef = this.modalService.show(followerz);
  }

}
