import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-custom-validate',
  templateUrl: './custom-validate.component.html',
  styleUrls: ['./custom-validate.component.css']
})
export class CustomValidateComponent {

  //check valid employeeLoginId
  static ValidEmployeeLoginId(c: AbstractControl): MessageComponent | null {
    const loginFormat = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    const loginId = c.value
    if (loginId == 0) {
      return {
        code: 'ER001',
        params: '「カタカナ氏名」を入力してください '
      }
    }
    if (loginId.length > 50 ) {
      return {
        code: 'ER006',
        params: '50桁以内の「カタカナ氏名」を入力してください'
      }
    }
    if (!loginFormat.test(loginId)) {
      return {
        code: 'ER008',
        params: '「カタカナ氏名」に半角英数を入力してください'
      }
    }
    return null;
  }

  //check DepartmentName
  static ValidDepartment(c: AbstractControl): MessageComponent | null {
    const departmentId = c.value
    if (!departmentId) {
      return {
        code: 'ER001',
        params: '「グループ」を入力してください '
      }
    }
    return null;
  }

  //Check valid employeeName
  static ValidEmployeeName(c: AbstractControl): MessageComponent | null {
    const employeeName = c.value
    if (!employeeName) {
      return {
        code: 'ER001',
        params: '「氏名」を入力してください '
      }
    }

    if (employeeName.length > 125) {
      return {
        code: 'ER006',
        params: '125桁以内の「氏名」を入力してください'
      }
    }
    return null;
  }

  //check employeeNameKana
  static ValidEmployeeNameKana(c: AbstractControl): MessageComponent | null {
    const employeeNameKana = c.value
    const kanaHalfSize = /^[ｧ-ﾝﾞﾟ]+$/;
    if (!employeeNameKana && employeeNameKana == '') {
      return {
        code: 'ER001',
        params: '「カタカナ氏名」を入力してください '
      }
    }
    if (employeeNameKana.length > 125) {
      return {
        code: 'ER006',
        params: '125桁以内の「カタカナ氏名」を入力してください'
      }
    }
    if (!kanaHalfSize.test(employeeNameKana)) {
      return {
        code: 'ER009',
        params: '「カタカナ氏名」をカタカナで入力してください'
      }
    }
    return null;
  }

  //check valid employeeBirthDate
  static ValidEmployeeBirthDate(c: AbstractControl): MessageComponent | null {
    const birthDate = c.value
    const formDate = /^\d{4}\/\d{2}\/\d{2}$/
    if (!birthDate && birthDate === '') {
      return {
        code: 'ER001',
        params: '「生年月日」を入力してください '
      }
    }
    return null;
  }

  //check valid employeeTelephone
  static ValidEmployeeTelePhone(c: AbstractControl): MessageComponent | null {
    const employeeTelePhone = c.value
    const formTelePhone = /^_*[A-Za-z\d]{10}$/;
    if (!employeeTelePhone) {
      return {
        code: 'ER001',
        params: '「電話番号」を入力してください '
      }
    }
    if (employeeTelePhone.length > 50) {
      return {
        code: 'ER006',
        params: '50桁以内の「電話番号」を入力してください '
      }
    }
    if (!formTelePhone.test(employeeTelePhone)) {
      return {
        code: 'ER008',
        params: '「電話番号」に半角英数を入力してください '
      }
    }
    return null;
  }

  //check valid employeeEmial
  static ValidEmployeeEmail(c: AbstractControl): MessageComponent | null {
    const employeeEmail = c.value
    const formEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!employeeEmail) {
      return {
        code: 'ER001',
        params: '「メールアドレス」を入力してください '
      }
    }
    if (employeeEmail.length > 125) {
      return {
        code: 'ER006',
        params: '125桁以内の「メールアドレス」を入力してください'
      }
    }
    if (!formEmail.test(employeeEmail)) {
      return {
        code: '',
        params: '無効なメールアドレス!'
      }
    }
    return null;
  }

  //check valid employeeLoginPassword
  static ValidLoginPassword(c: AbstractControl): MessageComponent | null {
    const loginPassword = c.value
    if (!loginPassword) {
      return {
        code: 'ER001',
        params: '「パスワード」を入力してください'
      }
    }
    if (loginPassword.length < 8 || loginPassword.length > 50) {
      return {
        code: 'ER007',
        params: '「パスワード」を8＝桁数、'
      }
    }
    if (loginPassword.length > 50) {
      return {
        code: 'ER007',
        params: '「パスワード」＜＝50桁で入力してください '
      }
    }
    return null;
  }

  //Check valid employeeLoginPasswordConfirm
  static ValidLoginPasswordConfirm(c: AbstractControl): MessageComponent | null {
    const confirmPass = c.value

      if(!confirmPass){
        return {
          code : 'ER001',
          params : '「パスワード（確認）」を入力してください '
        }
      }
      if(confirmPass.length < 8 || confirmPass.length > 50){
        return {
          code : 'ER007',
          params : '「パスワード（確認）」を8＜＝ 8、＜＝50桁で入力してください '
        }
      }
    return null;
  }

  // check valid employeeLoginPasswordConfirm trùng với employeeLoginPassword
  static ConfirmPassword(f: FormGroup): MessageComponent | null {
    const v = f.value;
    const passwordControl = f.controls['employeeLoginPassword'];
    const confirmPasswordControl = f.controls['employeeLoginPasswordConfirm'];

    const passwordError = passwordControl.errors;

    if (confirmPasswordControl.touched && (v.employeeLoginPassword === v.employeeLoginPasswordConfirm || !!passwordError)) {
      return null;
    } else {
      return {
        code: 'ER017',
        params: '「パスワード（確認」が不正です。[ER017]'
      };
    }
  }

  //check certificationStartDate > certificationEndDate
  static certificateDateValidator(group: AbstractControl): MessageComponent | null {
    const startDate = group.get('certificationStartDate')?.value;
    const endDate = group.get('certificationEndDate')?.value;
    if (!startDate || !endDate) {
      // Nếu ngày bắt đầu hoặc ngày kết thúc là null, không cần xác thực
      return null;
    }
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      // Nếu ngày bắt đầu hoặc ngày kết thúc không phải là ngày hợp lệ, không cần xác thực
      return null;
    }
    if (endDateObj < startDateObj) {
      return {
        code: 'ER012',
        params: '「失効日」は「資格交付日」より未来の日で入力してください。[ER012]'
      };
    }
    return null;
  }

  // Check valid employeeCertificationSCore
  static ValidScore(c: AbstractControl): MessageComponent | null {
    const score = c.value
    const formScore = /^[0-9]*$/
    if (!score) {
      return {
        code: 'ER001',
        params: '「点数」を入力してください'
      }
    }
    if (!formScore.test(score)) {
      return {
        code: 'ER18',
        params: '「点数」は半角で入力してください。',
      }
    }
    return null;
  }

  //Check valid certificationDate
  static ValidStartDate(c: AbstractControl): MessageComponent | null {
    const startDate = c.value
    if (!startDate) {
      return {
        code: 'ER001',
        params: '「資格交付日」を入力してください'
      }
    }
    return null;
  }
  static ValidEndDate(c: AbstractControl): MessageComponent | null {
    const endDate = c.value
    if (!endDate) {
      return {
        code: 'ER001',
        params: '「失効日」」を入力してください'
      }
    }
    return null;
  }

}
