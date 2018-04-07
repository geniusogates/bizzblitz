import { Component, TemplateRef, Input, OnInit } from '@angular/core';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import * as $ from 'jquery';
 //import { EditorComponent } from '../../../editor/editor.component';
//import { ModalService } from '../../services/modal.service';

@Component({
  
    //moduleId: module.id.toString(),
    //selector: 'modal',
    //template: '<ng-content></ng-content>'
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit{
  //bsModalRef: BsModalRef;
  //modalRef: BsModalRef;
  //modalRef2: BsModalRef;
  

  constructor() {}
/*
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }*/

  ngOnInit() {
  }

 /*
  openModalWithComponent() {
    const initialState = {
      list: [
        //'Open a modal with component',
        //'Pass your data',
        //'Do something else',
        //'...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ArticleModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }*/
  //openModal(template: TemplateRef<any>) {
   // this.modalRef = this.modalService.show(template);
  //}
 
        
}
