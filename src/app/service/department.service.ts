import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/Department';
const DEPARTMENT_API =  'http://localhost:8085/departments';
const httpOptions = {headers : new HttpHeaders ({ 'Content-Type' : 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http : HttpClient) { }

  // Gửi yêu cầu HTTP GET lấy API trả về một observable
  getAllDepartment() : Observable<any>{
    const url = `${DEPARTMENT_API}`;
    return this.http.get(url);
  }
}
