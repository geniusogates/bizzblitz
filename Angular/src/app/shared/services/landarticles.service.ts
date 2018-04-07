import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ApiService } from './api.service';
import { Landarticle, LandarticleListConfig } from '../models';

@Injectable()
export class LandarticlesService {
  folder: any;

  constructor (
    //private db: AngularFireDatabase,
    private apiService: ApiService
  ) {
    //this.folder = 'listingimages';
   // this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
  }

  query(landconfig: LandarticleListConfig): Observable<{landarticles: Landarticle[], landarticlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(landconfig.filters)
    .forEach((key) => {
      params.set(key, landconfig.filters[key]);
    });

    return this.apiService
    .get(
      '/landarticles' + ((landconfig.type === 'landfeed') ? '/landfeed' : ''),
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

  get(slug): Observable<Landarticle> {
    return this.apiService.get('/landarticles/' + slug)
           .map(data => data.landarticle);
  }

  destroy(slug) {
    return this.apiService.delete('/landarticles/' + slug);
  }

  save(landarticle): Observable<Landarticle> {
    // If we're updating an existing article
    if (landarticle.slug) {
      return this.apiService.put('/landarticles/' + landarticle.slug, {landarticle: landarticle})
             .map(data => data.landarticle);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/landarticles/', {landarticle: landarticle})
             .map(data => data.landarticle);
    }
  }

  favorite(slug): Observable<Landarticle> {
    return this.apiService.post('/landarticles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Landarticle> {
    return this.apiService.delete('/landarticles/' + slug + '/favorite');
  }


}




/*interface Listing{
  $key?: string;
  description?: string;
  image?: string;
}*/