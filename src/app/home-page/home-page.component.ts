import { ViewChild, Component, Inject, LOCALE_ID } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatCalendar } from '@angular/material/datepicker';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAppointment, payloadWithIndex } from 'src/assets/interface';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  @ViewChild('myDate', { static: false }) myDate?: MatCalendar<Date>;

  appointments: IAppointment[] = [
    {
      name: 'Item 1',
      date: '06/21/2023',
      time: '02:22',
    },
    {
      name: 'Item 2',
      date: '06/15/2023',
      time: '02:12',
    },
    {
      name: 'Item 3',
      date: '06/5/2023',
      time: '02:02',
    },
  ];

  constructor(
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public localeId: string
  ) {}
  ngAfterViewInit(): void {
    if (this.myDate) {
      this.myDate.updateTodaysDate();
    }
  }
  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const appointmentIndex = this.appointments.findIndex((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
    if (appointmentIndex !== -1) {
      return 'has-appointments';
    }
    return '';
  };
  handleItemDrop(event: CdkDragDrop<string[]>) {
    const draggedAppointment = this.appointments[event.previousIndex];
    this.appointments.splice(event.previousIndex, 1);
    this.appointments.splice(event.currentIndex, 0, draggedAppointment);
  }

  handleFormSubmit(appointmentForm: FormGroup) {
    if (appointmentForm.invalid) {
      return;
    }

    const newAppointment = {
      name: appointmentForm.value.name,
      date: formatDate(appointmentForm.value.date, 'MM/dd/YYYY', this.localeId),
      time: appointmentForm.value.time,
    };

    this.appointments = [...this.appointments, newAppointment];
    this.myDate?.updateTodaysDate();
    appointmentForm.reset();
  }
  deleteItem({ index, name }: { index: number; name: string }) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: name,
    });
    dialogRef.afterClosed().subscribe((status: boolean) => {
      if (status) {
        this.appointments.splice(index, 1);
        this.myDate?.updateTodaysDate();
      }
    });
  }
  ShowEditModal({
    appointment,
    index,
  }: {
    appointment: IAppointment;
    index: number;
  }) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '600px',
      data: { ...appointment, index },
    });

    dialogRef
      .afterClosed()
      .subscribe((updatedAppointment: payloadWithIndex) => {
        if (updatedAppointment?.index !== undefined) {
          const index = updatedAppointment.index;
          delete updatedAppointment.index;
          this.appointments[index] = updatedAppointment;
          this.myDate?.updateTodaysDate();
        }
      });
  }
}
