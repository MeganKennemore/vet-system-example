
import { Owner } from "./Owner";
import { ApptRecord } from "./Records";
import { User } from "./User";

export interface ApptPatient {
  patient_id: string;
  patient_name: string;
  patient_species: string;
  patient_gender: string;
};

export enum AppointmentStatus {
  new = "New",
  confirmed = "Confirmed",
  inprogress = "In Progress",
  completed = "Completed",
  unknown = "Unknown",
};

export interface AppointmentModel {
  id: string;
  employees: User[];
  patients: ApptPatient[];
  owners: Owner[];
  startDate: string;
  endDate: string;
  type: string;
  status: AppointmentStatus;
  records: ApptRecord[];
  pre_appt_notes: string;
  title?: string;
};