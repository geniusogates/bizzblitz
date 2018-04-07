import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Bizarticle } from '../models';
import { BizarticlesService, UserService } from '../services';

@Component({
  selector: 'bizfavorite-button',
  templateUrl: './bizfavorite-button.component.html'
})
export class BizfavoriteButtonComponent {
  constructor(
    private bizarticlesService: BizarticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() bizarticle: Bizarticle;
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
        if (!this.bizarticle.favorited) {
          this.bizarticlesService.favorite(this.bizarticle.slug)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the article
        } else {
          this.bizarticlesService.unfavorite(this.bizarticle.slug)
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
