import { FormEvent, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../components/Auth/api/store";

import { TextField } from "../../components/Auth/ui/TextField";

import { ReducerActions } from "../../components/Auth/api/types.auth";
import { IProfile } from "../../components/Tasks/api/tasksStore";
import { Spinner } from "../../components/Spinner/module/Spinner";
import { ButtonCustom } from "../../components/Auth/ui/ButtonCustom";

const profileReducer = (state: IProfile, action: ReducerActions) => {
  switch (action.type) {
    case "fullName":
      return { ...state, fullName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export const Profile = () => {
  const redirect = useNavigate();
  const { updateUser, auth, loading } = useAuth((state) => state);
  const refFocus = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const initialProfile: IProfile = auth!.data;

  const [user, dispatch] = useReducer(profileReducer, initialProfile);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      updateUser(auth.data.id, auth, user);
    }
    setDisabled(true);
  };

  useEffect(() => {
    if (
      auth?.data.fullName !== user.fullName ||
      auth?.data.email !== user.email
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [auth, user]);

  useEffect(() => {
    if (!auth) redirect("#/auth");
  }, [auth, redirect]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5 dark:bg-slate-700 bg-white rounded-md flex flex-col gap-5">
          <h2 className="text-3xl dark:text-white text-slate-700">
            {auth?.data.fullName}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="dark:bg-slate-700 bg-white rounded-md flex flex-col gap-5"
          >
            <TextField
              actionField="fullName"
              label="Полное имя"
              type="text"
              value={user.fullName}
              dispatch={dispatch}
              focusRef={refFocus}
            />
            <TextField
              actionField="email"
              label="Эл. почта"
              type="email"
              value={user.email}
              dispatch={dispatch}
            />

            <ButtonCustom label="Сохранить" disabled={disabled} />
          </form>
        </div>
      )}
    </>
  );
};
