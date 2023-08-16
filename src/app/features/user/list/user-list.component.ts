import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConstants } from "../../../app-constants";
import { ListEmployee } from '../../../model/ListEmployee';
import { Department } from '../../../model/Department';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, finalize, of, tap } from 'rxjs';
import { Page } from '../../../model/Page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  departments : Department[] = [];
  employee : ListEmployee[] = [];

  loading = false;

  //search
  searchForm !: FormGroup;

  //List employee, arrange,page
  employeeName : any;
  departmentId : any;
  ordEmployeeName = '';
  ordCertificationName = '';
  ordEndDate = '';
  errorMessage : string | null = null;
  currentPage = 1;
  totalPage = 0;
  totalRecords = 0;
  offset = 1;
  limit = 10;

  
  constructor(
    public http: HttpClient,
    private departmentService : DepartmentService,
    private employeeService : EmployeeService,
    private router :  Router,
    private fb  : FormBuilder) { }

  ngOnInit(): void {

    // test call api auto inject token to header
    this.http.post(AppConstants.BASE_URL_API + "/test-auth", null)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    }); 

    this.searchForm = this.fb.group( {
      employeeName : [''],
      departmentId : ['']
    })

    // Xoá session khi F5
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('searchParams');
    });
    this.getAllDepartment();
    this.getAllEmployee();
    
  };

  ngOnDestroy(): void {
    const searchParams = {
      employeeName: this.employeeName,
      departmentId: this.departmentId,
      ord_employee_name: this.ordEmployeeName,
      ordEmployeeName: this.ordCertificationName,
      ordEndDate: this.ordEndDate,
      offset: this.offset,
      limit: this.limit
    };
    sessionStorage.setItem('searchParams', JSON.stringify(searchParams));
  }

  getAllEmployee() : void {
    this.loading = true;
    this.employeeService.getAllEmployee(
      this.searchForm.get('employeeName')?.value,
      this.searchForm.get('departmentId')?.value,
      this.ordEmployeeName,
      this.ordCertificationName,
      this.ordEndDate,
      this.offset,
      this.limit
    ) .subscribe ({
      next : (data : any) => {
        this.employee = data.employees,
        this.totalRecords = data.totalRecords,
        this.totalPage = Math.ceil(data.totalRecords / this.limit);
        if(this.totalRecords == 0) {
          this.loading = true;
          this.errorMessage = "検索条件に該当するユーザが見つかりません。"
        } else {
          this.loading = false;
        }
      }, error: (error : any) => {
        this.router.navigate(['/system-error'])
      }
    })
  }
  onSortChange(column : string) {
    if (column === 'employee_name') {
      if (this.ordEmployeeName === 'asc') {
        this.ordEmployeeName = 'desc';
      } else {
        this.ordEmployeeName = 'asc';
      }
      this.ordCertificationName = '';
      this.ordEndDate = '';
    } else if (column === 'certification_name') {
      if (this.ordCertificationName === 'asc') {
        this.ordCertificationName = 'desc';
      } else {
        this.ordCertificationName = 'asc';
      }
      this.ordEmployeeName = '';
      this.ordEndDate = '';
    } else if (column === 'end_date') {
      if (this.ordEndDate === 'asc') {
        this.ordEndDate = 'desc';
      } else {
        this.ordEndDate = 'asc';
      }
      this.ordCertificationName = '';
      this.ordEmployeeName = '';
    }
    // Cập nhật danh sách nhân viên với các tùy chọn sắp xếp mới
    this.getAllEmployee();
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPage) {
      this.offset = page;
      this.currentPage = (this.offset - 1) * this.limit;
      this.currentPage = page;
      this.getAllEmployee();
    }
  }

  search() : void {
    this.currentPage = 1; 
    this.offset = 1; 
    this.employeeName = this.searchForm.controls['employeeName'].value;
    this.departmentId = this.searchForm.controls['departmentId'].value;
    this.getAllEmployee();
  }

  getAllDepartment() {
    this.departmentService.getAllDepartment().subscribe(
      (data: any) => {
        this.departments = data.department;
      },
      (error) => {
        console.error('部門を取得できません: ', error);
      }
    );
  }
}
