import { Appointments } from "../models/Appointments";
import AppointmentsData from "../static/Appointments.json";

const getAllAppointments = async () => {
  let today = (new Date()).toDateString();
  let allAppts = AppointmentsData as Appointments[];
  allAppts.forEach((appt) => {
    let start = new Date(`${today} ${appt.time}`);
    appt.startDate = start.toISOString();
    let end = new Date(start.valueOf() + (appt.length * 60000));
    appt.endDate = end.toISOString();
    appt.title = `${appt.type} - ${appt.patient_name}`;
  });
  return allAppts;
};

export const fetchAppointmentsByUserId = async (userId: string) => {
  let theirAppts = [] as Appointments[];
 return getAllAppointments().then((allAppts) => {
    allAppts.forEach((appt: Appointments) => {
      let userIdPresent = appt.employees.some((user) => {
        return user.user_id === userId;
      });
      if (userIdPresent) {
        theirAppts.push(appt);
      }
    });
    return theirAppts;
  });
};