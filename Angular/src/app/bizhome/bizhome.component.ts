import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ArticleListConfig, Profile, BizarticleListConfig, TagsService, UserService } from '../shared';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'bizhome-page',
  templateUrl: './bizhome.component.html',
  styleUrls: ['./bizhome.component.css']
})
export class BizhomeComponent implements OnInit {
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
  bizListConfig: BizarticleListConfig = new BizarticleListConfig();
  bizarticlesConfig: BizarticleListConfig = new BizarticleListConfig();
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
       // set the article list accordingly--for bizarticles...
        if (authenticated) {
          this.setBizListTo('bizfeed');
        } else {
          this.setBizListTo('all');
        };
      }
    );

    this.tagsService.getAllB()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });

    //PROFILE..
  this.route.parent.data.subscribe(
    (data: {profile: Profile}) => {
      this.profile = data.profile;
      this.bizarticlesConfig = new BizarticleListConfig(); // Only method I found to refresh article load on swap
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
    this.bizListConfig = {type: type, filters: filters};
  }

  setBizListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'bizfeed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.bizListConfig = {type: type, filters: filters};
  }
}
