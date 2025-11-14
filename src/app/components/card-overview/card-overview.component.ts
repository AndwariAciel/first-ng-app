import { Component, inject } from '@angular/core';
import { MagicSet } from '../../models/set.type';
import { Cards } from '../../models/cards.type';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-overview',
  imports: [],
  templateUrl: './card-overview.component.html',
  styleUrl: './card-overview.component.scss'
})
export class CardOverviewComponent {

  cardService = inject(CardService);

  get cardData() {
    return this.cardService.cardList;
  }
  get setData() {
    return this.cardService.set;
  }

}
