import { Link } from "react-router-dom";

import { ButtonCustom } from "../../components/Auth/ui/ButtonCustom";

export const NotFound = () => (
  <div className="flex items-center justify-center gap-4 flex-col w-full h-80 text-center text-slate-400">
    <h2 className="text-7xl">4 0 4</h2>
    <h2 className="text-3xl mb-[40px]">Страница не найдена</h2>
    <Link to="/todo-list-react/">
      <ButtonCustom label="На главную" disabled={false} />
    </Link>
  </div>
);
