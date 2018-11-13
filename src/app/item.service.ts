import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient) { }

  //Gets all items
  getItems():Observable<Item[]> {
    return this._http.get<Item[]>('api/items');
  }

  //Gets a single item by title
  getItem(title: string):Observable<Item> {
    return this._http.get<Item>('api/items/title/' + title);
  }

  //Create an item
  createItem(item: Item):Observable<Item> {
    return this._http.post<Item>('api/items', item);
  }
}
