import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CararticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-carfavorites',
  templateUrl: './profile-carfavorites.component.html'
})
export class ProfileCarfavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  carfavoritesConfig: CararticleListConfig = new CararticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.carfavoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}
