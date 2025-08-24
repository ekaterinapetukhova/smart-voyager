import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as jose from "jose";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

interface AuthStore {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
  country: string | undefined;
  city: string | undefined;
  languages: string | undefined;
  description: string | undefined;
  avatar: string | undefined;
}

interface UserStore {
  user: User | null;
  updateUserData: (user: User) => void;
}

export const useTokenStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string) => {
        set({
          token,
        });
      },
      logout: () => {
        set({
          token: null,
        });
      },
    }),
    {
      name: "token",
    }
  )
);

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    updateUserData: (user: User) => {
      set(() => ({ user: user }));
    },
  };
});

export async function updateUserStore() {
  const decodedToken = jose.decodeJwt(useTokenStore.getState().token!);

  if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
    useTokenStore.getState().logout();
  } else {
    const { get } = authorizedFetch();

    const response = await get("me");

    if (response.ok) {
      const userData: User = await response.json();

      useUserStore.getState().updateUserData(userData);
    }
  }
}
