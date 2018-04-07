import { Component, TemplateRef, NgZone, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CloudinaryImageComponent} from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
//import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
//declare var firebase: any;

import { ActivatedRoute, Router } from '@angular/router';
//import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';

import { Article, ArticlesService } from '../shared';


@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  fireimage: any;
  //d@Input() folder: string;
  src: any;
  folder: any;
  imageList : Observable<Image[]>;
  

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
  ///////////////////////////////////
  modalRef: BsModalRef;
  //////////////////////////////////
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
  image: any;
  image2: any;

  uploadComplete: any;
  uploadComplete2: any;
  uploadStarted: any;
  uploadStarted2: any;
  ////////////for progress bar
  //type: string;
  //stacked: any[] = [];

  // FOR HUNDLING FILE UPLOAD......

  uploadFile: any;
  uploadFile2: any;
  /*hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:8080/api/img'
  };
  ////////////////http://localhost:8080   http://localhost:8080/api/img1
  //https://nameless-sea-34133.herokuapp.com/api/img1
  options1: Object = {
    url: ''
  };
  /////////////////////////////////////
  sizeLimit = 25000000;
  


 //--------------------------------
  handleUpload(data:any): void {
    ////////////////////////////
    if (data && data.response) {
      data = JSON.parse(data.response);
      //data= data.response;
      this.uploadFile = data;
       // data.response;
      console.log(this.uploadFile.image);
      this.image = this.uploadFile.image
    }
  }
  /////////////////////////////////////////////////
  handleUpload1(data:any): void {
    ////////////////////////////
    if (data && data.response) {
      data = JSON.parse(data.response);
      //data= data.response;
      this.uploadFile1 = data;
       // data.response;
      console.log(this.uploadFile1.image);
      this.image1 = this.uploadFile1.image
    }
  }
  ////////////////////////////////////////////////
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
  /////////////////////////////////////
  beforeUpload1(uploadingFile1): void {
    if (uploadingFile1.size > this.sizeLimit) {
      uploadingFile1.setAbort();
      alert('File is too large');
    }
  }*/
  ////////////////////////////////////

  //------------------------------

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    public af: AngularFireDatabase,
  ) {
    this.folder = 'Images';
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
    //res.secure_url;
    //////////////////////////////////////////////////////////////////////////
    /*//Override onSuccessItem function to record cloudinary response data
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      //response is the cloudinary response
      //see http://cloudinary.com/documentation/upload_images#upload_response
      this.cloudinaryImage = JSON.parse(response);
      console.log(response);
      
      return {item, response, status, headers};
    };*/
    ///////////////////////////////
    //this.randomStacked();
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
      postImage: this.image,
      postImage1: this.image2
      
    });

    //console.log(this.image);
    //console.log(this.image1);
    // Optional: subscribe to value changes on the form
    //this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    /////////////////////////////////////////////
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
        this.image = snapshot.downloadURL;
        console.log(snapshot);
        this.uploadFile = this.image;
        if(this.uploadFile){this.uploadComplete = "Image has been uploaded successfully..You may proceed to publish"};
        
        console.log('Uploaded a blob or file! Now storing the reference at',`/${this.folder}/images/`);
        return this.af.list(`/${this.folder}/images/`).push({ path: path, filename: selectedFile.name })
      });
      }
    }





    uploadf2() {
      this.uploadStarted2 = "Uploading Image!...please wait...";
        // Create a root reference
      let storageRef = firebase.storage().ref();
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('file2')).files[0]]){
      console.log(selectedFile);
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        this.image2 = snapshot.downloadURL;
        console.log(snapshot);
        this.uploadFile2 = this.image2;
        if(this.uploadFile2){this.uploadComplete2 = "Image has been uploaded successfully..You may proceed to publish"};
        
        console.log('Uploaded a blob or file! Now storing the reference at',`/${this.folder}/images/`);
        return this.af.list(`/${this.folder}/images/`).push({ path: path, filename: selectedFile.name })
      });
      }
    }




    deletef(image) {
        let storagePath = image.path;
        let referencePath = `${this.folder}/images/` + image.$key;

        // Do these as two separate steps so you can still try delete ref if file no longer exists
        // Delete from Storage
        firebase.storage().ref().child(storagePath).delete()
        .then(
            () => {},
            (error) => console.error("Error deleting stored file",storagePath)
        );

        // Delete references
        this.af.object(referencePath).remove()
            
        

    }




    /* uploadf(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().map(s => s.state);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
    this.fireimage = this.task.downloadURL().map;
    console.table(this.downloadURL);
    console.log()
    //let data = JSON.parse(this.fireimage);
    //console.log(this.task.downloadURL);
    console.log(this.fireimage);
    //console.log(data);
     }*/




    
  /////////pipe(/////////////////////////////////
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  /////////////////////////////////////////
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



interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}
