import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Apatarticle, ApatarticleListConfig } from '../models';

@Injectable()
export class ApatarticlesService {
  
  folder: any;

  constructor (
    //private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    //this.folder = 'listingimages';
   // this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(apatconfig: ApatarticleListConfig): Observable<{apatarticles: Apatarticle[], apatarticlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(apatconfig.filters)
    .forEach((key) => {
      params.set(key, apatconfig.filters[key]);
    });

    return this.apiService
    .get(
      '/apatarticles' + ((apatconfig.type === 'apatfeed') ? '/apatfeed' : ''),
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

  get(slug): Observable<Apatarticle> {
    return this.apiService.get('/apatarticles/' + slug)
           .map(data => data.apatarticle);
  }

  destroy(slug) {
    return this.apiService.delete('/apatarticles/' + slug);
  }

  save(apatarticle): Observable<Apatarticle> {
    // If we're updating an existing article
    if (apatarticle.slug) {
      return this.apiService.put('/apatarticles/' + apatarticle.slug, {apatarticle: apatarticle})
             .map(data => data.apatarticle);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/apatarticles/', {apatarticle: apatarticle})
             .map(data => data.apatarticle);
    }
  }

  favorite(slug): Observable<Apatarticle> {
    return this.apiService.post('/apatarticles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Apatarticle> {
    return this.apiService.delete('/apatarticles/' + slug + '/favorite');
  }


}




/*interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}*/