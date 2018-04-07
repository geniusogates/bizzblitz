import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Cararticle, CararticleListConfig } from '../models';

@Injectable()
export class CararticlesService {
  folder: any;

  constructor (
    //private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    //this.folder = 'listingimages';
   // this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(carconfig: CararticleListConfig): Observable<{cararticles: Cararticle[], cararticlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(carconfig.filters)
    .forEach((key) => {
      params.set(key, carconfig.filters[key]);
    });

    return this.apiService
    .get(
      '/cararticles' + ((carconfig.type === 'carfeed') ? '/carfeed' : ''),
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

  get(slug): Observable<Cararticle> {
    return this.apiService.get('/cararticles/' + slug)
           .map(data => data.cararticle);
  }

  destroy(slug) {
    return this.apiService.delete('/cararticles/' + slug);
  }

  save(cararticle): Observable<Cararticle> {
    // If we're updating an existing article
    if (cararticle.slug) {
      return this.apiService.put('/cararticles/' + cararticle.slug, {cararticle: cararticle})
             .map(data => data.cararticle);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/cararticles/', {cararticle: cararticle})
             .map(data => data.cararticle);
    }
  }

  favorite(slug): Observable<Cararticle> {
    return this.apiService.post('/cararticles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Cararticle> {
    return this.apiService.delete('/cararticles/' + slug + '/favorite');
  }


}




/*interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}*/