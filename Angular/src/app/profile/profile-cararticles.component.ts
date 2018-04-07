import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CararticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-cararticles',
  templateUrl: './profile-cararticles.component.html'
})
export class ProfileCararticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  cararticlesConfig: CararticleListConfig = new CararticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.cararticlesConfig = new CararticleListConfig(); // Only method I found to refresh article load on swap
        this.cararticlesConfig.filters.author = this.profile.username;
      }
    );
  }

}
