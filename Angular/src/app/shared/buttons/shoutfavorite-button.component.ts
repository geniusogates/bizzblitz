import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Shoutarticle } from '../models';
import { ShoutarticlesService, UserService } from '../services';

@Component({
  selector: 'shoutfavorite-button',
  templateUrl: './shoutfavorite-button.component.html'
})
export class ShoutfavoriteButtonComponent {
  constructor(
    private shoutarticlesService: ShoutarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() shoutarticle: Shoutarticle;
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
        if (!this.shoutarticle.favorited) {
          this.shoutarticlesService.favorite(this.shoutarticle.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the article
        } else {
          this.shoutarticlesService.unfavorite(this.shoutarticle.slug)
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
