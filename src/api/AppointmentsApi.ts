import { AppointmentModel } from "../models/Appointments";
import AppointmentsData from "../static/Appointments.json";
import { getAppointments } from "../util/LocalStorage";

/* const getAllAppointments = async () => {
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
}; */

export const fetchAppointmentsByUserId = async (userId: string) => {
  return getAppointments().then((appointments: AppointmentModel[] | Error) => {
    if (appointments instanceof Error) {
      // TODO: Error handling;
      return [];
    } else {
      let theirAppts = [] as AppointmentModel[];
      appointments.forEach((appt: AppointmentModel) => {
        let userIdPresent = appt.employees.some((user) => {
          return user.user_id === userId;
        });
        if (userIdPresent) {
          theirAppts.push(appt);
        }
      });
      return theirAppts;
    }
  });
};

export const fetchAppointmentByApptId = async (apptId: string) => {
  return getAppointments().then((appointments: AppointmentModel[] | Error) => {
    if (appointments instanceof Error) {
      // TODO: Error handling;
      return undefined;
    } else {
      return appointments.find((appt) => {
        return appt.id === apptId;
      });
    }
  });
};