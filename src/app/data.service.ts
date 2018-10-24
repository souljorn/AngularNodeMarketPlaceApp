import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get("/api/users");
  }
}
