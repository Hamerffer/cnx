import { apiFetch } from "./api";

/* ---------- LOAD FORM DATA ---------- */
export const registerFormApi = {
  broker: (brokerId: string) =>
    apiFetch("/rpc/broker/getById", {
      data: JSON.stringify({ json: { id: brokerId } }),
    }),

  servers: (brokerId: string) =>
    apiFetch("/rpc/server/getAll", {
      data: JSON.stringify({ json: { brokerId } }),
    }),

  accountTypes: (brokerId: string) =>
    apiFetch("/rpc/accountType/getAll", {
      data: JSON.stringify({ json: { brokerId } }),
    }),

  leverages: (brokerId: string) =>
    apiFetch("/rpc/leverage/getAll", {
      data: JSON.stringify({ json: { brokerId } }),
    }),

  deposits: (brokerId: string) =>
    apiFetch("/rpc/depositAmount/getAll", {
      data: JSON.stringify({ json: { brokerId } }),
    }),
};

/* ---------- REGISTER ---------- */
export const registerUserApi = (payload: any) =>
  apiFetch("/rpc/auth/register", {
    method: "POST",
    body: JSON.stringify({
      json: payload,
    }),
  });
