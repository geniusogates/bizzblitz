import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../shared/models';

import { ArticleListConfig, Profile, TagsService, UserService } from '../shared';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;
  profile: Profile;
  articlesConfig: ArticleListConfig = new ArticleListConfig();
  currentUser: User;
  length: Number;
  private users: User[]=[];
  searchTerm:any;
  results = this.users;
  search:any;
  count:any;
  isSearchUser:boolean=false;
  isSearchTags:boolean=false;
  isSearchTags2:boolean=false;
  followings: any;
  followers: any;
  follower: any;

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
      }
    );
    

    //user subscription....
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.followings = this.currentUser.followingz || "";
        this.followers = this.currentUser.followers || "";
        console.log(this.followings);
        console.log(this.followers);
      }
    )
    /*this.userService.users.subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      }
    )*/

    //loading all users getAllUsers()
    this.userService.getAllUsers()
      .subscribe(data => this.users = data);
      ////////////////
      this.count = this.users.length;
    //////////////////

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });

    //

    //PROFILE..
  this.route.parent.data.subscribe(
    (data: {profile: Profile}) => {
      this.profile = data.profile;
      this.articlesConfig = new ArticleListConfig(); // Only method I found to refresh article load on swap
      //this.articlesConfig.filters.author = this.profile.username;
    }
  );
}


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  openFollowing(following: TemplateRef<any>) {
    this.modalRef = this.modalService.show(following);
  }


  openFollowers(followerz: TemplateRef<any>) {
    this.modalRef = this.modalService.show(followerz);
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
    this.listConfig = {type: type, filters: filters};
  }


  searchd(): void {
    let term = this.searchTerm;
    console.log(this.searchTerm);
    this.results = this.results.filter(function(tag) {
      //if(term){
        return tag.username.toLowerCase().includes(term.toLowerCase()) || tag.email.toLowerCase().includes(term.toLowerCase()) || tag.bio.toLowerCase().includes(term.toLowerCase());
      //}if(tag.description){
      //  return tag.description.toLowerCase().indexOf(term) >= 0;
     // } indexOf
     //return tag.title.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }); 
}

///////////////////////////
searchProps(){    
    this.userService.getUsersByName(this.search.toLowerCase()).subscribe(data => { 
      this.users = data
    });
    this.count = this.users.length;
  }

//////////////////////////
toggleUserSearch(){
     this.isSearchUser = !this.isSearchUser
   }
/////////////////////////

//////////////////////////
toggleTagsSearch(){
     this.isSearchTags = !this.isSearchTags
   }
/////////////////////////

//////////////////////////
toggleTags2Search(){
     this.isSearchTags2 = !this.isSearchTags2
   }
/////////////////////////

}
