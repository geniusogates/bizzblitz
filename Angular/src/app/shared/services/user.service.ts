import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers,RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { FlashMessagesService } from 'angular2-flash-messages';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  //public users: Observable<any>;;

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
   // private _flashMessagesService: FlashMessagesService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object//new User()
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  ////////////////////////////////////////////
  Register(credentials): Observable<User> {
    console.log('this are credentials:',credentials);
    //const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users', {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
    
  }
  //////////////////////////////////////////
  RegisterEmail(credentials): Observable<User> {
    console.log('this are credentials for register:',credentials);
    //const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/usersadd', {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
    
  }
  ///////////////////////////////////////////
  Login(credentials): Observable<User> {
    //const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users/login', {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
    
  }
  //////////////////////////////////////////

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    );
    
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  
  /////////.map(res => res.json());/////.map(data => {this.users = data});///////////////////////
  getAllUsers(){
    return this.apiService.get('/allusers')
    //.map(res => res.json());
    
  }

  ///////////////////////////////////
  getUsersByName(name: any): Observable<User[]> {
    return this.apiService.get('/allusers')
      .map(users => users.filter(user => user.username.toLowerCase().indexOf(name) !== -1));

  }
  //////////////////////////////////

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .map(data => {
      // Update the currentUser observable
      //this.currentUserSubject.next(data.user);
      window.location.href='https://morning-savannah-40616.herokuapp.com/';
      return data.user;
    });
  }
  ///////////////////////////////////
  /*add(user):any {
    console.log(user);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //this.apiService
    this.http.post('http://localhost:8080/api/users', JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    //.post('/user', { user })
    //.map(data => {
      // Update the currentUser observable
     // this.currentUserSubject.next(data.user);
     // return data.user;
    //});
  }*/

}
