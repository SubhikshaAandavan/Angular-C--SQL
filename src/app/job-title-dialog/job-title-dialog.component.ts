import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-job-title-dialog',
  imports:[CommonModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './job-title-dialog.component.html',
  styleUrls: ['./job-title-dialog.component.css']
})
export class JobTitleDialogComponent {
  jobRole = '';
  title = '';

  constructor(public dialogRef: MatDialogRef<JobTitleDialogComponent>) {}

  save(): void {
    if (this.jobRole && this.title) {
      this.dialogRef.close({ jobRole: this.jobRole, title: this.title });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
