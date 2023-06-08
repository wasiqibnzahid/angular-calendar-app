import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  name: string;
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) name: string
  ) {
    this.name = name;
  }
  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
