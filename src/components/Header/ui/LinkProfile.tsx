import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Auth/api/store";

export const LinkProfile = () => {
  const redirect = useNavigate();

  const { auth, logout } = useAuth((state) => state);
  const logoutAccaunt = () => {
    logout();
    redirect("#/auth");
  };

  if (!auth) return;
  const { email, fullName } = auth.data;

  return (
    <div className="opacity-0 invisible absolute p-1 divide-y cursor-auto text-center shadow-lg min-w-32 rounded-md bg-white group-hover:opacity-100 group-hover:visible transition duration-500 z-10 top-30 right-10">
      <Link to="profile" className="group/profile">
        <h2 className="p-3 text-2xl group-hover/profile:text-sky-500 transition">
          {fullName}
        </h2>
      </Link>
      <p className="p-3">{email}</p>
      <button
        className="group/logout flex gap-2 items-center justify-center p-3 w-full"
        onClick={logoutAccaunt}
      >
        <span className="group-hover/logout:text-sky-500">Выйти</span>
        <svg
          className="transition group-hover/logout:stroke-sky-500"
          stroke="#333"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40m64-160 80 80-80 80m-193-80h273"
          ></path>
        </svg>
      </button>
    </div>
  );
};
