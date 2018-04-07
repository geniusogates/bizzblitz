import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Bizarticle, BizarticleListConfig } from '../models';

@Injectable()
export class BizarticlesService {
  folder: any;

  constructor (
    //private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    //this.folder = 'listingimages';
   // this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(bizconfig: BizarticleListConfig): Observable<{bizarticles: Bizarticle[], bizarticlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(bizconfig.filters)
    .forEach((key) => {
      params.set(key, bizconfig.filters[key]);
    });

    return this.apiService
    .get(
      '/bizarticles' + ((bizconfig.type === 'bizfeed') ? '/bizfeed' : ''),
      params
    ).map(data => data);
  }

  /* getListings(){
    //this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
    return this.listings;
  }

  getListingDetails(id){
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }

  addListing(listing){
     // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }*/

  get(slug): Observable<Bizarticle> {
    return this.apiService.get('/bizarticles/' + slug)
           .map(data => data.bizarticle);
  }

  destroy(slug) {
    return this.apiService.delete('/bizarticles/' + slug);
  }

  save(bizarticle): Observable<Bizarticle> {
    // If we're updating an existing article
    if (bizarticle.slug) {
      return this.apiService.put('/bizarticles/' + bizarticle.slug, {bizarticle: bizarticle})
             .map(data => data.bizarticle);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/bizarticles/', {bizarticle: bizarticle})
             .map(data => data.bizarticle);
    }
  }

  favorite(slug): Observable<Bizarticle> {
    return this.apiService.post('/bizarticles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Bizarticle> {
    return this.apiService.delete('/bizarticles/' + slug + '/favorite');
  }


}




/*interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}*/