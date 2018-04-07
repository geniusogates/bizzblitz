import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LandarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-landfavorites',
  templateUrl: './profile-landfavorites.component.html'
})
export class ProfileLandfavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  landfavoritesConfig: LandarticleListConfig = new LandarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.landfavoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}
