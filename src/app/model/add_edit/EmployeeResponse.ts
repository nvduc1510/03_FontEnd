import { EmployeeCertification } from "./EmployeeCertification";

export interface AddEmployeeDTO{
    employeeId?: number;
    departmentId:number;
    departmentName:string;
    employeeName:string;
    employeeNameKana:string;
    employeeBirthDate: string;
    employeeEmail: string;
    employeeTelephone: number;
    employeeLoginId: string;
    employeeLoginPassword: string;
    certifications: EmployeeCertification[];
}