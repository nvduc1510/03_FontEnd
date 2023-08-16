import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const CERTIFICATION_API = "http://localhost:8085/certification";
const httpOptions = {headers : new HttpHeaders({'Content-Type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private http : HttpClient) { }

   //Gửi yêu cầu HTTPGet lấy API  trả về một Observable
  getAllCertification() : Observable<any> {
    return this.http.get<any>(CERTIFICATION_API+"/");
  }
}
