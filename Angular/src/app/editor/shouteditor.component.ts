import { Component, OnInit, NgZone, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { Shoutarticle, ShoutarticlesService } from '../shared';

@Component({
  selector: 'shouteditor-page',
  templateUrl: './shouteditor.component.html'
})
export class ShouteditorComponent implements OnInit {
  imageId: string;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  //private zone: NgZone;
  //private options: Object;
  //private progress: number = 0;
  //private response: any = {};
  shoutarticle: Shoutarticle = new Shoutarticle();
  shoutarticleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  //description: any;
  image: any;
  uploadComplete: any;
  uploadStarted: any;
 // FOR HUNDLING FILE UPLOAD......

 uploadFile: any;
 /*hasBaseDropZoneOver: boolean = false;
 options: Object = {
   url: 'https://nameless-sea-34133.herokuapp.com/api/img'
 };
 sizeLimit = 25000000;
 /*handleUpload(data: any): void {
   this.zone.run(() => {
     this.response = data;
     this.progress = Math.floor(data.progress.percent / 100);
   });
 }*/
//--------------------------------
 /*handleUpload(data): void {
   if (data && data.response) {
     data = JSON.parse(data.response);
     //data= data.response;
     this.uploadFile = data;
      // data.response;
     console.log(this.uploadFile.image);
     this.image = this.uploadFile.image
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
 }
//-----------
 fileOverBase(e:any):void {
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
    private shoutarticlesService: ShoutarticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile = res.url;
      this.image = res.url;
      this.imageId = res.public_id;
      if(this.uploadFile){this.uploadComplete = "Image has been uploaded successfully..You may proceed to publish"};
      return { item, response, status, headers };
      
    };
    /////////////////////////////////////////////////////////////////////////
    // use the FormBuilder to create a form group
    this.shoutarticleForm = this.fb.group({
      shoutname: '',
      shoutdescription: '',
      shoutlocation: '',
      shoutphone: '',
      shoutemail: '',
      shoutbody: '',
      shoutimage: this.image,
      
    });
    // Optional: subscribe to value changes on the form
    //this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe(
      (data: {shoutarticle: Shoutarticle}) => {
        if (data.shoutarticle) {
          this.shoutarticle = data.shoutarticle;
          this.shoutarticleForm.patchValue(data.shoutarticle);
        }
      }
    );
  }

  //////////////////////////////////////////
  upload(){
      this.uploader.uploadAll();
      this.uploadStarted = "Uploading Image!...please wait...";
    }
  /////////////////////////////////////////

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value.toLowerCase();
    // only add tag if it does not exist yet
    if (this.shoutarticle.tagList.indexOf(tag) < 0) {
      this.shoutarticle.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.shoutarticle.tagList = this.shoutarticle.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.shoutarticleForm.value);

    // post the changes
    this.shoutarticlesService
    .save(this.shoutarticle)
    .subscribe(
      shoutarticle => this.router.navigateByUrl('/shoutarticle/' + shoutarticle.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );


    
    //console.log(this.title);
    //let listing = {
     // description: this.description
    
      //image: this.image
    }
    //this.bizarticlesService.addListing(listing);
    //console.log(listing);
    //this.router.navigate(['listings']);
  
  

  updateArticle(values: Object) {
    (<any>Object).assign(this.shoutarticle, values);
  }

}

