import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Landarticle, User, Comment } from '../shared/models';
import {LandcommentsService } from '../shared/services/landcomments.service';
import {LandarticlesService } from '../shared/services/landarticles.service';

import {
  //Bizarticle,
  //BizarticlesService,
  //Comment,
  //CommentsService,
  //BizcommentsService,
  //User,
  UserService
} from '../shared';

@Component({
  selector: 'landarticle-page',
  templateUrl: './landarticle.component.html'
})
export class LandarticleComponent implements OnInit {
  landarticle: Landarticle;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private landarticlesService: LandarticlesService,
    private commentsService: LandcommentsService,
    private router: Router,
    public bsModalRef: BsModalRef
    //private userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.landarticle);
    console.log(this.currentUser);
    console.log(this.comments);
    console.log(this.landarticle.author);
    // Retreive the prefetched article
    /*this.route.data.subscribe(
      (data: { bizarticle: Bizarticle }) => {
        this.bizarticle = data.bizarticle;

        // Load the comments on this article
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.bizarticle.author.username);
      }
    );*/
  }

  onToggleFavorite(favorited: boolean) {
    this.landarticle.favorited = favorited;

    if (favorited) {
      this.landarticle.favoritesCount++;
    } else {
      this.landarticle.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.landarticle.author.following = following;
  }

  deleteLandArticle() {
    this.isDeleting = true;

    this.landarticlesService.destroy(this.landarticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/landeditor');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.landarticle.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.landarticle.slug, commentBody)
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
    this.commentsService.destroy(comment.id, this.landarticle.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
