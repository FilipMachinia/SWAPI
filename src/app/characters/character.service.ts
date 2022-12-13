import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  BASE_API_URL = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {
  }

  getAllCharacters(): any {
    return this.http.get(this.BASE_API_URL + 'people');
  }

  getMovie(url: string): any {
    return this.http.get(url);
  }
}
