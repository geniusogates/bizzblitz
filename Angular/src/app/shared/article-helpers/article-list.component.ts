import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationStart, NavigationEnd} from '@angular/router';

import { Article, ArticleListConfig } from '../models';
import { ArticlesService } from '../services';
import { SearchPipe } from '../../pipes/search.pipe';
import { User } from '../models/user.model';
//import { UserService } from '../services';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/first';
import { ModalService } from '../services/modal.service';

@Component({
  moduleId: module.id,
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  //pipes: ['SearchPipe']
})
export class ArticleListComponent {
  p: number = 1;
  private bodyText: string;
  private _routeScrollPositions: {[url: string]: number} = {};
  private _subscriptions: Subscription[] = [];
  search:any;
  count:any;
  searchTerm:any;
  queryd:any;
  constructor (
    private articlesService: ArticlesService,
    private router:Router,
    private route:ActivatedRoute,
    private location: Location,
    private modalService: ModalService
    //private userService: UserService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  ////////////////////////////////////////

   ngOnInit() {
     this.bodyText = 'This text can be updated in modal 1';
     
     /*this._subscriptions.push(
      // save scroll position on route change
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          // url path without parameters
          let urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url ).split(';',1)[0];
          this._routeScrollPositions[urlPath] = window.pageYOffset;
        }
      })
    );
    // restore scroll position on back or forward
    this.location.subscribe(event => {
        // back or forward, wait for router navigation end
        let routerNavigationEnd = this.router.events.first(event => event instanceof NavigationEnd)
        .subscribe((navigationEndEvent: NavigationEnd) => {
          // url path without parameters
          let urlPath = (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url).split(';',1)[0];
          console.log('scroll to ', this._routeScrollPositions[urlPath] || 0)
          setTimeout(() => {
            window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
          }, 0);
        });
    });*/

   }


    openModal(id: string){
        this.modalService.open(id);
    }
 
    closeModal(id: string){
        this.modalService.close(id);
    }


    scroll(){
      window.scrollTo(0, 0);
    }

  ///////////$ionicScrollDelegate.scrollTop();//////////////////////////////

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

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.articles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
  }

  /*get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
           .map(data => data.article);
  }*/

  /*searchArticles(search){   
    this.articlesService.getListingsByTitle(search, this.search.toLowerCase()).subscribe(data => { 
      //this.results = data.articles;
      this.count = this.results.length;
    });
  }*/

  searchd(): void {
    let term = this.searchTerm;
    this.results = this.results.filter(function(tag) {
      //if(term){
        return tag.title.toLowerCase().includes(term.toLowerCase()) || tag.description.toLowerCase().includes(term.toLowerCase());
      //}if(tag.description){
      //  return tag.description.toLowerCase().indexOf(term) >= 0;
     // } indexOf
     //return tag.title.toLowerCase().indexOf(term.toLowerCase()) >= 0 || tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }); 
}

ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /*searchArticles(){    
    this.articlesService.query(this.search.toLowerCase()).subscribe(data => { 
      this.results = data.articles;
      this.count = this.results.length;
    }); //username
  }*/
}
