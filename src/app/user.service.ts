import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Accounts} from './Accounts';
import {Observable}  from 'rxjs';
import {Item} from './Item';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  //Gets all users
  getUsers():Observable<Accounts[]> {
    return this._http.get<Accounts[]>('api/users')
  }

  //Create a user
  createUser(item: Item):Observable<Accounts> {
    return this._http.post<Accounts>('api/users', item)
  }

}


