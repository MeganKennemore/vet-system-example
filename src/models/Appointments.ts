import { Patient } from "./Patient";
import { User } from "./User";


export interface Appointments {
  id: string;
  employees: User[];
  date: string;
  time: string;
  length: number;
  type: string;
  //patients: Patient[];
  patient_name: string;
  startDate?: string;
  endDate?: string;
  title?: string;
};