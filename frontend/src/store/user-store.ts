import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as jose from "jose";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { User } from "../types/user.types.ts";
import { config } from "../config/config.ts";

interface AuthStore {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
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
    } else {
      if (response.status === 401) {
        useTokenStore.getState().logout();
      }
    }
  }
}

export const verifyEmail = async (emailToken: string | null) => {
  if (!emailToken) {
    return;
  }

  const response = await fetch(`${config.backendUrl}/auth/verify-email`, {
    method: "POST",
    body: JSON.stringify({
      emailToken,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error with verify user via email link");
  } else {
    void updateUserStore();
  }
};
