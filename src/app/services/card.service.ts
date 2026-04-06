import { inject, Injectable, signal } from '@angular/core';
import { Cards } from '../models/cards.type';
import { MagicSet } from '../models/set.type';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AppRestControllerService, SetCardModel } from '../shared/backend-api';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  httpClient = inject(HttpClient);
  restClient = inject(AppRestControllerService);

  private set$ = signal<MagicSet>({
    name: 'None selected',
    set_type: '',
    icon_svg_uri: '',
    code: '',
    released: false,
    cards: 0,
    cardsReady: 0
  });
  private cardList$ = signal<SetCardModel[]>([]);
  private loading$ = signal<boolean>(false);
  readonly cardList = this.cardList$.asReadonly();
  readonly set = this.set$.asReadonly();
  readonly loading = this.loading$.asReadonly();

  updateCardList(set: MagicSet) {
    this.set$.set(set);
    this.loading$.set(true);
    this.restClient.getSetCards(set.code)
    .pipe(finalize(() => this.loading$.set(false)))
    .subscribe((data) => {
      this.cardList$.set(data);
    })
  }



  constructor() { }
}
