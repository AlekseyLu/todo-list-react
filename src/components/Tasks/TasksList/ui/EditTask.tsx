import { FC, useEffect, useRef, useState } from "react";

import { ITask, useTasks } from "../../api/tasksStore";
import { useAuth } from "../../../Auth/api/store";
import { ButtonIcon } from "../../../ui/ButtonIcon";

type Props = {
  task: ITask;
};

export const EditTask: FC<Props> = ({ task }) => {
  const maxLengthTask = 33;
  const { auth } = useAuth((state) => state);
  const { updateTextTodo, getTodos } = useTasks((state) => state);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [taskText, setTaskText] = useState<string>(task.text);
  const [count, setCount] = useState(1);

  const hasEditField = async () => {
    await setIsDisabled(false);
    ref?.current?.focus();
  };

  const isEditDone = () => {
    setIsDisabled(true);
    if (task.text === taskText) return;
    updateTextTodo(task.id, taskText, auth!);
  };

  const deleteTodo = async () => {
    if (!auth) return console.log("token false");
    try {
      await fetch(import.meta.env.VITE_URL_TODOS + `/${task.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    getTodos(auth);
  };

  const countSymbolLength = (length: number, maxLength: number) => {
    const widthView = window.screen.width;
    let maxSymbols = maxLength;
    if (widthView < 640) {
      maxSymbols = 23;
      if (length < maxSymbols) {
        return setCount(1);
      } else {
        return setCount(Math.ceil(length / maxSymbols));
      }
    } else {
      return setCount(Math.ceil(length / maxSymbols));
    }
  };

  useEffect(() => {
    countSymbolLength(taskText.length, maxLengthTask);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () =>
      countSymbolLength(taskText.length, maxLengthTask)
    );
    return () =>
      window.removeEventListener("resize", () =>
        countSymbolLength(taskText.length, maxLengthTask)
      );
  }, [taskText]);

  return (
    <div className="flex justify-between w-full gap-2 max-sm:flex-col">
      <textarea
        rows={count}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        ref={ref}
        disabled={isDisabled}
        className={
          (task.completed ? "line-through text-slate-400 " : "") +
          "max-sm:text-2xl w-96 max-sm:w-72 resize-none max-sm:text-center px-2 py-1 outline-none focus:ring rounded-md dark:bg-slate-800 focus:dark:bg-slate-700 focus:bg-slate-100 bg-white"
        }
      />
      <div className="flex items-center gap-3 max-sm:justify-center ">
        {isDisabled ? (
          !task.completed && (
            <ButtonIcon
              onClick={hasEditField}
              visible={task.completed}
              sm
              text="Редактировать"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  className="stroke-slate-700 dark:stroke-slate-200"
                  d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonIcon>
          )
        ) : (
          <ButtonIcon
            onClick={isEditDone}
            visible={task.completed}
            sm
            text="Подтвердить"
          >
            <svg
              width="20px"
              height="20px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" fill="none" />
              <path
                className="stroke-slate-700 dark:stroke-slate-200"
                d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonIcon>
        )}
        <ButtonIcon
          onClick={deleteTodo}
          visible={task.completed}
          sm
          text="Удалить"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="none" />
            <path
              className="stroke-slate-700 dark:stroke-slate-200"
              d="M5 7.5H19L18 21H6L5 7.5Z"
              stroke="white"
              strokeLinejoin="round"
            />
            <path
              className="stroke-slate-700 dark:stroke-slate-200"
              d="M15.5 9.5L15 19"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="stroke-slate-700 dark:stroke-slate-200"
              d="M12 9.5V19"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="stroke-slate-700 dark:stroke-slate-200"
              d="M8.5 9.5L9 19"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="stroke-slate-700 dark:stroke-slate-200"
              d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
              stroke="white"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonIcon>
      </div>
    </div>
  );
};
