import { filterUsersByUsername } from "../../api/UsersApi";
import { clearLoggedInUser, setLoggedInUser } from "./AppSlice";

export const login = (username: string, password: string) => (dispatch: any) => {
  return filterUsersByUsername(username).then((result: any) => {
    if (result.length === 0 || result.length > 1) {
      return Promise.reject();
    } else if (result[0].username === username && result[0].password === password) {
      dispatch(setLoggedInUser(result[0])).then(() => {
        return Promise.resolve();
      })
      
    } else {
      return Promise.reject();
    }
  }, (error) => {
    return Promise.reject(error);
  })
};

export const logout = async () => (dispatch: any) => {
  return dispatch(clearLoggedInUser()).then((result: any) => {
    return Promise.resolve();
  }, (error: any) => {
    return Promise.reject(error);
  })
};