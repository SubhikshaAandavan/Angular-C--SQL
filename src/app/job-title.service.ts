import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface JobTitle {
  id?: number;
  jobRole: string;
  title: string;
  createdBy: string;
  createdOn: string;
  modifyBy?: string | null;
  modifyOn?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  private apiUrl = 'https://localhost:7225/api/jobtitles';

  constructor(private http: HttpClient) {}

  insertDetails(jobTitle: JobTitle): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert`, jobTitle);
  }

  updateDetails(jobTitle: JobTitle): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`,jobTitle);
  }
  getAllJobTitles(): Observable<any> {
    return this.http.get<JobTitle[]>(`${this.apiUrl}/get`);
  }
}
