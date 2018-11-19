import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Accounts} from './Accounts';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  //Gets all users
  getUsers():Observable<Accounts[]> {
    return this._http.get<Accounts[]>('api/accounts')
  }

  //Create a user
  createUser(account: Accounts):Observable<Accounts> {
    return this._http.post<Accounts>('api/accounts/create', account);
  }

  //Get a single user by email.
  getUser(email: string):Observable<Accounts> {
  return this._http.get<Accounts>('api/accounts/' + email);
  }

  updateUser(email:string, account: Accounts):Observable<Accounts>{
    console.log("Update User Service");
    console.log(account);
    return this._http.post<Accounts>('api/accounts/' + email, account);
  }
}


