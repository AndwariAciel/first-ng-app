import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AppRestControllerService, CardModel, ShapeModel, ShapeRestControllerService } from '../../shared/backend-api';
import { ShapeCreateComponent } from '../shape-create/shape-create.component';

@Component({
  selector: 'app-card-edit',
  imports: [DragDropModule],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss'
})
export class CardEditComponent implements OnInit {

  dialogRef = inject(MatDialogRef<CardEditComponent>);
  card: CardModel = inject(MAT_DIALOG_DATA);
  shapeService = inject(ShapeRestControllerService);
  cardService = inject(AppRestControllerService);
  dialog = inject(MatDialog);

  naturalWidth = signal(0);
  naturalHeight = signal(0);
  allShapes = signal<ShapeModel[]>([]);
  maskShapes = signal<ShapeModel[]>([...(this.card.mask?.shapes ?? [])]);
  selectedShape = signal<ShapeModel | null>(null);
  saving = signal(false);

  availableShapes = computed(() => {
    const maskIds = new Set(this.maskShapes().map(s => s.id));
    return this.allShapes().filter(s => !maskIds.has(s.id));
  });

  ngOnInit() {
    this.shapeService.getShapes().subscribe(shapes => this.allShapes.set(shapes));
  }

  drop(event: CdkDragDrop<ShapeModel[]>) {
    if (event.previousContainer === event.container) {
      if (event.container.id === 'mask-list') {
        const arr = [...this.maskShapes()];
        arr.splice(event.currentIndex, 0, arr.splice(event.previousIndex, 1)[0]);
        this.maskShapes.set(arr);
      }
      return;
    }

    if (event.previousContainer.id === 'available-list') {
      const shape = event.previousContainer.data[event.previousIndex];
      const arr = [...this.maskShapes()];
      arr.splice(event.currentIndex, 0, shape);
      this.maskShapes.set(arr);
      if (this.selectedShape()?.id === shape.id) {
        this.selectedShape.set(null);
      }
    } else {
      const arr = [...this.maskShapes()];
      arr.splice(event.previousIndex, 1);
      this.maskShapes.set(arr);
    }
  }

  toggleSelected(shape: ShapeModel) {
    this.selectedShape.update(current => current?.id === shape.id ? null : shape);
  }

  openNewShape() {
    this.dialog.open(ShapeCreateComponent, { panelClass: 'card-edit-dialog' })
      .afterClosed()
      .subscribe((created: ShapeModel | undefined) => {
        if (created) {
          this.allShapes.update(shapes => [...shapes, created]);
        }
      });
  }

  save() {
    this.saving.set(true);
    const updated: CardModel = {
      ...this.card,
      mask: { ...this.card.mask, shapes: this.maskShapes() }
    };
    this.cardService.updateCard(updated).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(updated);
      },
      error: () => this.saving.set(false)
    });
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.naturalWidth.set(img.naturalWidth);
    this.naturalHeight.set(img.naturalHeight);
  }

  close() {
    this.dialogRef.close();
  }
}
