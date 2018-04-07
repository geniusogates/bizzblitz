import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Article, User, Comment } from '../shared/models';
import {CommentsService } from '../shared/services/comments.service';
import {ArticlesService } from '../shared/services/articles.service';
import {UserService } from '../shared/services/user.service';





/*import {
  //Article,
  //ArticlesService,
  //Comment,
  //CommentsService,
  //User,
  //UserService
} from '../shared';*/



@Component({
  selector: 'article-page',
  //selector: 'modal-content',
  templateUrl: './article.component.html'
})


export class ArticleComponent implements OnInit {
  //private _routeScrollPositions: {[url: string]: number} = {};
  //private _subscriptions: Subscription[] = [];  modal-content
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    private location: Location,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    console.log(this.article);
    console.log(this.currentUser);
    console.log(this.comments);
    console.log(this.article.author);
    //this.populateComments();
    //console.log(this.currentUser);
    ////////////////////////////////
/*
     this._subscriptions.push(
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
    /////////////////////////////////this.route.data.subscribe(
      /////////
/*
       this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );*/
      /////////
   /*   this.route.data.subscribe(data => {
    //console.log(params['edit']);
    //console.log(params['other']);
        this.article = data.article;
        console.log(this.article);
        //console.log(this.article.slug);

        // Load the comments on this article
        //this.populateComments();
});*/


    // Retreive the prefetched article
   /* this.route.data.subscribe(
      (data: ) => {
        this.article = data.article;

        // Load the comments on this article
        //this.populateComments();
      }
    );*/

    // Load the current user's data .userService
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

   
  }

  

  /*ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
*/
  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }
  

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;
    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/editor');
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


}
