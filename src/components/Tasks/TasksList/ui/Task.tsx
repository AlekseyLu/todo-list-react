import { MouseEventHandler } from "react";

import { ITask, useTasks } from "../../api/tasksStore";
import { useAuth } from "../../../Auth/api/store";

import { EditTask } from "./EditTask";

type IProps = {
  task: ITask;
};

export const Task = ({ task }: IProps) => {
  const auth = useAuth((state) => state.auth);
  const { updateTodo, loading } = useTasks((state) => state);

  const updateTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (auth === null) return;
    updateTodo(task.id, !task.completed, auth);
  };

  return (
    <li className="max-sm:p-2 max-sm:gap-2 max-sm:justify-center flex justify-between gap-4 group p-5 text-xl border-b dark:border-b-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-white/60">
      <div className="flex max-sm:flex-col gap-4 items-center hover:cursor-pointer">
        <button
          className="flex items-center w-full justify-start"
          onClick={updateTask}
          disabled={loading}
        >
          {task.completed ? (
            <div className="flex items-center gap-2 p-1" >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                  <path
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                    d="M1 4.304L3.696 7l6-6"
                  />
                </svg>
              </div>
              <span className="max-sm:block max-sm:text-sm hidden">
                Выполнено
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700" />
              <span className="max-sm:block max-sm:text-sm hidden">
                Выполнить
              </span>
            </div>
          )}
        </button>
        <EditTask task={task} />
      </div>
    </li>
  );
};
