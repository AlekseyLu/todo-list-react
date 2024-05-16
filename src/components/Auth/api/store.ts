import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ILogin, IRegisterUser } from "./types.auth";

import { IProfile } from "../../Tasks/api/tasksStore";

export type ResponseRegister = {
  token: string;
  data: {
    email: string;
    fullName: string;
    id: number;
    password: string;
  };
};

type Init = {
  auth: ResponseRegister | null;
  token: string;
  loading: boolean;
  err: boolean;
};

type Actions = {
  createNewUser: (arg: IRegisterUser) => void;
  login: (arg: ILogin) => void;
  logout: () => void;
  updateUser: (id: number, auth: ResponseRegister, user: IProfile) => void;
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const initialState: Init = {
  auth: null,
  token: "",
  loading: false,
  err: false,
};

export const useAuth = create<Init & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      createNewUser: async (user: IRegisterUser) => {
        set(() => ({ loading: true }));

        try {
          const res = await fetch(import.meta.env.VITE_URL_REG, {
            method: "POST",
            headers,
            body: JSON.stringify(user),
          });

          if (!res.ok) throw new Error("Попробуйте снова");

          const response = await res.json();

          set(() => ({
            auth: response,
            err: false,
          }));
        } catch (error) {
          console.log(error);
          set(() => ({ loading: false, err: true }));
        } finally {
          set(() => ({ loading: false }));
        }
      },
      login: async (user: ILogin) => {
        set(() => ({ loading: true }));

        try {
          const res = await fetch(import.meta.env.VITE_URL_LOGIN, {
            method: "POST",
            headers,
            body: JSON.stringify(user),
          });
          if (!res.ok) throw new Error("Ошибка попробуйте снова");

          const response = await res.json();

          set(() => ({ auth: response, err: false }));
        } catch (error) {
          console.log(error);
          set(() => ({ loading: false, err: true }));
        } finally {
          set(() => ({ loading: false }));
        }
      },
      logout: () => set(initialState),
      updateUser: async (
        id: number,
        auth: ResponseRegister,
        user: IProfile
      ) => {
        set(() => ({ loading: true }));

        try {
          const res = await fetch(import.meta.env.VITE_URL_USERS + `/${id}`, {
            method: "PATCH",
            headers: { ...headers, Authorization: `Bearer ${auth.token}` },
            body: JSON.stringify(user),
          });

          if (!res.ok) throw new Error("Попробуйте снова");

          const response = await res.json();

          set(() => {
            auth.data = response;
            return { auth };
          });
        } catch (error) {
          console.log(error);
          set(() => ({ loading: false, err: true }));
        } finally {
          set(() => ({ loading: false }));
        }
      },
    }),
    {
      name: "new-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
