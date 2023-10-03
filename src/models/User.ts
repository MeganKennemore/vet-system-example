export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  title: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export interface LoggedInUser {
  user: User;
  loginExpiration: string;
  settings?: any;
};