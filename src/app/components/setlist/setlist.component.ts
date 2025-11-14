import { Component, inject, Input, input } from '@angular/core';
import { MagicSet } from '../../models/set.type';
import { CardService } from '../../services/card.service';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-setlist',
  imports: [MatListModule],
  templateUrl: './setlist.component.html',
  styleUrl: './setlist.component.scss'
})
export class SetlistComponent {
  set = input<MagicSet>();
  cardOverview = inject(CardService);

  get strictSet(): MagicSet {
    return this.set()!;
  }

}
