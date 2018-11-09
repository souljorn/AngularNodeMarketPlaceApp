import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) {
  }


//Gets a single item by title
  getImage(filename: string): Observable<File> {
    return this._http.get<File>('api/image/' + filename);
  }

}
