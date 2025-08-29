import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RegistrationView } from "./features/registration/RegistrationView.tsx";
import { LoginView } from "./features/login/LoginView.tsx";
import { RouterEnum } from "./router/router.types.ts";
import { UserView } from "./features/user/UserView.tsx";
import { updateUserStore, useTokenStore } from "./store/user-store.ts";
import { TripMatesView } from "./features/trip-mates/TripMatesView.tsx";
import { IndexView } from "./components/IndexView.tsx";
import { Header } from "./components/header/Header.tsx";
import { UserSettingsView } from "./features/user/UserSettingsView.tsx";
import { NotFoundView } from "./features/not-found/NotFoundView.tsx";
import { ChatView } from "./features/chat/ChatView.tsx";

const queryClient = new QueryClient();

export function App() {
  const token = useTokenStore((s) => s.token);
  const isAuth = !!useTokenStore((s) => s.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      void updateUserStore();
    } else {
      const pathname = window.location.pathname as RouterEnum;

      if (
        pathname !== RouterEnum.Index &&
        pathname !== RouterEnum.Registration &&
        pathname !== RouterEnum.Login &&
        pathname !== RouterEnum.Verification
      ) {
        void navigate(RouterEnum.NotFound);
      }
    }
  }, [isAuth, navigate]);

  console.log(token);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuth && <Header />}
      <Routes>
        <Route path={RouterEnum.Index} element={<IndexView />} />
        <Route path={RouterEnum.Registration} element={<RegistrationView />} />
        <Route path={RouterEnum.Login} element={<LoginView />} />
        <Route path={RouterEnum.Verification} element={<IndexView />} />
        <Route path={RouterEnum.User} element={<UserView />} />
        <Route path={RouterEnum.TripMates} element={<TripMatesView />} />
        <Route path={RouterEnum.UserRoutes} element={<UserView />} />
        <Route path={RouterEnum.UserChats} element={<ChatView />} />
        <Route path={RouterEnum.UserSettings} element={<UserSettingsView />} />
        <Route path={RouterEnum.NotFound} element={<NotFoundView />} />
      </Routes>
    </QueryClientProvider>
  );
}
