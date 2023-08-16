import { ListEmployee } from "./ListEmployee";

export interface Page {
    code : string;
    totalRecords : number;
    employees : ListEmployee[];
}