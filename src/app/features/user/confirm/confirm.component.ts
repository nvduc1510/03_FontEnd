import { state } from '@angular/animations';
import { Certification } from './../../../model/Certification';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddEmployeeDTO } from 'src/app/model/add_edit/EmployeeResponse';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  data : any;
  employeeForm : any;
  department : any;
  certification : any;
  employeeCertification : any;

  

  constructor(
    private router : Router,
    private employeeService : EmployeeService,
  ){
    
  }

  ngOnInit() {
    this.getData();
    
  }
  private formatDate(dateStr : string) : string {
    if(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month =  (date.getMonth() +1).toString().padStart(2,'0');
      const day = date.getDate().toString().padStart(2,'0');
      return  `${year}/${month}/${day}`;
    }
    return ``;
  }
  // Lấy data từ màn add_edit truyền sang
  getData() {
    this.data = history.state.getDataForm;
    this.department = this.data?.department;
    this.employeeForm = this.data?.employee;
    this.certification = this.data?.Certification;
    this.employeeCertification = this.data?.employee.certifications;
    console.log("data form", this.employeeForm);
    
  }

  onSubmit() {
    const employeeData : AddEmployeeDTO = {
      departmentId : this.employeeForm.departmentId,
      departmentName : this.employeeForm.departmentName,
      employeeName : this.employeeForm.employeeName,
      employeeNameKana : this.employeeForm.employeeNameKana,
      employeeBirthDate : this.employeeForm.employeeBirthDate,
      employeeEmail : this.employeeForm.employeeEmail,
      employeeTelephone : this.employeeForm.employeeTelephone,
      employeeLoginId : this.employeeForm.employeeLoginId,
      employeeLoginPassword : this.employeeCertification.employeeLoginPassword,
      certifications : []
    }
    const certification = this.employeeForm?.certifications;
    if(certification.certificationId) {
      certification.certificationStartDate = this.formatDate(certification.certificationStartDate);
      certification.certificationEndDate = this.formatDate(certification.certificationEndDate);
      employeeData.certifications.push(certification);
    }

    // Thực hiện hàm add
    this.employeeService.addEmployee(employeeData).subscribe ({
      next : res => {
        if(res === 200) {
          const message =  "ユーザの登録が完了しました。";
          this.router.navigate(['user/message'], {state : {notification : message}})
        } else {
          const employeeForm = this.employeeForm;
          this.router.navigate(['user/add_edit'], {state : {data : employeeForm ,notification : res.message.params}})
        }
      }
    })
  }
  // Back về mà add_edit truyền theo form data
  // cancel() {
  //   const checkId = history.state.getDataForm;
  //   const employeeId = checkId?.employeeForm.employeeId;
  //   // TH trong employeeForm có employeeID
  //   if(employeeId) {
  //     const data = this.employeeForm;
  //     this.router.navigate(['user/add_edit'], {state: {data : data, employeeId: employeeId}});
  //   } else {
  //     // TH trong employeeForm không có employeeID
  //     const data = this.employeeForm;
  //     this.router.navigate(['user/add_edit'], {state: {data : data}})
  //     console.log("data: ", data);
      
  //   }
  // }
  cancel() {
    const data = this.employeeForm
    this.router.navigate(['user/add_edit'], {state : {data : data} })
  }
}
