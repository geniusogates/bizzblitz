import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Shoutarticle, ShoutarticleListConfig } from '../models';

@Injectable()
export class ShoutarticlesService {
  folder: any;

  constructor (
    //private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    //this.folder = 'listingimages';
   // this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(shoutconfig: ShoutarticleListConfig): Observable<{shoutarticles: Shoutarticle[], shoutarticlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(shoutconfig.filters)
    .forEach((key) => {
      params.set(key, shoutconfig.filters[key]);
    });

    return this.apiService
    .get(
      '/shoutarticles' + ((shoutconfig.type === 'shoutfeed') ? '/shoutfeed' : ''),
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

  get(slug): Observable<Shoutarticle> {
    return this.apiService.get('/shoutarticles/' + slug)
           .map(data => data.shoutarticle);
  }

  destroy(slug) {
    return this.apiService.delete('/shoutarticles/' + slug);
  }

  save(shoutarticle): Observable<Shoutarticle> {
    // If we're updating an existing article
    if (shoutarticle.slug) {
      return this.apiService.put('/shoutarticles/' + shoutarticle.slug, {shoutarticle: shoutarticle})
             .map(data => data.shoutarticle);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/shoutarticles/', {shoutarticle: shoutarticle})
             .map(data => data.shoutarticle);
    }
  }

  favorite(slug): Observable<Shoutarticle> {
    return this.apiService.post('/shoutarticles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Shoutarticle> {
    return this.apiService.delete('/shoutarticles/' + slug + '/favorite');
  }


}




/*interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}*/