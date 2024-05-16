import { ITasksList } from "../../../Header/api/types";

export interface ICreateTaskProps {
  setTasksList: (prev: (arg: ITasksList[]) => ITasksList[]) => void;
  tasksList: ITasksList[];
}
