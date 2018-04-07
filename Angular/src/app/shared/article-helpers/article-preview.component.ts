import { Component, EventEmitter, TemplateRef, Input , Output } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationStart, NavigationEnd} from '@angular/router';
import * as firebase from 'firebase';
//import { Profile } from '../models';
//import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import * as $ from 'jquery';
import { FormControl } from '@angular/forms';




//import { HomeComponent } from './home.component';
//import { ProfilesService, UserService } from '../services';

import { Article, User, Comment, Profile } from '../models';
import {ArticlesService } from '../services/articles.service';
import {UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import {CommentsService } from '../services/comments.service';
import {ProfilesService } from '../services/profiles.service';
import { ArticleComponent } from '../../article/article.component';
//import { ModalService } from '../services/modal.service';
///////////////////////////////
/*import {
  
  //Comment,
  CommentsService,
  //User,
  UserService,
  ProfilesService
} from '../../shared';*/

@Component({
  //moduleId: module.id,
  selector: 'article-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  bsModalRef: BsModalRef;
  private bodyText: string;
  //modalRef: BsModalRef;
  //modalRef2: BsModalRef;
  @Input() article: Article;
  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  @Input() isSubmitting = false;
  @Input() currentUser: User;
  //@Input() currentUser: any;
  @Input() comments: Comment[];
  @Input() canModify: boolean;
  @Input() commentControl = new FormControl();
  @Input() commentFormErrors = {};
  @Input() isDeleting = false;

  //private _routeScrollPositions: {[url: string]: number} = {};
  //private _subscriptions: Subscription[] = [];

  //id: any;
  //listing: any;
  //listings: any;
  //articles: any;
  //imageUrl: any;
  
  ///////////////////////////////////////
  //article: Article;
  //currentUser: User;
  //canModify: boolean;
  //comments: Comment[];
  //commentControl = new FormControl();
  //commentFormErrors = {};
  //isSubmitting = false;
  //isDeleting = false;

  ///////////////////////////////////////
  

  constructor(
    private articlesService: ArticlesService,
    private profilesService: ProfilesService,
    private userService: UserService,
    public authService: AuthService,
    private router:Router,
    private route:ActivatedRoute,
    //private location: Location,
    //private modalService: ModalService,
    private modalService: BsModalService,
    ////////////////////////////////////////// 
    private commentsService: CommentsService,
    //private userService: UserService
    //////////////////////////////////////////
    
  ) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.populateComments();
    /* this._subscriptions.push(
      // save scroll position on route change
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          // url path without parameters
          let urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url ).split(';',1)[0];
          this._routeScrollPositions[urlPath] = window.pageYOffset;
        }
      })
    );
    // restore scroll position on back or forward
    this.location.subscribe(event => {
        // back or forward, wait for router navigation end
        let routerNavigationEnd = this.router.events.first(event => event instanceof NavigationEnd)
        .subscribe((navigationEndEvent: NavigationEnd) => {
          // url path without parameters
          let urlPath = (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url).split(';',1)[0];
          console.log('scroll to ', this._routeScrollPositions[urlPath] || 0)
          setTimeout(() => {
            window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
          }, 0);
        });
    });
  
*/
  

    /////////////////////////////////
    /*
    this.articlesService.getListings().subscribe(listings => {
      //console.log(listings); article.postVideo
      console.log();
      this.listings = listings
      
    });
    //Get Id
    this.id = this.route.snapshot.params['id'];
    this.articlesService.getListingDetails(this.id).subscribe(listing =>{
      this.listing = listing;
      console.log(listing);
      //@TO DO Storage ref...

      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.listing.path);
      storageRef.child(this.listing.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });

    });
    ////////////////////////////////////////////
    

     /////////////////////////////////
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );
   */
    // Load the current user's data
    /*this.authService.user.subscribe(
      (userData: any) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.displayName === this.article.author.username);
      }
    );*/
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
     
    ////////////////////////////////////////////
  }

/*
    openModalWithComponent() {
    const initialState = {
      list: [
        //'Open a modal with component',
        //'Pass your data',
        //'Do something else',
        //'...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ArticleComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }*/

  /////////////////////////////////////////////////////////////////////////////////
  
  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

  ///////////////////////////////////////////////////////////////////////////////////

  /*ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }*/

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
  

  /*openModal(template: TemplateRef<any>) {
    //this.router.navigateByUrl("['/article', article.slug]");
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }*/
  

  /////////////////////////////
  openModalWithComponent() {
    const initialState = {
      title: this.article.title,//'Modal with component',
      article: this.article,
      currentUser: this.currentUser,
      canModify: this.canModify,
      comments: this.comments,
      commentControl: this.commentControl,
      commentFormErrors: this.commentFormErrors,
      isSubmitting: this.isSubmitting,
      isDeleting: this.isDeleting
    };
    this.bsModalRef = this.modalService.show(ArticleComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  /*

list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        'am really loving this!!'
      ],

  */

  //following toggle....

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          //////////////////////////////////
             const userme = this.currentUser.username;
             const userother = this.profile.username;
          this.profilesService.follow(this.profile.username, userme, userother)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfollow this profile
      } else {
              const userme = this.currentUser.username;
              const userother = this.profile.username;
          this.profilesService.unfollow(this.profile.username, userme, userother)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(false);
            },
            err => this.isSubmitting = false
          );
        }

      }
    )


  }

  
}
