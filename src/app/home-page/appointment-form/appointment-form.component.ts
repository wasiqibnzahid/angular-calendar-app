import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent {
  @Output() onSubmit = new EventEmitter();
  appointmentForm: FormGroup;
  constructor(private formGroup: FormBuilder) {
    this.appointmentForm = this.formGroup.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }
  handleFormSubmit() {
    this.onSubmit.emit(this.appointmentForm);
    this.appointmentForm.reset();
  }
}
