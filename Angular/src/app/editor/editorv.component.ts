import { Component, NgZone, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
//import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';

import { ActivatedRoute, Router } from '@angular/router';

import { Article, ArticlesService } from '../shared';

@Component({
  selector: 'editorv-page',
  templateUrl: './editorv.component.html'
})
export class EditorvComponent implements OnInit {
  videoId: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  fireimage: any;
  src: any;
  folder: any;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  //private zone: NgZone;
  //private options: Object;
  //private progress: number = 0;
  //private response: any = {};
  article: Article = new Article();
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  description: any;
  video: any;
  uploadComplete: any;
  uploadStarted: any;

  // FOR HUNDLING FILE UPLOAD......

  uploadFile: any;
  /*hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'https://nameless-sea-34133.herokuapp.com/api/video',
    //filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpg'],
    calculateSpeed: true
  };
  sizeLimit = 25000000;*/
  /*handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }*/
  //https://nameless-sea-34133.herokuapp.com/api/img
 //--------------------------------
  /*handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      //data= data.response;
      this.uploadFile = data;
       // data.response;
      console.log(this.uploadFile.image);
      this.video = this.uploadFile.image
    }*/
    //this.uploadFile
   /* var newPost = {
        title: this.title,
        content: this.content,
        image: this.uploadFile.image  
    }
    this.dataService.addPost(newPost)
    .subscribe(post => {
        this.posts.push(post);
        this.title = '';
        this.content = '';
        this.image = '';
    });
  }*/
 //-----------
  /*fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }*/

  //------------------------------

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    public af: AngularFireDatabase,
  ) {
    this.folder = 'Videos';
    //Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile = res.url;
      this.video = res.url;
      this.videoId = res.public_id;
      if(this.uploadFile){this.uploadComplete = "video has been uploaded successfully..You may proceed to publish"};
      return { item, response, status, headers };
      
    };
    /////////////////////////////////////////////////////////////////////////
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
      postVideo: this.video,
      
    });
    // Optional: subscribe to value changes on the form
    //this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe(
      (data: {article: Article}) => {
        if (data.article) {
          this.article = data.article;
          this.articleForm.patchValue(data.article);
        }
      }
    );
  }



  uploadf() {
      this.uploadStarted = "Uploading Image!...please wait...";
        // Create a root reference
      let storageRef = firebase.storage().ref();
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]){
      console.log(selectedFile);
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        this.video = snapshot.downloadURL;
        console.log(snapshot);
        this.uploadFile = this.video;
        if(this.uploadFile){this.uploadComplete = "Image has been uploaded successfully..You may proceed to publish"};
        
        console.log('Uploaded a blob or file! Now storing the reference at',`/${this.folder}/images/`);
        return this.af.list(`/${this.folder}/images/`).push({ path: path, filename: selectedFile.name })
      });
      }
    }

  //////////////////////////////////////////
  upload(){
      this.uploader.uploadAll();
      this.uploadStarted = "Uploading video!...please wait...";
    }
  /////////////////////////////////////////

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value.toLowerCase();
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);

    // post the changes
    this.articlesService
    .save(this.article)
    .subscribe(
      //article => this.router.navigateByUrl('/article/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
    this.router.navigateByUrl('/');


    
    //console.log(this.title);
    //let listing = {
     // description: this.description
    
      //image: this.image
    //}
    //this.articlesService.addListing(listing);
    //console.log(listing);
    //this.router.navigate(['listings']);
  
  }

  updateArticle(values: Object) {
    (<any>Object).assign(this.article, values);
  }
}
