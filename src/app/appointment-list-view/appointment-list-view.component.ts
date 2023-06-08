import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAppointment } from 'src/assets/interface';

@Component({
  selector: 'app-appointment-list-view',
  templateUrl: './appointment-list-view.component.html',
  styleUrls: ['./appointment-list-view.component.css'],
})
export class AppointmentListViewComponent {
  @Input() appointments: IAppointment[] = [];
  @Output() ShowEditModal = new EventEmitter();
  @Output() handleItemDrop = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  handleClick() {
    console.log(this);
  }
}
