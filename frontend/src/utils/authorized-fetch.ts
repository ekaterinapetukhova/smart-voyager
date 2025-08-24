import { useTokenStore } from "../store/user-store.ts";
import { config } from "../config/config.ts";

export const authorizedFetch = () => {
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

  const patch = async (path: string, id: string, data: object) => {
    return await fetch(`${config.backendUrl}/${path}/${id}`, {
      method: "PATCH",
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
    patch,
  };
};
