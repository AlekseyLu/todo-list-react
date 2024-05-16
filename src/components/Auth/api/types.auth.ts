export interface IRegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface ReducerActions {
  type: string;
  payload: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface InfoUser {
  email: string;
  fullName: string;
  id: number;
}

export interface ResponseUser {
  token: string;
  data: InfoUser;
}
