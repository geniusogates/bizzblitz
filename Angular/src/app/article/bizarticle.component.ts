import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Bizarticle, User, Comment } from '../shared/models';
import {BizcommentsService } from '../shared/services/bizcomments.service';
import {BizarticlesService } from '../shared/services/bizarticles.service';
import {UserService } from '../shared/services/user.service';

/*import {
  //Bizarticle,
  //BizarticlesService,
  //Comment,
  //CommentsService,
  //BizcommentsService,
  //User,
  //UserService
} from '../shared';*/

@Component({
  selector: 'bizarticle-page',
  templateUrl: './bizarticle.component.html'
})
export class BizarticleComponent implements OnInit {
  bizarticle: Bizarticle;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private bizarticlesService: BizarticlesService,
    private commentsService: BizcommentsService,
    private router: Router,
    public bsModalRef: BsModalRef,
    private userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.bizarticle);
    console.log(this.currentUser);
    console.log(this.comments);
    console.log(this.bizarticle.author);
    // Retreive the prefetched article
    /*this.route.data.subscribe(
      (data: { bizarticle: Bizarticle }) => {
        this.bizarticle = data.bizarticle;

        // Load the comments on this article
        this.populateComments();
      }
    );*/

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.bizarticle.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.bizarticle.favorited = favorited;

    if (favorited) {
      this.bizarticle.favoritesCount++;
    } else {
      this.bizarticle.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.bizarticle.author.following = following;
  }

  deleteBizArticle() {
    this.isDeleting = true;

    this.bizarticlesService.destroy(this.bizarticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/bizeditor');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.bizarticle.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.bizarticle.slug, commentBody)
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
    this.commentsService.destroy(comment.id, this.bizarticle.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
