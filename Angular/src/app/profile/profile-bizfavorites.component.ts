import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BizarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-bizfavorites',
  templateUrl: './profile-bizfavorites.component.html'
})
export class ProfileBizfavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  bizfavoritesConfig: BizarticleListConfig = new BizarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.bizfavoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}
