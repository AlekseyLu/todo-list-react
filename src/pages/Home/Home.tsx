import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../components/Auth/api/store";

import { NotFound } from "../NotFound/NotFound";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/module/Header";
import { Tasks } from "../../components/Tasks/module/Tasks";
import { Auth } from "../../components/Auth/module/Auth";
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
    if (!auth) redirect("/auth");
  }, [auth, redirect]);

  return (
    <div className="min-w-80 max-sm:px-4 dark:bg-slate-900 bg-slate-200 bg-[url('./src/app/images/bg-desktop-light.jpg')] h-screen dark:bg-[url('./src/app/images/bg-desktop-dark.jpg')] bg-[length: 300px] bg-no-repeat bg-center bg-top">
      <Header />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              auth === null ? (
                <Navigate to="/auth" replace />
              ) : (
                <Navigate to="/tasks" />
              )
            }
          />
          <Route path="/auth" element={<Auth />} />
          {auth !== null && <Route path="/tasks" element={<Tasks />} />}
          {auth !== null && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};
