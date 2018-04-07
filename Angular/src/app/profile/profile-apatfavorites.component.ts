import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApatarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-apatfavorites',
  templateUrl: './profile-apatfavorites.component.html'
})
export class ProfileApatfavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  apatfavoritesConfig: ApatarticleListConfig = new ApatarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.apatfavoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}