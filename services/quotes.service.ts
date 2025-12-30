import { apiFetch } from "@/services/api";

export const getQuotesApi = ({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) => {
  return apiFetch("/rpc/pair/getAll", {
    method: "GET",
    params: {
      cursor: page,
      limit,
    },
  });
};
