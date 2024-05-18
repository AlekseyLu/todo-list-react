import { useEffect } from "react";

import { Task } from "../ui/Task";
import { NotData } from "../../../NotData/NotData";

import { useTasks } from "../../api/tasksStore";
import { useAuth } from "../../../Auth/api/store";


export const TasksList = () => {
  const auth = useAuth((state) => state.auth);
  const { getTodos, tasks } = useTasks((state) => state);

  useEffect(() => {
    if (auth) {
      getTodos(auth);
    }
  }, [auth, getTodos]);

  if (tasks.length < 1) return <NotData background />;

  return (
    <ul className="bg-transparent rounded-t-md overflow-hidden shadow-lg">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  );
};
