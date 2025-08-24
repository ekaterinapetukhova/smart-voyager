import { useTokenStore } from "../store/user-store.ts";
import { HomeView } from "../features/home/HomeView.tsx";
import { AuthView } from "../features/auth/AuthView.tsx";
import { verifyUserEmail } from "../mutation/verification.mutation.ts";

export function IndexView() {
  const emailToken = new URLSearchParams(window.location.search).get("token");

  if (emailToken) {
    void verifyUserEmail(emailToken);
  }

  const isAuth = !!useTokenStore((s) => s.token);

  return isAuth ? <HomeView /> : <AuthView />;
}
