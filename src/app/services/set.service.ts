import { inject, Injectable } from '@angular/core';
import { Set } from '../models/set.type';
import { HttpClient } from '@angular/common/http';
import { Sets } from '../models/sets.type';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  httpService = inject(HttpClient);

  setList: Array<Set> = [
    {
      name: 'Tarkir Dragonstorm',
      set_type: 'expansion',
      icon_svg_uri: 'https://svgs.scryfall.io/sets/tdm.svg?1744603200'
    },
    {
      name: 'Bloomburrow',
      set_type: 'expansion',
      icon_svg_uri: 'https://svgs.scryfall.io/sets/blb.svg?1744603200'
    },
    {
      name: 'Duskmourn: House of Horror',
      set_type: 'expansion',
      icon_svg_uri: 'https://svgs.scryfall.io/sets/dsk.svg?1744603200'
    }
  ]

  getSetList() {
    return this.httpService.get<Sets>('https://api.scryfall.com/sets');
  }
}

