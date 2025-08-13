import { useTokenStore } from "../store/user-store.ts";
import { config } from "../config/config.ts";

export const authorizedFetch = async () => {
  const headers = { Authorization: `Bearer ${useTokenStore.getState().token}` };

  const get = async (path: string) => {
    return await fetch(`${config.backendUrl}/${path}`, {
      method: "GET",
      headers,
    });
  };

  const post = async (path: string, data: object) => {
    return await fetch(`${config.backendUrl}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    });
  };

  return {
    get,
    post,
  };
};
