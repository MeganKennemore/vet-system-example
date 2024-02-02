import { filterUsersByUsername } from "../../api/UsersApi";
import { setLoggedInUser, clearLoggedInUser } from "../LocalStorage";

export const login = (username: string, password: string) => {
  return filterUsersByUsername(username).then((result: any) => {
    if (result.length === 0 || result.length > 1) {
      return Promise.reject();
    } else if (result[0].username === username && result[0].password === password) {
      setLoggedInUser(result[0]).then((ret: any) => {
        if (typeof ret === "undefined") {
          return Promise.resolve();
        } else if (typeof ret === "object") {
          return Promise.reject(ret);  
        } else {
          return Promise.reject();
        }
      });
    } else {
      return Promise.reject();
    }
  }, (error) => {
    return Promise.reject(error);
  });
};


export const logout = async () => {
  return clearLoggedInUser().then((result: any) => {
    return Promise.resolve();
  }, (error: any) => {
    return Promise.reject(error);
  });
};