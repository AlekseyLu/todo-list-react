import { Link } from "react-router-dom";

import { ThemeToggle } from "../ui/ThemeToggle";
import { Title } from "../ui/Title";
import { useAuth } from "../../Auth/api/store";
import { LinkProfile } from "../ui/LinkProfile";

import { useTheme } from "../../../app/hooks/useTheme";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const { auth } = useAuth((state) => state);

  const changeTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header className="flex justify-between items-center pt-16 mb-10 max-w-xl m-auto">
      <Link to="/todo-list-react/">
        <Title title="T O D O" size="3rem" />
      </Link>
      <div className="flex items-center gap-6 relative">
        {auth?.token && auth.data.fullName !== "incognito" && (
          <div className="group">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                className="dark:group-hover:fill-sky-500 transition-all group-hover:fill-slate-500"
                d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
                fill="#fff"
              />
              <path
                className="dark:group-hover:fill-sky-500 transition-all group-hover:fill-slate-500"
                d="M4 18C4 15.2386 6.23858 13 9 13H15C17.7614 13 20 15.2386 20 18V22H4V18Z"
                fill="#fff"
              />
            </svg>
            <LinkProfile />
          </div>
        )}
        <ThemeToggle changeTheme={changeTheme} theme={theme} />
      </div>
    </header>
  );
};
