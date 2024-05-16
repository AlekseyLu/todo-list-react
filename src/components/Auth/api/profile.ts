import { create } from "zustand";

type User = {
  fullName: string;
  email: string;
  id: number | null;
};

type Init = {
  profile: User;
  loading: boolean;
  err: unknown;
};

type Actions = {
  getProfile: (token: string) => void;
};

const initialState: Init = {
  profile: {
    fullName: "",
    email: "",
    id: null,
  },
  loading: false,
  err: null,
};

export const useProfile = create<Init & Actions>()((set) => ({
  ...initialState,

  getProfile: async (token: string) => {
    set(() => ({ loading: true }));

    try {
      const res = await fetch(import.meta.env.VITE_URL_ME, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Попробуй снова");

      const response = await res.json();

      console.log("res", response);

      set(() => ({ profile: response, err: null }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: false, err: error }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
