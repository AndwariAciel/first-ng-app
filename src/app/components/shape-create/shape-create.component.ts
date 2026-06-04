import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShapeModel, ShapeRestControllerService } from '../../shared/backend-api';

@Component({
  selector: 'app-shape-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './shape-create.component.html',
  styleUrl: './shape-create.component.scss'
})
export class ShapeCreateComponent {

  dialogRef = inject(MatDialogRef<ShapeCreateComponent>);
  shapeService = inject(ShapeRestControllerService);
  fb = inject(FormBuilder);

  typeOptions = Object.values(ShapeModel.TypeEnum);
  saving = signal(false);

  form = this.fb.group({
    type: [null as ShapeModel.TypeEnum | null, Validators.required],
    x: [null as number | null, [Validators.required, Validators.min(0)]],
    y: [null as number | null, [Validators.required, Validators.min(0)]],
    width: [null as number | null, [Validators.required, Validators.min(1)]],
    height: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  save() {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.shapeService.createShape(this.form.value as ShapeModel).subscribe({
      next: created => this.dialogRef.close(created),
      error: () => this.saving.set(false)
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
