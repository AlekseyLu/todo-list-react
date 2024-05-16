import { FC } from "react";

type Props = {
  background?: boolean;
};

export const NotData: FC<Props> = ({ background }) => {
  return (
    <div
      className={
        "w-full h-48 gap-4 p-4 flex flex-col items-center justify-center text-center dark:text-slate-600" +
        (background && " dark:bg-slate-800 bg-white")
      }
    >
      <p className="text-3xl">Список задач пуст</p>
      <p className="italic text-xl">
        Введите название задачи и нажмите "enter" тобы добавить задачу в список
      </p>
    </div>
  );
};
