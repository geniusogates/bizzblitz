import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Bizarticle, BizarticleListConfig } from '../models';
import { BizarticlesService } from '../services';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'bizarticle-list',
  templateUrl: './bizarticle-list.component.html'
})
export class BizarticleListComponent {
  p: number = 1;
  constructor (
    private bizarticlesService: BizarticlesService,
    private router:Router,
    private route:ActivatedRoute
  ) {}
  search:any;
  count:any;
  searchTerm:any;
  queryd:any;

  @Input() limit: number;
  @Input()
  set config(config: BizarticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: BizarticleListConfig;
  results: Bizarticle[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1))
    }

    this.bizarticlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.bizarticles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.bizarticlesCount / this.limit)), (val, index) => index + 1);
    });
  }



  scroll(){
    window.scrollTo(0, 0);
  }


  searchd(): void {
    let term = this.searchTerm;
    this.results = this.results.filter(function(tag) {
      //if(term){
        return tag.name1.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.price1.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.location.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.title.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.description1.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      //}if(tag.description){
      //  return tag.description.toLowerCase().indexOf(term) >= 0;
     // }
    }); 
}
}