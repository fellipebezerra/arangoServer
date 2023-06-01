import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
