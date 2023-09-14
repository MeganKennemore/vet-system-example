import { Patient } from "../models/Patient";
import PatientsData from "../static/Patients.json";

export const fetchAllPatients = async () => {
  return PatientsData as Patient[];
};

export const fetchAllSpecies = async () => {
  let speciesNames = [] as string[];
  PatientsData.forEach((patient) => {
    let s = patient.species.toLowerCase();
    if (!speciesNames.includes(s)) {
      speciesNames.push(s);
    }
  });
  return speciesNames;
};

export const fetchPatientById = async (patientId?: string) => {
  if (patientId) {
    let data = PatientsData as Patient[];
    let patient = data.find((patient) => {
        return patient.patient_id === patientId;
    })
    return patient;
  }
  return undefined;
};

export const filterPatients = async (
  filterData: {
    patientName: string,
    ownerName: string,
    species: string
  }
) => {
  let { patientName, ownerName, species } = filterData;
  let data = PatientsData as Patient[];
  if (species !== "") {
    data = data.filter((patient) => {
      return patient.species.trim().toLowerCase() === species.trim().toLowerCase();
    });
  }

  if (patientName !== "") {
    data = data.filter((patient) => {
      let formattedPatient = patient.patient_name.trim().toLowerCase();
      let formattedName = patientName.trim().toLowerCase();
      return formattedPatient === formattedName || formattedPatient.includes(formattedName);
    });
  }

  if (ownerName !== "") {
    data = data.filter((patient) => {
      let formattedName = ownerName.trim().toLowerCase();
      let primaryOwnerMatches = patient.owner_primary.last_name.trim().toLowerCase() === formattedName;
      let primaryPartial = patient.owner_primary.last_name.trim().toLowerCase().includes(formattedName);
      let secondaryMatches = false;
      let secondaryPartial = false;
      if (patient.owner_secondary) {
        secondaryMatches = patient.owner_secondary.last_name.trim().toLowerCase() === formattedName;
        secondaryPartial = patient.owner_secondary.last_name.trim().toLowerCase().includes(formattedName);
      }
      return primaryOwnerMatches || primaryPartial || secondaryMatches || secondaryPartial;
    });
  }

  return data;
};