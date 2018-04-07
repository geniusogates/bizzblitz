import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';

import { Profile } from '../models';
import { ProfilesService } from '../services/profiles.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
  currentUser: User;

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        
      }
    )
  }

  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
             const userme = this.currentUser.username;
             const userother = this.profile.username;
          this.profilesService.follow(this.profile.username, userme, userother)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

          

        // Otherwise, unfollow this profile
      } else {
             const userme = this.currentUser.username;
             const userother = this.profile.username;
             //this.profilesService.unfollowF(userme, userother);
          this.profilesService.unfollow(this.profile.username, userme, userother)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(false);
            },
            err => this.isSubmitting = false
          );
        }

      }
    )


  }

}
