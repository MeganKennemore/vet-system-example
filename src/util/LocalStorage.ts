import { AppointmentModel } from "../models/Appointments";
import { LoggedInUser, User } from "../models/User";

const getLocalStorage = () => {
  return window.localStorage;
};

export const getLoggedInUser = () => {
  let user = getLocalStorage().getItem("loggedInUser");
  
  if (!!user) {
    let today = (new Date()).valueOf();
    let parsedUser = JSON.parse(user) as LoggedInUser;
    /**
     * if (loggedInUserIsValid(parsedUser)) {
     *   return parsedUser;
     * }
     */
    if (today < new Date(parsedUser.loginExpiration).valueOf()) {
      // @ts-ignore
      globalThis.__LOGGEDINUSER__ = parsedUser;
      return;
    }
  }
  // @ts-ignore
  globalThis.__LOGGEDINUSER__ = undefined;
  return;
};

export const setLoggedInUser = async (user: User) => {
  if (!!user) {
    let loggedInUser = {
      user: user,
      loginExpiration: (new Date((new Date()).valueOf() + 172800000)).toISOString()
    };
    // @ts-ignore
    globalThis.__LOGGEDINUSER__ = loggedInUser;
    return getLocalStorage().setItem("loggedInUser", JSON.stringify(loggedInUser));
  }
  return Error("Could not save user information to local storage: no user object provided");
};

export const clearLoggedInUser = async () => {
  getLocalStorage().removeItem("loggedInUser");
  // @ts-ignore
  globalThis.__LOGGEDINUSER__ = undefined;
};

export const getAppointments = async () => {
  try {
    let appts = getLocalStorage().getItem("appointments");
    if (appts) {
      let parsedAppts = JSON.parse(appts);
      if (Array.isArray(parsedAppts)) {
        return parsedAppts as AppointmentModel[];
      }
    }
    return Error("Could not load appointments");
  } catch (err) {
    return Error("Could not load appointments: " + err);
  }
};

export const setAppointments = async (appointments: AppointmentModel[]) => {
  if (Array.isArray(appointments)) {
    try {
      return getLocalStorage().setItem("appointments", JSON.stringify(appointments));
    } catch (err) {
      return Error("Could not set appointments: " + err);
    }
  }
  return Error("Could not set appointments: inappropriate appointments array provided");
};

export const clearAppointments = async () => {
  getLocalStorage().removeItem("appointments");
};