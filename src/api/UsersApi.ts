import { User } from "../models/User";
import UsersData from "../static/Users.json";

const fetchUsers = () => {
  return UsersData as User[];
};

export const filterUsersByUsername = (username: string) => {
  return new Promise((resolve,reject) => {
    const filteredUsers = UsersData.filter((user) => {
      return user.username === username;
    });
    if (filteredUsers.length > 0) {
      resolve(filteredUsers);
    } else {
      reject("No users with that username found");
    }
  });
};