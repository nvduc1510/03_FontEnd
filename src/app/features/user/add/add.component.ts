import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { CertificationService } from 'src/app/service/certification.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ListEmployee } from '../../../model/ListEmployee';
import { Department } from 'src/app/model/Department';
import { Certification } from 'src/app/model/Certification';
import { state } from '@angular/animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  // Định dạng ngày
  public bsConfig: Partial<BsDatepickerConfig>;
  bsValue = new Date();

  employee : ListEmployee[] = [];
  department : Department[] = [];
  certification : Certification[] = [];
  // Group data
  data !: FormGroup;

  //Check message error
  isMessageError = false;

  //Check id certification
  hadCertification = false;

  //check xem còn valid khi submit sang màn confirm
  checkValidSubmit =false;

  // message error
  messageError = '';

  disEmployeeName = false;


  submitted = false
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private certificationService: CertificationService,
    private employeeService: EmployeeService) {
    this.bsConfig = {
      dateInputFormat: 'YYYY/MM/DD'
    }

    // Tạo form
    this.data = this.fb.group ({
      employeeId: [''],
      employeeLoginId: [''],
      departmentId : [''],
      employeeName :  [''],
      employeeNameKana : [''],
      employeeBirthDate : [''],
      employeeEmail : [''],
      employeeTelephone : [''],
      employeeLoginPassword : [''],
      employeeLoginPasswordConfirm : [''],
      certifications : this.fb.group ({
        certificationId : [''],
        certificationStartDate : [''],
        certificationEndDate : [''],
        employeeCertificationScore : [''],
      })
    })
  }

  ngOnInit() {
    this.getAllDepartment();
    this.getAllCertification();

  }
  // lấy dữ all data department
  getAllDepartment() : void {
    this.departmentService.getAllDepartment().subscribe({
      next : (data: any) => {
        if(data.code === 200) {
          this.department = data.department;
        } else {
          this.messageError= data.message;
        }
      }
    })
  }
  // Lấy all data certification
  getAllCertification() : void {
    this.certificationService.getAllCertification().subscribe({
      next : (data : any) => {
        if(data.code === 200) {
          this.certification = data.certification;
        } else {
          this.messageError =data.message;
        }
      }
    })
  }
  
  // Truyền dữ liệu sang màn confirm
  directionConfirm() : void {
    if(this.data.valid) {
      const getDataForm = this.data.value;
      this.router.navigate(["/user/confirm"], {state : {getDataForm}})
      this.checkValidSubmit = false;
    } else {
      this.checkValidSubmit = true;
    }
  }

}
