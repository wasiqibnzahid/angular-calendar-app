import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HomePageComponent } from './home-page.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentListViewComponent } from '../appointment-list-view/appointment-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
    EditModalComponent,
    DeleteDialogComponent,
    AppointmentFormComponent,
    AppointmentListViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
})
export class HomePageModule {}
