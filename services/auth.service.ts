import { apiFetch } from "./api";

export const loginApi = (payload: {
  brokerId: string;
  loginId: string;
  password: string;
}) =>
  apiFetch("/rpc/auth/login", {
    method: "POST",
    body: JSON.stringify({
      json: payload,
    }),
  });

export const logoutApi = () =>
  apiFetch("/rpc/auth/logOut", {
    method: "POST",
  });
export const getSessionApi = () =>
  apiFetch("/rpc/auth/getSession", {
    method: "GET",
  });
