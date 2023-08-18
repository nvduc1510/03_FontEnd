import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/Page';
import { AddEmployeeDTO } from '../model/add_edit/EmployeeResponse';
import { DetailEmployee } from '../model/detail/DetailEmployee';
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

  /**
   * 
   * @param employee Đối tượng AddEmployeeDTO chứa thông tin về nhân viên mới cần tạo.
   * @returns trả về một đối tượng Observable<any>
   */
  addEmployee(employee: AddEmployeeDTO):Observable<any>{
    return this.http.post<any>(EMPLOYEE_API,employee);
  }
  // updateEmpoyee(employee)
  updateEmployee(employeeId: number, employeeDTO: AddEmployeeDTO): Observable<any> {
    const url = `${EMPLOYEE_API}/${employeeId}`;
    return this.http.put<AddEmployeeDTO>(url, employeeDTO);
  }

  /**
   * Gửi một yêu cầu HTTP GET đến một API để lấy thông tin nhân viên dựa trên ID.
   * @param employeeId ID của nhân viên cần lấy thông tin (kiểu dữ liệu: number).
   * @returns  trả về một đối tượng Observable<Detail>.
   */
    getEmployeeById(employeeId: number): Observable<DetailEmployee> {
      const url = `${EMPLOYEE_API}/${employeeId}`;
      return this.http.get<DetailEmployee>(url);
    }

}
