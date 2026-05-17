import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../../services/card.service';
import { SetService } from '../../services/set.service';
import { CardEditComponent } from '../card-edit/card-edit.component';

@Component({
  selector: 'app-card-overview',
  imports: [],
  templateUrl: './card-overview.component.html',
  styleUrl: './card-overview.component.scss'
})
export class CardOverviewComponent {

  cardService = inject(CardService);
  setService = inject(SetService);
  dialog = inject(MatDialog);

  naturalWidth = signal(0);
  naturalHeight = signal(0);

  get cardData() {
    return this.cardService.cardList;
  }
  get setData() {
    return this.cardService.set;
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.naturalWidth.set(img.naturalWidth);
    this.naturalHeight.set(img.naturalHeight);
  }

  openEdit() {
    this.dialog.open(CardEditComponent, {
      data: this.cardService.selectedCard(),
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      panelClass: 'card-edit-dialog'
    });
  }

}
