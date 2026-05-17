import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardModel } from '../../shared/backend-api';

@Component({
  selector: 'app-card-edit',
  imports: [],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss'
})
export class CardEditComponent {

  dialogRef = inject(MatDialogRef<CardEditComponent>);
  card: CardModel = inject(MAT_DIALOG_DATA);

  naturalWidth = signal(0);
  naturalHeight = signal(0);

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.naturalWidth.set(img.naturalWidth);
    this.naturalHeight.set(img.naturalHeight);
  }

  close() {
    this.dialogRef.close();
  }
}
