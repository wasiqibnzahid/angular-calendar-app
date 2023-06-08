import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { payloadWithIndex } from 'src/assets/interface';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  appointmentForm: FormGroup;
  index: number;
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: payloadWithIndex,
    @Inject(LOCALE_ID) public localeId: string,
    private formBuilder: FormBuilder
  ) {
    this.appointmentForm = this.formBuilder.group({
      name: [appointment.name, Validators.required],
      date: [new Date(appointment.date), Validators.required],
      time: [appointment.time, Validators.required],
    });
    this.index = appointment.index ?? -1;
  }

  saveChanges() {
    this.dialogRef.close({
      name: this.appointmentForm.value.name,
      date: formatDate(
        this.appointmentForm.value.date,
        'MM/dd/YYYY',
        this.localeId
      ),
      time: this.appointmentForm.value.time,
      index: this.index,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
