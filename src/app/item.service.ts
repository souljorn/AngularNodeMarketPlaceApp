import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable}  from 'rxjs';
import {Item} from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient) { }

  //Gets all users
  getItems():Observable<Item[]> {
    return this._http.get<Item[]>('api/item')
  }

  //Gets all users
  getItem():Observable<Item> {
    return this._http.get<Item>('api/item')
  }

  //Create a user
  createItem(item: Item):Observable<Item> {
    return this._http.post<Item>('api/item', item)
  }

}
