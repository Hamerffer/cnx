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

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const changePasswordApi = (payload: ChangePasswordPayload) => {
  return apiFetch<{ id: string }>("/rpc/user/changePassword", {
    method: "POST",
    body: JSON.stringify({
      json: payload,
    }),
  });
};
export const changeInvestorPasswordApi = (payload: ChangePasswordPayload) => {
  return apiFetch<{ id: string }>("/rpc/user/changeInvestorPassword", {
    method: "POST",
    body: JSON.stringify({
      json: payload,
    }),
  });
};
