import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Shoutarticle, User, Comment } from '../shared/models';
import {ShoutcommentsService } from '../shared/services/shoutcomments.service';
import {ShoutarticlesService } from '../shared/services/shoutarticles.service';
import {UserService } from '../shared/services/user.service';

/*import {
  //Shoutarticle,
  //ShoutarticlesService,
  //Comment,
  //CommentsService,
  //ShoutcommentsService,
  //User,
  //UserService
} from '../shared';*/

@Component({
  selector: 'shoutarticle-page',
  templateUrl: './shoutarticle.component.html'
})
export class ShoutarticleComponent implements OnInit {
  
  shoutarticle: Shoutarticle;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  

  constructor(
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private shoutarticlesService: ShoutarticlesService,
    private commentsService: ShoutcommentsService,
    private router: Router,
    private userService: UserService,
    //public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    /*this.route.data.subscribe(
      (data: { shoutarticle: Shoutarticle }) => {
        this.shoutarticle = data.shoutarticle;

        // Load the comments on this article
        this.populateComments();
      }
    );*/

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.shoutarticle.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.shoutarticle.favorited = favorited;

    if (favorited) {
      this.shoutarticle.favoritesCount++;
    } else {
      this.shoutarticle.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.shoutarticle.author.following = following;
  }

  deleteShoutArticle() {
    this.isDeleting = true;

    this.shoutarticlesService.destroy(this.shoutarticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/shouthome');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.shoutarticle.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.shoutarticle.slug, commentBody)
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
    this.commentsService.destroy(comment.id, this.shoutarticle.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
