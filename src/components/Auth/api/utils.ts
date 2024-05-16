import { ILogin, IRegisterUser, ReducerActions } from "./types.auth";

export const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const registerReducer = (
  state: IRegisterUser,
  action: ReducerActions
) => {
  switch (action.type) {
    case "fullName":
      return { ...state, fullName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export const loginReducer = (state: ILogin, action: ReducerActions) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
