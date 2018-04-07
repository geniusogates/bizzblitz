import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '../models';

@Injectable()
export class ArticlesService {
  //listings: FirebaseListObservable<any[]>;
  //listing: FirebaseObjectObservable<any>;
  folder: any;

  constructor (
    private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    this.folder = 'listingimages';
    //this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters)
    .forEach((key) => {
      params.set(key, config.filters[key]);
    });

    return this.apiService
    .get(
      '/articles' + ((config.type === 'feed') ? '/feed' : ''),
      params
    ).map(data => data);
  }

   /*getListings(){
    //this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
    return this.listings;
   }*/

  /*getListingDetails(id){
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }*/

  addListing(listing){
     // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        //return this.listings.push(listing);
      });
    }
  }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
           .map(data => data.article);
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, {article: article})
             .map(data => data.article);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
             .map(data => data.article);
    }
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

  /*getListingsByTitle(slug, title: any): Observable<Article[]> {
    const params: URLSearchParams = new URLSearchParams();
    
    return this.apiService
    .get('articles')*/
      //'/articles', /*+ ((config.type === 'feed') ? '/feed' : ''*),*/
     // params
   // .map(article => article.filter(article => article.title.toLowerCase().indexOf(title) !== -1));
    /*return this.apiService.get('/articles/'+ slug)
    .map(articles => articles.filter(article => article.title.toLowerCase().indexOf(title) !== -1));*/
    /*return this.db.list('listings')
      .map(_listings => _listings.filter(listing => listing.title.toLowerCase().indexOf(title) !== -1));
         */
 // }

 getListingsByTitle(search: string, title: any): Observable<Article> {
    console.log('search service', search);
    return this.apiService
        .get('/articles/Search/?search=' + search)
        .map(article => article.filter(article => article.title.toLowerCase().indexOf(title) !== -1));
}



}




interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}
