import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ArticleListConfig, Profile, CararticleListConfig, TagsService, UserService } from '../shared';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'carhome-page',
  templateUrl: './carhome.component.html',
  styleUrls: ['./carhome.component.css']
})
export class CarhomeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private userService: UserService,
    public authService: AuthService,
    private modalService: BsModalService
  ) {}

  isAuthenticated: boolean;
  //listConfig: ArticleListConfig = new ArticleListConfig();
  carListConfig: CararticleListConfig = new CararticleListConfig();
  cararticlesConfig: CararticleListConfig = new CararticleListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;
  profile: Profile;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        };
       // set the article list accordingly--for cararticles...
        if (authenticated) {
          this.setCarListTo('carfeed');
        } else {
          this.setCarListTo('all');
        };
      }
    );

    this.tagsService.getAllC()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });

    //PROFILE..
  this.route.parent.data.subscribe(
    (data: {profile: Profile}) => {
      this.profile = data.profile;
      this.cararticlesConfig = new CararticleListConfig(); // Only method I found to refresh article load on swap
      //this.articlesConfig.filters.author = this.profile.username;
    }
  );
}



  openTags(tagz: TemplateRef<any>) {
    this.modalRef = this.modalService.show(tagz);
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.carListConfig = {type: type, filters: filters};
  }

  setCarListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'carfeed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.carListConfig = {type: type, filters: filters};
  }
}
