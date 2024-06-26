import { FC, FormEvent, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Title } from "../../Header/ui/Title";
import { TextField } from "../ui/TextField";
import { ButtonCustom } from "../ui/ButtonCustom";
import { Unauthorization } from "../ui/Unauthorization";

import { fieldValidRegister, registerReducer } from "../api/utils";
import { useAuth } from "../api/store";

type Props = {
  setIsLogin: (prev: (arg: boolean) => boolean) => void;
};

const initialValue = {
  fullName: "",
  email: "",
  password: "",
};

export const Register: FC<Props> = ({ setIsLogin }) => {
  const redirect = useNavigate();
  const [user, dispatch] = useReducer(registerReducer, initialValue);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  const { createNewUser, auth, err } = useAuth((state) => state);

  const handleChangeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validUser = fieldValidRegister(user);
    if (!validUser.isValid) {
      createNewUser(user);
      setError(false);
      setErrMessage("");
    } else {
      setError(true);
      setErrMessage(validUser.error);
    }
  };

  useEffect(() => {
    if (auth) return redirect("/todo-list-react/tasks");
  }, [auth, redirect]);

  return (
    <form
      onSubmit={handleChangeSubmit}
      className="flex flex-col gap-5 max-w-md m-auto dark:bg-slate-700 bg-white p-5 rounded shadow-lg"
    >
      <Title title="Регистрация" size="1.5rem" dark />
      <p className="dark:text-slate-100 text-slate-700">
        <span>Есть аккаунт? </span>
        <span
          onClick={() => setIsLogin((prev) => !prev)}
          className="text-blue-500 cursor-pointer hover:text-sky-300 transition-all"
        >
          Войти
        </span>
      </p>
      <TextField
        label="Имя"
        type="text"
        actionField="fullName"
        dispatch={dispatch}
        value={user.fullName}
      />
      <TextField
        label="Эл. почта"
        type="email"
        actionField="email"
        dispatch={dispatch}
        value={user.email}
      />
      <TextField
        label="Пароль"
        actionField="password"
        type="password"
        dispatch={dispatch}
        value={user.password}
      />
      {err ||
        (error && (
          <div className="text-red-500 text-sm">
            {errMessage ? errMessage : "Введен не верный логин или пароль"}
          </div>
        ))}
      <ButtonCustom label="Продолжить" />
      <Unauthorization />
    </form>
  );
};
