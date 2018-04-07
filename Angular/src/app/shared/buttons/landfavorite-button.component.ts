import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Landarticle } from '../models';
import { LandarticlesService, UserService } from '../services';

@Component({
  selector: 'landfavorite-button',
  templateUrl: './landfavorite-button.component.html'
})
export class LandfavoriteButtonComponent {
  constructor(
    private landarticlesService: LandarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() landarticle: Landarticle;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.landarticle.favorited) {
          this.landarticlesService.favorite(this.landarticle.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the article
        } else {
          this.landarticlesService.unfavorite(this.landarticle.slug)
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
