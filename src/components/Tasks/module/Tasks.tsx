import { useEffect, useState } from "react";

import { Modal } from "../../Modal/Modal";
import { CreateTask } from "../CreateTask/module/CreateTask";
import { TasksList } from "../TasksList/module/TasksList";
import { FiltersTab } from "../../FiltersTab/module/FiltersTab";

import { useAuth } from "../../Auth/api/store";

export const Tasks = () => {
  const { auth } = useAuth((state) => state);

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (auth?.data.fullName === "incognito") return setIsModal(true);
  }, [auth]);

  return (
    <section className="flex flex-col">
      <CreateTask />
      <TasksList />
      <FiltersTab />
      <Modal isModal={isModal} setIsModal={setIsModal} />
    </section>
  );
};
