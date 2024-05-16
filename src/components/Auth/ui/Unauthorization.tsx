import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/store";
import { url } from "../../../app/utils";

export const Unauthorization = () => {
  const redirect = useNavigate();
  const { createNewUser } = useAuth((state) => state);

  const createUnauthorizationUser = () => {
    createNewUser({
      fullName: "incognito",
      email: uuidv4(),
      password: uuidv4(),
    });
    redirect(url + "/tasks");
  };

  return (
    <div
      onClick={createUnauthorizationUser}
      className="p-1 cursor-pointer text-md text-slate-400 text-center hover:text-slate-500 transition-all"
    >
      Продолжить без регистрации
    </div>
  );
};
