import { useState } from "react";

import { useTasks } from "../../Tasks/api/tasksStore";
import { useAuth } from "../../Auth/api/store";

import { TABS } from "../api/constants";
import { sumActive } from "../api/utils";

export const FiltersTab = () => {
  const { auth } = useAuth((state) => state);
  const { getFiltersTodos, tasks } = useTasks((state) => state);
  const [currentTab, setCurrentTab] = useState<null | boolean>(null);

  const handleFilter = (tab: null | boolean, flag: null | boolean) => {
    setCurrentTab(tab);
    auth && getFiltersTodos(auth, flag);
  };

  const totalActiveTodos = sumActive(tasks, "completed", false);

  return (
    <div className="flex justify-between items-center p-5 dark:bg-slate-800 bg-white rounded-b-md">
      <div className="text-slate-400 max-sm:hidden">
        Осталось {totalActiveTodos}
      </div>
      <ul className="flex items-center gap-4">
        {TABS.map((tab) => (
          <li key={tab.id} className="text-slate-400 text-sm">
            <button
              onClick={() => handleFilter(tab.option, tab.option)}
              className={
                currentTab === tab.option
                  ? "text-sky-500 font-medium"
                  : "hover:text-sky-700"
              }
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
