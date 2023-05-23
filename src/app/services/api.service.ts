import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getProjects(): Observable<any> {
    return this.http.get<any>('http://localhost:9091/projects/all');
  }
}
