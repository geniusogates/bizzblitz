import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Cararticle, User, Comment } from '../shared/models';
import {CarcommentsService } from '../shared/services/carcomments.service';
import {CararticlesService } from '../shared/services/cararticles.service';

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
  selector: 'cararticle-page',
  templateUrl: './cararticle.component.html'
})
export class CararticleComponent implements OnInit {
  cararticle: Cararticle;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private cararticlesService: CararticlesService,
    private commentsService: CarcommentsService,
    private router: Router,
    public bsModalRef: BsModalRef
    //private userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.cararticle);
    console.log(this.currentUser);
    console.log(this.comments);
    console.log(this.cararticle.author);
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
    this.cararticle.favorited = favorited;

    if (favorited) {
      this.cararticle.favoritesCount++;
    } else {
      this.cararticle.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.cararticle.author.following = following;
  }

  deleteCarArticle() {
    this.isDeleting = true;

    this.cararticlesService.destroy(this.cararticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/careditor');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.cararticle.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.cararticle.slug, commentBody)
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
    this.commentsService.destroy(comment.id, this.cararticle.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
