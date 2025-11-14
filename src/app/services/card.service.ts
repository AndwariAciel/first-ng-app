import { inject, Injectable, signal } from '@angular/core';
import { Cards } from '../models/cards.type';
import { MagicSet } from '../models/set.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  httpClient = inject(HttpClient);

  private set$ = signal<MagicSet>({
    name: 'None selected',
    set_type: '',
    icon_svg_uri: '',
    code: ''
  });
  private cardList$ = signal<Cards>({
    has_more: false,
    next_page: '',
    data: []
  });
  readonly cardList = this.cardList$.asReadonly();
  readonly set = this.set$.asReadonly();

  updateCardList(set: MagicSet) {
    this.set$.set(set);
    this.httpClient.get<Cards>('https://api.scryfall.com/cards/search?order=set&q=set:' + set.code)
    .subscribe((data) => {
      this.cardList$.set(data);
    });
  }

  constructor() { }
}
