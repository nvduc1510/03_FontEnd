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
import { CustomValidateComponent } from '../validate/custom-validate/custom-validate.component';

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

  disEmployeeLoginId = false;


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
      employeeId: ['',],
      employeeLoginId: ['', CustomValidateComponent.ValidEmployeeLoginId],
      departmentId : ['', CustomValidateComponent.ValidDepartment],
      employeeName :  ['', CustomValidateComponent.ValidEmployeeName],
      employeeNameKana : ['', CustomValidateComponent.ValidEmployeeNameKana],
      employeeBirthDate : ['', CustomValidateComponent.ValidEmployeeBirthDate],
      employeeEmail : ['', CustomValidateComponent.ValidEmployeeEmail],
      employeeTelephone : ['', CustomValidateComponent.ValidEmployeeTelePhone],
      employeeLoginPassword : ['', CustomValidateComponent.ValidLoginPassword],
      employeeLoginPasswordConfirm : ['', CustomValidateComponent.ValidLoginPasswordConfirm],
      certifications : this.fb.group ({
        certificationId : [''],
        certificationStartDate : [''],
        certificationEndDate : [''],
        employeeCertificationScore : [''],
      }, {
        validators: CustomValidateComponent.certificateDateValidator,
      })
    }, {
      validator: CustomValidateComponent.ConfirmPassword,
    })
  }

  ngOnInit() {

    this.messageError = history.state.notification;

    this.getAllDepartment();
    this.getAllCertification();
    this. assignValue();

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

  // Xử lý hạng mục certification
  onChangeCertification() {
    const cerId = this.data?.value.certifications?.certificationId;
    const cer = this.data.get('certifications');
    // Th có certificationID
    if(cerId) {
      this.hadCertification = true;
      cer?.get('certificationStartDate')?.setValidators([CustomValidateComponent.ValidStartDate]);
      cer?.get('certificationEndDate')?.setValidators([CustomValidateComponent.ValidEndDate]);
      cer?.get('employeeCertificationScore')?.setValidators([CustomValidateComponent.ValidScore]);
    } else {
      // Th không có certificationID
      this.hadCertification = false;
      cer?.get('certificationStareDate')?.clearValidators();
      cer?.get('certificationEndDate')?.clearValidators();
      cer?.get('employeeCertificationScore')?.clearValidators();

      cer?.get('certificationStareDate')?.reset();
      cer?.get('certificationEndDate')?.reset();
      cer?.get('employeeCertificationScore')?.reset();
    }
    cer?.get('certificationStareDate')?.updateValueAndValidity;
    cer?.get('certificationEndDate')?.updateValueAndValidity;
    cer?.get('employeeCertificationScore')?.updateValueAndValidity;
  }
  
  // Truyền dữ liệu sang màn confirm
  directionConfirm() : void {
    if(this.data.valid) {
      const departmentId = this.data.value.departmentId;
      const department = this.department.find(d => d.departmentId == departmentId);
      const certificationId = this.data.value.certificationId;
      const certification = this.certification.find(c => c.certificationId == certificationId);
      const getDataForm = { employee : this.data.value, department : department, certification : certification}
      this.router.navigate(["/user/confirm"], {state : {getDataForm}})
      this.checkValidSubmit = false;
    } else {
      this.checkValidSubmit = true;
    }
  }
  //  // Lưu session
  // saveFormData(): void {
  //   sessionStorage.setItem('formGroupData', JSON.stringify(this.data.value));
  // }
  // // khôi phục trạng thái form gruop
  // restoreFormData() {
  //   const formData = sessionStorage.getItem('formGroupData');
  //   if (formData) {
  //     this.data.patchValue(JSON.parse(formData));
  //   }
  // }
  // listenToFormData() {
  //   this.data.valueChanges.subscribe(() => {
  //     this.saveFormData();
  //   });
  // }
  // Xoá session
  clearFormData() {
    sessionStorage.removeItem('formGroupData');
  }

  cancel(){
    this.clearFormData();
    this.router.navigate(['/user/list']);
  }
  getEmployeeById(employeeId : any) {
    this.employeeService.getEmployeeById(employeeId).subscribe ({
      next : (res) => {
        this.data.patchValue(res);
        if(res.certifications[0].certificationName == null) {
          this.data.patchValue({
            certificationId : "",
            certificationStartDate : null,
            certificationEndDate : null,
            employeeCertificationScore : null
          });
        } else {
          this.data.controls['certifications'].patchValue(res.certifications[0])
          this.hadCertification = true;
        }
      }, error : (error) => {
        console.error('Error fetching employee details:', error);
      }
    })
  }

  // Gán dữ liệu từ màn Confirm về
  assignValue() {
    const assignValue = history.state.data;
    // console.log("abc: ", assignValue);
    
    // const employeeId = assignValue?.data.employeeId;
    // if (employeeId) {
    //   this.disEmployeeLoginId = true;
    //   if(assignValue) {
    //     this.data.patchValue(history.state.data);
    //     const password = this.data.get('employeeLoginPassword');
    //     const confirmPassword = this.data.get('employeeLoginPasswordConfirm');
    //     if(password?.value == ''){
    //       password?.clearValidators();
    //       confirmPassword?.clearValidators();
    //     } else {
    //       password?.setValidators([CustomValidateComponent.ValidLoginPassword]);
    //       confirmPassword?.setValidators([CustomValidateComponent.ValidLoginPasswordConfirm]);
    //     }
    //     password?.updateValueAndValidity();
    //     confirmPassword?.updateValueAndValidity();
    //   } else {
    //     const password = this.data.get('employeeLoginPassword');
    //     const confirmPassword = this.data.get('employeeLoginPasswordConfirm');
    //     if(password?.value == ''){
    //       password?.clearValidators();
    //       confirmPassword?.clearValidators();
    //     } else {
    //       password?.setValidators([CustomValidateComponent.ValidLoginPassword]);
    //       confirmPassword?.setValidators([CustomValidateComponent.ValidLoginPasswordConfirm]);
    //     }
    //     password?.updateValueAndValidity();
    //     confirmPassword?.updateValueAndValidity();
    //     this.getEmployeeById(employeeId);
    //   }
    // } else {
      const certificationId = assignValue?.certifications?.certificationId;
      if(certificationId) {
        this.hadCertification = true;
      }
      this.data.patchValue(history.state.data)
    // }
  }


}
