import { create } from "zustand";

import { ResponseRegister } from "../../Auth/api/store";

export type ITask = {
  id: number;
  text: string;
  completed: boolean;
  user_id: number;
};

export type TaskResponse = {
  id: number;
  text: string;
  completed: boolean;
  user_id: number;
  user: {
    fullName: string;
    email: string;
  };
};

export type IProfile = {
  fullName: string;
  email: string;
  id?: number;
  password: string;
};

type Init = {
  tasks: TaskResponse[];
  loading: boolean;
  err: unknown;
};

type Actions = {
  getTodos: (arg: ResponseRegister) => void;
  addTodo: (arg: ITask, auth: ResponseRegister) => void;
  updateTodo: (id: number, complite: boolean, auth: ResponseRegister) => void;
  updateTextTodo: (id: number, text: string, auth: ResponseRegister) => void;
  getFiltersMadeTodos: (auth: ResponseRegister) => void;
  getFiltersTodos: (auth: ResponseRegister, completed: boolean | null) => void;
};

const initialState: Init = {
  tasks: [],
  loading: false,
  err: null,
};

export const useTasks = create<Init & Actions>()((set) => ({
  ...initialState,
  getTodos: async (auth: ResponseRegister) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(import.meta.env.VITE_URL_TODOS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) throw new Error("Попробуйте снова");

      const response = await res.json();
      const result = await response.filter(
        (el: ITask) => el.user_id === auth.data.id
      );
      set(() => ({ tasks: result, err: null }));
    } catch (error) {
      console.log(error);
      set(() => ({ err: error, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  addTodo: async (todo: ITask, auth: ResponseRegister) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(import.meta.env.VITE_URL_TODOS, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(todo),
      });
      const response = await res.json();
      set((state) => ({ tasks: [...state.tasks, response] }));
    } catch (error) {
      console.log(error);
      set(() => ({ err: error, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateTodo: async (id: number, complete: boolean, auth: ResponseRegister) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(import.meta.env.VITE_URL_TODOS + `/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ completed: complete }),
      });

      if (!res.ok) throw new Error("Попробуйте снова");

      const response = await res.json();

      set((state) => ({
        loading: false,
        err: null,
        tasks: state.tasks.map((task) =>
          task.id === response.id ? response : task
        ),
      }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: false, err: error }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  getFiltersMadeTodos: async (auth: ResponseRegister) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(
        import.meta.env.VITE_URL_TODOS + "?complited=true",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Попробуйте снова");

      const response = await res.json();
      const result = await response.filter(
        (el: ITask) => el.user_id === auth.data.id
      );
      set(() => ({ tasks: result, err: null }));
    } catch (error) {
      console.log(error);
      set(() => ({ err: error, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  getFiltersTodos: async (
    auth: ResponseRegister,
    completed: boolean | null
  ) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(
        import.meta.env.VITE_URL_TODOS +
          (completed !== null ? `?completed=${completed}` : ""),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Попробуйте снова");

      const response = await res.json();
      const result = await response.filter(
        (el: ITask) => el.user_id === auth.data.id
      );
      set(() => ({ tasks: result, err: null }));
    } catch (error) {
      console.log(error);
      set(() => ({ err: error, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  updateTextTodo: async (id: number, text: string, auth: ResponseRegister) => {
    set(() => ({ loading: true }));
    try {
      const res = await fetch(import.meta.env.VITE_URL_TODOS + `/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ text: text }),
      });

      if (!res.ok) throw new Error("Попробуйте снова");

      const response = await res.json();

      set((state) => ({
        loading: false,
        err: null,
        tasks: state.tasks.map((task) =>
          task.id === response.id ? response : task
        ),
      }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: false, err: error }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
