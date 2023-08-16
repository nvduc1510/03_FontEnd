/**
 *  Định nghĩa cấu trúc dữ liệu cho một đối tượng đáp ứng (response) của danh sách nhân viên 
 */
export interface ListEmployee {
    employeeId : number;
    employeeName : string;
    employeeBirthDate : Date;
    departmentName : string;
    employeeEmail : string;
    employeeTelephone : string;
    certificationName : string;
    endDate : Date;
    score : number
}