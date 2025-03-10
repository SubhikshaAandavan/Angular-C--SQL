/*
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JobTitleService } from '../job-title.service';
import { JobTitleDialogComponent } from '../job-title-dialog/job-title-dialog.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import {MatIconModule} from '@angular/material/icon';

import { MatDialogModule, } from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
;
import { MatSort, MatSortModule } from '@angular/material/sort';

interface JobTitle {
  id?: number;
  jobRole: string;
  title: string;
  createdBy: string;
  createdOn: string;
  modifyBy?: string | null;
  modifyOn?: string | null;
  isEditing?: boolean;
  oldTitle?: string;
  oldRole?: string;
}

@Component({
  selector: 'app-job-title',
  imports:[FormsModule,CommonModule,MatTableModule,MatIconModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobTitleComponent implements OnInit {
  displayedColumns: string[] = ['jobRole', 'title', 'createdBy', 'createdOn', 'modifyBy', 'modifyOn', 'actions'];
  dataSource = new MatTableDataSource<JobTitle>([]);

  constructor(private dialog: MatDialog, private jobTitleService: JobTitleService) {}

  ngOnInit(): void {
    this.fetchData(); 
  }

  fetchData(): void {
    this.jobTitleService.getAllJobTitles().subscribe((data: JobTitle[]) => {
     this.dataSource.data = data.sort((a: JobTitle, b: JobTitle) => 
       new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobTitleDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result: JobTitle | undefined) => {
      if (result) {
        result.createdBy = 'Subhi';
        result.createdOn = new Date().toISOString();
        result.modifyBy = null;
        result.modifyOn = null;

        this.jobTitleService.insertDetails(result).subscribe({
          next: () => {
            this.fetchData(); 
          },
          error: (err) => console.error('Error inserting data:', err)
        });
      }
    });
  }

  editRow(jobTitle: JobTitle): void {
    jobTitle.oldTitle = jobTitle.title;
    jobTitle.oldRole = jobTitle.jobRole;
    jobTitle.isEditing = true;
  }

  saveRow(jobTitle: JobTitle): void {
    const updatedJobTitle = {
      oldTitle: jobTitle.oldTitle,
      oldRole: jobTitle.oldRole,
      jobRole: jobTitle.jobRole,
      title: jobTitle.title,
      createdBy: jobTitle.createdBy,
      createdOn: jobTitle.createdOn,
      modifyBy: 'Subhi A',
      modifyOn: new Date().toISOString()
    };

    this.jobTitleService.updateDetails(updatedJobTitle).subscribe({
      next: () => {
        this.fetchData(); 
      },
      error: (err) => console.error('Error updating data:', err)
    });
  }
}
*/
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'; 
import { JobTitleService } from '../job-title.service';
import { JobTitleDialogComponent } from '../job-title-dialog/job-title-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

interface JobTitle {
  id?: number;
  jobRole: string;
  title: string;
  createdBy: string;
  createdOn: string;
  modifyBy?: string | null;
  modifyOn?: string | null;
  isEditing?: boolean;
  oldTitle?: string;
  oldRole?: string;
}

@Component({
  selector: 'app-job-title',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatTableModule, MatIconModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSortModule,MatPaginator,MatPaginatorModule
  ],
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobTitleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['jobRole', 'title', 'createdBy', 'createdOn', 'modifyBy', 'modifyOn', 'actions'];
  dataSource = new MatTableDataSource<JobTitle>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private dialog: MatDialog, private jobTitleService: JobTitleService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; 
  }

  fetchData(): void {
    this.jobTitleService.getAllJobTitles().subscribe((data: JobTitle[]) => {
      this.dataSource.data = data;  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobTitleDialogComponent, {
      width: '500px',
     
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result: JobTitle | undefined) => {
      if (result) {
        result.createdBy = 'Subhi';
        result.createdOn = new Date().toISOString();
        result.modifyBy = null;
        result.modifyOn = null;

        this.jobTitleService.insertDetails(result).subscribe({
          next: () => this.fetchData(),
          error: (err) => console.error('Error inserting data:', err)
        });
      }
    });
  }

  editRow(jobTitle: JobTitle): void {
    jobTitle.oldTitle = jobTitle.title;
    jobTitle.oldRole = jobTitle.jobRole;
    jobTitle.isEditing = true;
  }

  saveRow(jobTitle: JobTitle): void {
    const updatedJobTitle = {
      oldTitle: jobTitle.oldTitle,
      oldRole: jobTitle.oldRole,
      jobRole: jobTitle.jobRole,
      title: jobTitle.title,
      createdBy: jobTitle.createdBy,
      createdOn: jobTitle.createdOn,
      modifyBy: 'Subhi A',
      modifyOn: new Date().toISOString()
    };

    this.jobTitleService.updateDetails(updatedJobTitle).subscribe({
      next: () => this.fetchData(),
      error: (err) => console.error('Error updating data:', err)
    });
  }
}
