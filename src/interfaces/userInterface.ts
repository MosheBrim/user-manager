export interface IUser {
  _id?: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface AdminState extends Omit<IUser, "password"> {
  _id: string;
  authToken: string;
}
