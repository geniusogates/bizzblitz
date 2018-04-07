import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Cararticle } from '../models';
import { CararticlesService, UserService } from '../services';

@Component({
  selector: 'carfavorite-button',
  templateUrl: './carfavorite-button.component.html'
})
export class CarfavoriteButtonComponent {
  constructor(
    private cararticlesService: CararticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() cararticle: Cararticle;
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
        if (!this.cararticle.favorited) {
          this.cararticlesService.favorite(this.cararticle.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the article
        } else {
          this.cararticlesService.unfavorite(this.cararticle.slug)
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
