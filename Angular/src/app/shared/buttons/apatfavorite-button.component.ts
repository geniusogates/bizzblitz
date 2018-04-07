import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Apatarticle } from '../models';
import { ApatarticlesService, UserService } from '../services';

@Component({
  selector: 'apatfavorite-button',
  templateUrl: './apatfavorite-button.component.html'
})
export class ApatfavoriteButtonComponent {
  constructor(
    private apatarticlesService: ApatarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() apatarticle: Apatarticle;
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
        if (!this.apatarticle.favorited) {
          this.apatarticlesService.favorite(this.apatarticle.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the article
        } else {
          this.apatarticlesService.unfavorite(this.apatarticle.slug)
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