import { CreateTask } from "./components/CreateTask/module/CreateTask";

export const App = () => {
  return (
    <div className="bg-slate-900 h-screen bg-[url('./src/app/images/bg-desktop-dark.jpg')] bg-[length: 300px] bg-no-repeat bg-center bg-top">
      <div className="max-w-xl m-auto">
        <div className="shadow-xl rounded-md mb-6 flex items-center bg-slate-800 px-6 py-4 gap-7">
          <div className="w-6 p-2 h-6"></div>
          <CreateTask />
        </div>
        <div className="bg-slate-800 divide-y-[1px] divide-slate-600 rounded-md">
          <ul>
            {[{ id: "1", text: "React", completed: false }].map((item) => (
              <li>
                <div className="flex items-center justify-center gap-4">
                  {item.completed ? (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-600 bg-gradient-to-r from-fuchsia-700 to-indigo-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                      >
                        <path
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 p-2 h-6 rounded-full border border-slate-600"></div>
                  )}
                  <span
                    className={
                      item.completed
                        ? " line-through text-slate-600"
                        : "text-white"
                    }
                  >
                    {item.text}
                  </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                  del
                </div>
              </li>
            ))}
          </ul>
          <div className="divide-slate-600 divide-y-reverse flex justify-between px-6 py-4 text-white">
            <span className="text-slate-600">Всего 2 задач</span>
            <ul className="flex gap-4">
              <li>
                <button
                  className={
                    // true ? "text-blue-600" : "text-slate-600 hover:text-white"
                    "text-blue-600"
                  }
                  onClick={() => {}}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={
                    // true ? "text-blue-600" : "text-slate-600 hover:text-white"
                    "text-blue-600"
                  }
                  onClick={() => {}}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  className={
                    // true ? "text-blue-600" : "text-slate-600 hover:text-white"
                    "text-blue-600"
                  }
                  onClick={() => {}}
                >
                  Complited
                </button>
              </li>
            </ul>
            <button
              className="text-slate-600 hover:text-white"
              onClick={() => {}}
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
