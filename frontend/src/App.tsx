import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { RouterEnum } from "./types/router.types.ts";
import { updateUserStore, useTokenStore } from "./store/user-store.ts";
import { TripMatesView } from "./features/trip-mates/TripMatesView.tsx";
import { NotFoundView } from "./features/not-found/NotFoundView.tsx";
import { CommonChatView } from "./features/chat/CommonChatView.tsx";
import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { DraftTripsListView } from "./features/trip/DraftTripsListView.tsx";
import { useVerification } from "./hooks/use-verification.ts";
import { NewTripByUserView } from "./features/trip/new-trip/NewTripByUserView.tsx";
import { NewTripModeChoiceView } from "./features/trip/new-trip/NewTripModeChoiceView.tsx";
import { NewTripByAIView } from "./features/trip/new-trip/NewTripByAIView.tsx";
import { TripView } from "./features/trip/trip-view/TripView.tsx";
import { PlannedTripsListView } from "./features/trip/PlannedTripsListView.tsx";
import { AuthView } from "./features/auth/AuthView.tsx";
import { RegistrationView } from "./features/registration/RegistrationView.tsx";
import { LoginView } from "./features/login/LoginView.tsx";
import { isPrint } from "./utils/is-print.ts";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (!props.isAuth) {
    return <Navigate to={RouterEnum.Auth} replace />;
  }

  return props.children;
}

export function App() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: verifyEmail } = useVerification();

  const emailToken = new URLSearchParams(search).get("token");

  const token = useTokenStore((s) => s.token);
  const logout = useTokenStore((s) => s.logout);
  const isAuth = !!token;

  useEffect(() => {
    if (emailToken) {
      void verifyEmail(emailToken);
    }

    console.log(isAuth, token);

    if (isAuth) {
      void updateUserStore();
    } else {
      logout();
    }
  }, [emailToken, verifyEmail, isAuth, navigate, token, logout]);

  return (
    <div className="flex h-screen overflow-y-auto lg:overflow-hidden print:h-fit print:overflow-auto">
      {isAuth && !isPrint() && <Sidebar />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? RouterEnum.PlannedTrips : RouterEnum.Auth} replace />} />

        <Route
          path={RouterEnum.Auth}
          element={
            <ProtectedRoute isAuth={!isAuth}>
              <AuthView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.Registration}
          element={
            <ProtectedRoute isAuth={!isAuth}>
              <RegistrationView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.Login}
          element={
            <ProtectedRoute isAuth={!isAuth}>
              <LoginView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.Verification}
          element={
            <ProtectedRoute isAuth={!isAuth}>
              <AuthView />
            </ProtectedRoute>
          }
        />

        <Route
          path={RouterEnum.DraftTrips}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <DraftTripsListView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.PlannedTrips}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PlannedTripsListView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.Trip}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <TripView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.NewTripByUser}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NewTripByUserView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.NewTripByAI}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NewTripByAIView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.NewTripModeChoice}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NewTripModeChoiceView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.TripMates}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <TripMatesView />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouterEnum.Chats}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CommonChatView />
            </ProtectedRoute>
          }
        />

        <Route path={RouterEnum.NotFound} element={<NotFoundView />} />
        <Route path="*" element={<Navigate to={RouterEnum.NotFound} replace />} />
      </Routes>
    </div>
  );
}
