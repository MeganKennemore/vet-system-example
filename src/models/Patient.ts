import { Owner } from "./Owner";
import { Records } from "./Records";

export enum PatientSex {
    M = "Male",
    F = "Female",
    I = "Intersex",
    U = "Unknown",
};

export enum PatientIntact {
    F = "Fixed",
    I = "Intact",
    U = "Unknown",
};

export const getIntactLanguage = (patient: Patient) => {
    if (patient.intact === PatientIntact.F && patient.sex === PatientSex.M) {
        return "Neutered";
    } else if (patient.intact === PatientIntact.F && patient.sex === PatientSex.F) {
        return "Spayed";
    } else if (patient.intact === PatientIntact.U) {
        return "Presumed intact";
    } else {
        return patient.intact;
    }
};

export interface Patient {
    patient_id: string;
    species: string;
    sex: PatientSex;
    intact: PatientIntact;
    patient_name: string;
    owner_primary: Owner;
    owner_secondary?: Owner;
    records: Records;
    image?: string;
    notes: string;
    birthdate: string;
    breed?: string;
    warnings: string[];
};