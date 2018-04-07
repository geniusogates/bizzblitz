import { Component, Input } from '@angular/core';

import { Shoutarticle, ShoutarticleListConfig } from '../models';
import { ShoutarticlesService } from '../services';

@Component({
  selector: 'shoutarticle-list',
  templateUrl: './shoutarticle-list.component.html'
})
export class ShoutarticleListComponent {
  p: number = 1;
  constructor (
    private shoutarticlesService: ShoutarticlesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ShoutarticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ShoutarticleListConfig;
  results: Shoutarticle[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  searchTerm:any;

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

    this.shoutarticlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.shoutarticles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.shoutarticlesCount / this.limit)), (val, index) => index + 1);
    });
  }


  scroll(){
    window.scrollTo(0, 0);
  }

  searchd(): void {
    let term = this.searchTerm;
    this.results = this.results.filter(function(tag) {
      //if(term){
        return tag.shoutbody.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.shoutphone.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.shoutlocation.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.shoutname.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.shoutdescription.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      //}if(tag.description){
      //  return tag.description.toLowerCase().indexOf(term) >= 0;
     // }
    }); 
}
}