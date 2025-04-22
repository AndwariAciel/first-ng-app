import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sets } from '../models/sets.type';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  httpService = inject(HttpClient);

  getSetList() {
    return this.httpService.get<Sets>('https://api.scryfall.com/sets');
  }
}

