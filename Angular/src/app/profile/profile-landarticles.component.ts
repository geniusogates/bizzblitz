import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LandarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-landarticles',
  templateUrl: './profile-landarticles.component.html'
})
export class ProfileLandarticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  landarticlesConfig: LandarticleListConfig = new LandarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.landarticlesConfig = new LandarticleListConfig(); // Only method I found to refresh article load on swap
        this.landarticlesConfig.filters.author = this.profile.username;
      }
    );
  }

}
