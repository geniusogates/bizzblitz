import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Apatarticle, User, Comment } from '../shared/models';
import {ApatcommentsService } from '../shared/services/apatcomments.service';
import {ApatarticlesService } from '../shared/services/apatarticles.service';

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
  selector: 'apatarticle-page',
  templateUrl: './apatarticle.component.html'
})
export class ApatarticleComponent implements OnInit {
  apatarticle: Apatarticle;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private apatarticlesService: ApatarticlesService,
    private commentsService: ApatcommentsService,
    private router: Router,
    public bsModalRef: BsModalRef
    //private userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.apatarticle);
    console.log(this.currentUser);
    console.log(this.comments);
    console.log(this.apatarticle.author);
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
    this.apatarticle.favorited = favorited;

    if (favorited) {
      this.apatarticle.favoritesCount++;
    } else {
      this.apatarticle.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.apatarticle.author.following = following;
  }

  deleteBizArticle() {
    this.isDeleting = true;

    this.apatarticlesService.destroy(this.apatarticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/apateditor');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.apatarticle.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.apatarticle.slug, commentBody)
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
    this.commentsService.destroy(comment.id, this.apatarticle.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
