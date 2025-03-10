import { Component } from '@angular/core';

import { JobTitleComponent } from './job-title/job-title.component';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [JobTitleComponent,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
