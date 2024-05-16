import { FC, FormEvent, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { Title } from "../../Header/ui/Title";
import { TextField } from "../ui/TextField";
import { ButtonCustom } from "../ui/ButtonCustom";
import { Unauthorization } from "../ui/Unauthorization";

import { ILogin } from "../api/types.auth";
import { loginReducer } from "../api/utils";
import { fieldWithTextValid } from "../api/fieldText";
import { useAuth } from "../api/store";

type Props = {
  setIsLogin: (prev: (arg: boolean) => boolean) => void;
};

const initialValue = {
  email: "",
  password: "",
};

export const Login: FC<Props> = ({ setIsLogin }) => {
  const redirect = useNavigate();
  const [loginUser, dispatch] = useReducer(loginReducer, initialValue);
  const { login, auth, err } = useAuth((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(loginUser);
  };

  useEffect(() => {
    if (auth) return redirect("tasks");
  }, [auth, redirect]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-md m-auto dark:bg-slate-700 bg-white p-5 rounded shadow-lg"
      >
        <Title title="Авторизация" size="1.5rem" dark />
        <p className="dark:text-slate-100 text-slate-700">
          <span>Нет аккаунта? </span>
          <span
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-500 cursor-pointer hover:text-sky-300 transition-all"
          >
            Зарегистрируйте
          </span>
        </p>
        <TextField
          actionField="email"
          label="Эл. почта"
          type="email"
          value={loginUser.email}
          dispatch={dispatch}
        />
        <TextField
          actionField="password"
          label="Пароль"
          type="password"
          value={loginUser.password}
          dispatch={dispatch}
        />
        {err && (
          <div className="text-red-500 text-sm">
            Введен не верный логин или пароль
          </div>
        )}
        <ButtonCustom
          label="Войти"
          disabled={fieldWithTextValid<ILogin>(loginUser)}
        />
        <Unauthorization />
      </form>
    </>
  );
};
