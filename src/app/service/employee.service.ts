import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/Page';
const EMPLOYEE_API = 'http://localhost:8085/employees';
const httpOptions = {headers : new HttpHeaders ({ 'Content-Type' : 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient){}
  
  
  /**
   *  Gửi một yêu cầu HTTP GET đến một API để lấy danh sách nhân viên dựa trên các tham số được truyền vào
   * @param employeeName Tên nhân viên để lọc danh sách (kiểu dữ liệu: string).
   * @param departmentId ID của phòng ban để lọc danh sách (kiểu dữ liệu: number).
   * @param ordEmployeeName Tên cột để sắp xếp theo tên nhân viên (kiểu dữ liệu: string).
   * @param ordCertificationName Tên cột để sắp xếp theo tên chứng chỉ (kiểu dữ liệu: string).
   * @param ordEndDate Tên cột để sắp xếp theo ngày kết thúc (kiểu dữ liệu: string).
   * @param offset Vị trí bắt đầu lấy dữ liệu (kiểu dữ liệu: number).
   * @param limit Số lượng bản ghi tối đa trả về (kiểu dữ liệu: number).
   * @returns  trả về một đối tượng Observable<Page>.
   */
  getAllEmployee(employeeName: string, departmentId: number, 
    ordEmployeeName: string, ordCertificationName: string, 
    ordEndDate: string, offset: number, limit: number) : Observable<Page> {
      const params = new HttpParams()
      .set('employeeName', employeeName)
      .set('departmentId', departmentId)
      .set('ordEmployeeName', ordEmployeeName)
      .set('ordCertificationName', ordCertificationName)
      .set('ordEndDate', ordEndDate)
      .set('offset', offset.toString())
      .set('limit', limit.toString());
      return this.http.get<Page>(EMPLOYEE_API + '/', {params});
  }

}
