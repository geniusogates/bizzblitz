import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApatarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-apatarticles',
  templateUrl: './profile-apatarticles.component.html'
})
export class ProfileApatarticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  apatarticlesConfig: ApatarticleListConfig = new ApatarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.apatarticlesConfig = new ApatarticleListConfig(); // Only method I found to refresh article load on swap
        this.apatarticlesConfig.filters.author = this.profile.username;
      }
    );
  }

}
