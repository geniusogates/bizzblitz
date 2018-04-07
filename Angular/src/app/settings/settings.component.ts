import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { User, UserService } from '../shared';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  imageId: string;
  imageId2: string;
  //cloudinaryImage: any;
 
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  uploader2: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dkacztgxr', uploadPreset: 'ciropnkb'})
  );
  //////////////////////
  isAddImage:boolean=false;
  //private zone: NgZone;
  //private options: Object;
  //private progress: number = 0;
  //private response: any = {};
  //{} as
  //user: User = new User();
  user: User = {} as User;
  currentUser: any;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  successfull: any;
  image: any;
  image2: any;

  uploadComplete: any;
  uploadComplete2: any;
  uploadStarted: any;
  uploadStarted2: any;


   // FOR HUNDLING FILE UPLOAD......

   uploadFile: any;
   uploadFile2: any;
   /*uploadFile1: any;
   hasBaseDropZoneOver: boolean = false;
   options: Object = {
     url: 'https://nameless-sea-34133.herokuapp.com/api/img'
   };
   options1: Object = {
     url: 'https://nameless-sea-34133.herokuapp.com/api/img'
   };
   sizeLimit = 25000000;*/
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
     }
   }
   /////////////////////////////////////////
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
   ////////////////////////////////////////
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

   ///////////////////////////////////////////
   beforeUpload1(uploadingFile1): void {
     if (uploadingFile1.size > this.sizeLimit) {
       uploadingFile1.setAbort();
       alert('File is too large');
     }
   }*/
   //////////////////////////////////////////
 
   //------------------------------
  

  constructor(
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    //Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile = res.url;
      this.image = res.url;
      this.imageId = res.public_id;
      if(this.uploadFile){this.uploadComplete = "Image has been uploaded successfully..You may proceed to Update settings"};
      return { item, response, status, headers };
      
    };
    /////////////////////////////////////////////////////////////////////////
    this.uploader2.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res.secure_url);
      this.uploadFile2 = res.url;
      this.image2 = res.url;
      this.imageId2 = res.public_id;
      if(this.uploadFile2){this.uploadComplete2 = "Image has been uploaded successfully..You may proceed to Update settings"};
      return { item, response, status, headers };
      
    };
    /////////////////////////////////////////////////////////////////////////
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: this.image,
      image1: this.image2,
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    //this.router.navigate(["/same/route/path?refresh=1"]);
    // Make a fresh copy of the current user's object to place in editable form fields
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
    this.authService.user.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    )
  }


  toggleImage(){
     this.isAddImage = !this.isAddImage
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

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      //updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
    //this.router.navigate(['']);
    //window.location.href='http://localhost:4200/';
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }
  //////////////////////////////
  navigate(){
    this.successfull = "Settings updated successfully...You may proceed to other pages!";
    //this.router.navigateByUrl('/');
    //window.location.href='http://localhost:4200/';
  }
  /////////////////////////////

  //////////////////////////////
  /*addUser(){ 
  this.userService
  .add(this.currentUser);
  }*/
  /////////////////////////////

}
