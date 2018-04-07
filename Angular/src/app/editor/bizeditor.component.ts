import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { Bizarticle, BizarticlesService } from '../shared';

@Component({
  selector: 'bizeditor-page',
  templateUrl: './bizeditor.component.html'
})
export class BizeditorComponent implements OnInit {
  imageId: string;
  imageId2: string;
  imageId3: string;
  //cloudinaryImage: any;
 
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  uploader2: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  uploader3: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  //////////////////////
  isAddImage:boolean=false;
  isAddImage1:boolean=false;
  //private zone: NgZone;
  //private options: Object;
  //private progress: number = 0;
  //private response: any = {};
  bizarticle: Bizarticle = new Bizarticle();
  bizarticleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  //description: any;
  image: any;
  image2: any;
  image3: any;

  uploadComplete: any;
  uploadComplete2: any;
  uploadComplete3: any;
  uploadStarted: any;
  uploadStarted2: any;
  uploadStarted3: any;
   // FOR HUNDLING FILE UPLOAD......

   uploadFile: any;
   uploadFile2: any;
   uploadFile3: any;
   /*hasBaseDropZoneOver: boolean = false;
   options: Object = {
     url: 'https://nameless-sea-34133.herokuapp.com/api/img'
   };
   options1: Object = {
     url: 'https://nameless-sea-34133.herokuapp.com/api/img'
   };
   options2: Object = {
     url: 'https://nameless-sea-34133.herokuapp.com/api/img'
   };
   sizeLimit = 25000000;
   
  //--------------------------------
   handleUpload(data): void {
     if (data && data.response) {
       data = JSON.parse(data.response);
       //data= data.response;
       this.uploadFile = data;
        // data.response;
       console.log(this.uploadFile.image);
       this.image = this.uploadFile.image
     }
   }
   ///////////////////////////////////////////////////
   handleUpload1(data): void {
     if (data && data.response) {
       data = JSON.parse(data.response);
       //data= data.response;
       this.uploadFile1 = data;
        // data.response;
       console.log(this.uploadFile1.image);
       this.image1 = this.uploadFile1.image
     }
   }
   //////////////////////////////////////////////////

   //////////////////////////////////////////////////
   handleUpload2(data): void {
     if (data && data.response) {
       data = JSON.parse(data.response);
       //data= data.response;
       this.uploadFile2 = data;
        // data.response;
       console.log(this.uploadFile2.image);
       this.image2 = this.uploadFile2.image
     }
   }
   /////////////////////////////////////////////////
  //-----------
   fileOverBase(e:any):void {
     this.hasBaseDropZoneOver = e;
   }
  
   beforeUpload(uploadingFile): void {
     if (uploadingFile.size > this.sizeLimit) {
       uploadingFile.setAbort();
       alert('File is too large');
     }
   }
   ////////////////////////////////////////////////
   beforeUpload1(uploadingFile1): void {
     if (uploadingFile1.size > this.sizeLimit) {
       uploadingFile1.setAbort();
       alert('File is too large');
     }
   }
   ///////////////////////////////////////////////

   //////////////////////////////////////////////
   beforeUpload2(uploadingFile2): void {
     if (uploadingFile2.size > this.sizeLimit) {
       uploadingFile2.setAbort();
       alert('File is too large');
     }
   }*/
   /////////////////////////////////////////////
 
   //------------------------------

  constructor(
    private bizarticlesService: BizarticlesService,
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
    this.uploader2.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile2 = res.url;
      this.image2 = res.url;
      this.imageId2 = res.public_id;
      if(this.uploadFile2){this.uploadComplete2 = "Image has been uploaded successfully..You may proceed to publish"};
      return { item, response, status, headers };
      
    };
    /////////////////////////////////////////////////////////////////////////
    this.uploader3.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile3 = res.url;
      this.image3 = res.url;
      this.imageId3 = res.public_id;
      if(this.uploadFile3){this.uploadComplete3 = "Image has been uploaded successfully..You may proceed to publish"};
      return { item, response, status, headers };
      
    };
    ////////////////////////////////////////////////////////////////////////
    // use the FormBuilder to create a form group
    this.bizarticleForm = this.fb.group({
      title: '',
      description: '',
      location: '',
      phone: '',
      email: '',
      postImage: this.image,
      postImage1: this.image2,
      postImage2: this.image3,
      body: '',
      name1: '',
      //name2: '',
      //name3: '',
      //name4: '',
      //name5: '',
      description1: '',
      //description2: '',
      //description3: '',
      //description4: '',
      //description5: '',
      //image1: '',
      //image2: '',
      //image3: '',
      //image4: '',
      //image5: '',
      price1: '',
      //price2: '',
      //price3: '',
      //price4: '',
      //price5: ''
    });
    // Optional: subscribe to value changes on the form
    //this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe(
      (data: {bizarticle: Bizarticle}) => {
        if (data.bizarticle) {
          this.bizarticle = data.bizarticle;
          this.bizarticleForm.patchValue(data.bizarticle);
        }
      }
    );
  }


  toggleImage(){
     this.isAddImage = !this.isAddImage
   }

   toggleImage1(){
     this.isAddImage1 = !this.isAddImage1
   }

   //////////////////////////////////////////
  upload(){
      this.uploader.uploadAll();
      this.uploadStarted = "Uploading Image!...please wait...";
    }
  /////////////////////////////////////////
  upload2(){
      this.uploader2.uploadAll();
      this.uploadStarted2 = "Uploading Image!...please wait...";
    }
  /////////////////////////////////////////
  upload3(){
      this.uploader3.uploadAll();
      this.uploadStarted3 = "Uploading Image!...please wait...";
    }
  /////////////////////////////////////////

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value.toLowerCase();
    // only add tag if it does not exist yet
    if (this.bizarticle.tagList.indexOf(tag) < 0) {
      this.bizarticle.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.bizarticle.tagList = this.bizarticle.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.bizarticleForm.value);

    // post the changes
    this.bizarticlesService
    .save(this.bizarticle)
    .subscribe(
      //bizarticle => this.router.navigateByUrl('/bizarticle/' + bizarticle.slug),
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
    }
    //this.bizarticlesService.addListing(listing);
    //console.log(listing);
    //this.router.navigate(['listings']);
  
  

  updateArticle(values: Object) {
    (<any>Object).assign(this.bizarticle, values);
  }

}

