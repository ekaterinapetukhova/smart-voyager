import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { HomeView } from "./features/home/HomeView.tsx";
import { Header } from "./components/header/Header.tsx";
import { RegistrationView } from "./features/registration/RegistrationView.tsx";
import { LoginView } from "./features/login/LoginView.tsx";
import { RouterEnum } from "./router/router.types.ts";
import { UserView } from "./features/user/UserView.tsx";
import { updateUserStore, useTokenStore } from "./store/user-store.ts";

const queryClient = new QueryClient();

export function App() {
  const isAuth = !!useTokenStore((s) => s.token);

  useEffect(() => {
    if (isAuth) {
      void updateUserStore();
    }
  }, [isAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path={RouterEnum.Home} element={<HomeView />} />
        <Route path={RouterEnum.Registration} element={<RegistrationView />} />
        <Route path={RouterEnum.Login} element={<LoginView />} />
        <Route path={RouterEnum.Verification} element={<HomeView />} />
        <Route path={RouterEnum.User} element={<UserView />} />
      </Routes>
    </QueryClientProvider>
  );
}
