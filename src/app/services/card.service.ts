import { inject, Injectable, signal } from '@angular/core';
import { Cards } from '../models/cards.type';
import { MagicSet } from '../models/set.type';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AppRestControllerService, CardModel, SetCardModel } from '../shared/backend-api';

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
  private selectedCard$ = signal<CardModel | null>(null);
  private loading$ = signal<boolean>(false);
  readonly cardList = this.cardList$.asReadonly();
  readonly set = this.set$.asReadonly();
  readonly selectedCard = this.selectedCard$.asReadonly();
  readonly loading = this.loading$.asReadonly();

  updateCardList(set: MagicSet) {
    this.set$.set(set);
    this.selectedCard$.set(null);
    this.loading$.set(true);
    this.restClient.getSetCards(set.code)
    .pipe(finalize(() => this.loading$.set(false)))
    .subscribe((data) => {
      this.cardList$.set(data);
    })
  }

  selectCard(card: SetCardModel) {
    this.restClient.getCard(card.scryfallId!)
      .subscribe((data) => {
        this.selectedCard$.set(data);
      });
  }

  acceptCard() {
    const card = this.selectedCard$();
    if (!card) return;
    const updated = { ...card, ready: true };
    this.restClient.updateCard(updated).subscribe(() => {
      this.selectedCard$.set(updated);
      this.cardList$.update(list =>
        list.map(c => c.scryfallId === updated.scryfallId ? { ...c, ready: true } : c)
      );
    });
  }

  constructor() { }
}
