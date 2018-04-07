import { Component, EventEmitter, TemplateRef, Input, Output } from '@angular/core';
import {Router, ActivatedRoute, Params,  NavigationStart, NavigationEnd} from '@angular/router';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormControl } from '@angular/forms';

import { Apatarticle, User, Comment, Profile } from '../models';
import {ApatarticlesService } from '../services/apatarticles.service';
/////////////////////////////////////////////////////////////////////
//import {ArticlesService } from '../services/articles.service';
import {UserService } from '../services/user.service';
import {ApatcommentsService } from '../services/apatcomments.service';
import {ProfilesService } from '../services/profiles.service';
import { ApatarticleComponent } from '../../article/apatarticle.component';

@Component({
  selector: 'apatarticle-preview',
  templateUrl: './apatarticle-preview.component.html'
})
export class ApatarticlePreviewComponent {
  bsModalRef: BsModalRef;
  private bodyText: string;
  @Input() apatarticle: Apatarticle;
  /////////////////////////////////
  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  @Input() isSubmitting = false;
  @Input() currentUser: User;
  @Input() comments: Comment[];
  @Input() canModify: boolean;
  @Input() commentControl = new FormControl();
  @Input() commentFormErrors = {};
  @Input() isDeleting = false;

  //id: any;
  //listing: any;
  //listings: any;
  //imageUrl: any;

  constructor(
    private apatarticlesService: ApatarticlesService,
     private router:Router,
     private route:ActivatedRoute,
     private profilesService: ProfilesService,
     private userService: UserService,
     private modalService: BsModalService,
     private commentsService: ApatcommentsService
     ) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.populateComments();

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.apatarticle.author.username);
      }
    );
    /*this.bizarticlesService.getListings().subscribe(listings => {
      console.log(listings);
      this.listings = listings
    });
    //Get Id
    this.id = this.route.snapshot.params['id'];
    this.bizarticlesService.getListingDetails(this.id).subscribe(listing =>{
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

    });*/
  }

  onToggleFavorite(favorited: boolean) {
    this.apatarticle['favorited'] = favorited;

    if (favorited) {
      this.apatarticle['favoritesCount']++;
    } else {
      this.apatarticle['favoritesCount']--;
    }
  }

onToggleFollowing(following: boolean) {
    this.apatarticle.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.apatarticlesService.destroy(this.apatarticle.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
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


  openModalWithComponent() {
    const initialState = {
      title: this.apatarticle.name1,//'Modal with component',
      apatarticle: this.apatarticle,
      currentUser: this.currentUser,
      canModify: this.canModify,
      comments: this.comments,
      commentControl: this.commentControl,
      commentFormErrors: this.commentFormErrors,
      isSubmitting: this.isSubmitting,
      isDeleting: this.isDeleting
    };
    this.bsModalRef = this.modalService.show(ApatarticleComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }


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
