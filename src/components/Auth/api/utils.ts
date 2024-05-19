import { ILogin, IRegisterUser, ReducerActions } from "./types.auth";

type ResultValidField = {
  isValid: boolean;
  error: string;
};

export const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const regExName = /^[a-zA-Z_-]{2,16}$/;
const regExEmail =
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
const regExPass = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/;

export const fieldValidRegister = (user: IRegisterUser): ResultValidField => {
  let isValid = false;
  const { email, fullName, password } = user;

  if (!regExName.test(fullName)) {
    isValid = true;
    return { isValid, error: "Не корректное имя" };
  } else {
    isValid = false;
  }

  if (!regExEmail.test(email)) {
    isValid = true;
    return { isValid, error: "Не корректная эл. почта" };
  } else {
    isValid = false;
  }

  if (!regExPass.test(password)) {
    isValid = true;
    return { isValid, error: "Пароль должен быть не менее 8 символов и содержать: '!', '#', '$', '%', '&', '?'" };
  } else {
    isValid = false;
  }

  return { isValid, error: "" };
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
