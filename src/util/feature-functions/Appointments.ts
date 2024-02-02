import { AppointmentModel } from "../../models/Appointments";
import { clearAppointments, setAppointments } from "../LocalStorage";
import AppointmentsData from "../../static/Appointments.json";
import UserData from "../../static/Users.json";
import PatientsData from "../../static/Patients.json";
import { User } from "../../models/User";
import { Patient, getIntactLanguage } from "../../models/Patient";

let today = new Date();

const createAppointments = () => {
  let generatedAppointments = [] as AppointmentModel[];
  let allEmployees = UserData as User[];
  let allPatients = PatientsData as Patient[];
  let numberOfAppointments = Math.floor((Math.random() * 42) + 14);
  let possibleAppointments = [
    { type: "Pre-Op", notes: "Pre-surgery bloodwork" }, 
    { type: "Surgery", notes: "Foreign Object Removal" }, 
    { type: "Dental Cleaning", notes: "Routine dental cleaning, no tooth removal" },
    { type: "Dental Cleaning", notes: "Dental cleaning with possible tooth extractions" },
    { type: "Post-Op", notes: "Post operation care and post op instructions for owners" }, 
    { type: "Check-Up", notes: "Routine yearly checkup and vaccinations" }, 
    { type: "General Care", notes: "Owner requested a routine care appointment" }, 
    { type: "Wound Care", notes: "Owner reports infected tick bite" },
    { type: "Wound Care", notes: "Owner reports patient has gash down forelimb" },
    { type: "Wound Care", notes: "Owner reports patient has wound in rear pawpad" },
    { type: "Exam", notes: "Routine examination" },
    { type: "Exam", notes: "Checking for parasites" },
    { type: "Exam", notes: "Weight loss progress" },
  ];
  let possibleTimes = [15, 30, 45, 60, 90];
  for (let i = 0; i < numberOfAppointments; i++) {
    let appt = possibleAppointments[Math.floor(Math.random() * possibleAppointments.length)];
    let patient = allPatients[Math.floor(Math.random() * 5)];
    let owners = [patient.owner_primary];
    if (patient.owner_secondary) {
      owners.push(patient.owner_secondary);
    }
    let hour = Math.floor((Math.random() * 9) + 7);
    let minutes = Math.floor(Math.random() + 1) * 30;
    let startDate = new Date(today.getFullYear(), today.getMonth(), Math.floor(Math.random() * 27), hour, minutes, 0, 0);
    let endDate;
    if (hour < 16){
      endDate = new Date(startDate.valueOf() + (60000 * possibleTimes[Math.floor(Math.random() + 1)]));
    } else {
      endDate = new Date(startDate.valueOf() + (60000 * possibleTimes[Math.floor(Math.random() * 5)]));
    }
    let newAppt = {
      id: `appt-0${i > 2 ? 0 : ""}` + (i + 8),
      employees: [allEmployees[Math.floor(Math.random() + 0.5)]],
      patients: [{patient_id: patient.patient_id, patient_name: patient.patient_name, patient_species: patient.species, patient_gender: `${getIntactLanguage(patient)} ${patient.sex}`}],
      owners: owners, 
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      records: [],
      type: appt.type,
      status: startDate.valueOf() > today.valueOf() ? "Completed" : "Confirmed",
      pre_appt_notes: appt.notes,
      title: appt.type
    } as AppointmentModel;
    generatedAppointments.push(newAppt);
  }
  return generatedAppointments;
}

export const loadAppointments = async () => {
  clearAppointments();
  let todaysAppointments = [] as AppointmentModel[];
  let allAppts = AppointmentsData;
  allAppts.forEach((appt) => {
    let goodAppt = {...appt} as any;
    let start = new Date(`${today.toDateString()} ${appt.time}`);
    goodAppt.startDate = start.toISOString();
    let end = new Date(start.valueOf() + (appt.length * 60000));
    goodAppt["endDate"] = end.toISOString();
    goodAppt["title"] = appt.type;
    todaysAppointments.push(goodAppt);
  });
  // Randomly generate some appointments and add the today's appointments
  let allAppointments = createAppointments();
  return setAppointments(allAppointments.concat(todaysAppointments)).then((ret) => {
    if (typeof ret === "undefined") {
      return Promise.resolve(true);
    } else if (typeof ret === "object") {
      return Promise.reject(false);  
    } else {
      return Promise.reject(false);
    }
  });
};