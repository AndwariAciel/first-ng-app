import { Component, inject } from '@angular/core';
import { CardService } from '../../services/card.service';
import { SetService } from '../../services/set.service';

@Component({
  selector: 'app-card-overview',
  imports: [],
  templateUrl: './card-overview.component.html',
  styleUrl: './card-overview.component.scss'
})
export class CardOverviewComponent {

  cardService = inject(CardService);
  setService = inject(SetService);

  get cardData() {
    return this.cardService.cardList;
  }
  get setData() {
    return this.cardService.set;
  }

}
