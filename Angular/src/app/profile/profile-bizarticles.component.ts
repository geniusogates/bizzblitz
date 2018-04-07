import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BizarticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-bizarticles',
  templateUrl: './profile-bizarticles.component.html'
})
export class ProfileBizarticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  bizarticlesConfig: BizarticleListConfig = new BizarticleListConfig();

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.bizarticlesConfig = new BizarticleListConfig(); // Only method I found to refresh article load on swap
        this.bizarticlesConfig.filters.author = this.profile.username;
      }
    );
  }

}
