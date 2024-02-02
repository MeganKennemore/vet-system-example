import { LoggedInUser, User } from "../models/User";
import UsersData from "../static/Users.json";

const fetchUsers = () => {
  return UsersData as User[];
};

export const filterUsersByUsername = (username: string) => {
  return new Promise((resolve,reject) => {
    const filteredUsers = UsersData.filter((user) => {
      return user.username === username;
    }) as User[];
    if (filteredUsers.length > 0) {
      resolve(filteredUsers);
    } else {
      reject("No users with that username found");
    }
  });
};

export const loggedInUserIsValid = (loggedInUser: LoggedInUser) => {
  return new Promise((resolve, reject) => {
    if (!!loggedInUser.loginExpiration && typeof loggedInUser.loginExpiration === "string") {
      let today = new Date();
      if (new Date(loggedInUser.loginExpiration).valueOf() <= (new Date()).valueOf()) {
        reject("Logged-in user 'token' has expired");
      } else {
        resolve(true);
      }
    } else {
      reject("Logged-in user invalid");
    }
  });
};