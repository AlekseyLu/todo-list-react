import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../components/Auth/api/store";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/module/Header";
import { Tasks } from "../../components/Tasks/module/Tasks";
import { Auth } from "../../components/Auth/module/Auth";
import { NotFound } from "../NotFound/NotFound";
import { Profile } from "../Profile/Profile";

export const Home = () => {
  const { auth, logout } = useAuth((state) => state);
  const redirect = useNavigate();

  useEffect(() => {
    if (auth?.data.fullName !== "incognito") return;
    window.addEventListener("beforeunload", () => logout());
    return () => window.removeEventListener("beforeunload", logout);
  });

  useEffect(() => {
    if (!auth) redirect("/todo-list-react/auth");
  }, [auth, redirect]);

  return (
    <div className="background-hero min-w-80 max-sm:px-4 dark:bg-slate-900 bg-slate-200 h-screen bg-[length: 300px] bg-no-repeat bg-center bg-top">
      <Header />
      <Layout>
        <Routes>
          <Route
            path="/todo-list-react/"
            element={
              auth ? (
                <Navigate to={"/todo-list-react/tasks"} />
              ) : (
                <Navigate to={"/todo-list-react/auth"} replace />
              )
            }
          />
          <Route path="/todo-list-react/auth" element={<Auth />} />
          {auth && <Route path="/todo-list-react/tasks" element={<Tasks />} />}
          {auth && (
            <Route path="/todo-list-react/profile" element={<Profile />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};
