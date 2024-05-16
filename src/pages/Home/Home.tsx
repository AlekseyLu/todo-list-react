import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../components/Auth/api/store";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/module/Header";
import { Tasks } from "../../components/Tasks/module/Tasks";
import { Auth } from "../../components/Auth/module/Auth";
import { NotFound } from "../NotFound/NotFound";
import { Profile } from "../Profile/Profile";

import { url } from "../../app/utils";

export const Home = () => {
  const { auth, logout } = useAuth((state) => state);
  const redirect = useNavigate();

  useEffect(() => {
    if (auth?.data.fullName !== "incognito") return;
    window.addEventListener("beforeunload", () => logout());
    return () => window.removeEventListener("beforeunload", logout);
  });

  useEffect(() => {
    if (!auth) redirect(url + "/auth");
  }, [auth, redirect]);

  return (
    <div className="background-hero min-w-80 max-sm:px-4 dark:bg-slate-900 bg-slate-200 h-screen bg-[length: 300px] bg-no-repeat bg-center bg-top">
      <Header />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              auth === null ? (
                <Navigate to={url + "/auth"} replace />
              ) : (
                <Navigate to={url + "/tasks"} />
              )
            }
          />
          <Route path="/auth" element={<Auth />} />
          {auth !== null && <Route path={url + "/tasks"} element={<Tasks />} />}
          {auth !== null && (
            <Route path={url + "/profile"} element={<Profile />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};
