

export interface Test {
  test_name: string;
  test_for_condition: string;
  result: string;
  test_date: Date;
  result_date: Date;
  re_test_date: Date | "N/A";
  test_id: string;
  appt_id: string;
  patient_id: string;
};

export enum VaccinationType {
  L = "Live",
  ML = "Modified Live",
  K = "Killed"
};

export interface Vaccination {
  vaccination_name: string;
  type: VaccinationType;
  vac_date: Date;
  re_vac_date: Date;
  lot_number?: string;
  vac_id: string;
  appt_id: string;
  patient_id: string;
};

export interface MedicalCare {
  care: string;
  type: string;
  doses_or_recurrences?: string;
  for?: string;
  care_date: Date;
  review_date?: Date;
  care_id: string;
  appt_id: string;
  patient_id: string;
};

export interface ApptRecord {
  id: string; // This is the appt_id on all other record types
  type: string;
  subtype?: string;
  medical_status?: string;
  date: Date;
  review_date?: Date;
  vitals?: string;
  notes?: string;
  patient_id: string;
};

export interface Records {
  patient_id: string;
  appt_record: ApptRecord[];
  tests: Test[];
  vaccinations: Vaccination[];
  medical_care: MedicalCare[];
};