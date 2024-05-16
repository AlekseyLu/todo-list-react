import { FC, FormEvent, useState } from "react";

import { useAuth } from "../../../Auth/api/store";
import { useTasks } from "../../api/tasksStore";

export const CreateTask: FC = () => {
  const auth = useAuth((state) => state.auth);
  const { addTodo, loading } = useTasks((state) => state);
  const [newTask, setNewTask] = useState("");
  const [err, setErr] = useState(false);

  const createTask = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (newTask.trim() === "") return setErr(true);

    if (auth) {
      addTodo(
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          user_id: auth.data.id,
        },
        auth
      );
      setNewTask("");
      setErr(false);
    }
  };
  return (
    <form className="rounded relative mb-6" onSubmit={createTask}>
      {err && (
        <p className="absolute px-3 -top-[30px] left-0 text-xl text-rose-500 font-medium">
          Поле обзятальено для заполнения
        </p>
      )}
      <input
        type="text"
        className={
          "max-w-xl rounded flex p-5 w-full text-xl placeholder:text-slate-700/70 dark:placeholder:text-slate-500 dark:text-white/60 text-slate-700 dark:bg-slate-800 bg-white focus:outline-none" +
          " " +
          (err && "border-2 border-rose-500")
        }
        placeholder="Создать новую задачу..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        disabled={loading}
      />
    </form>
  );
};
