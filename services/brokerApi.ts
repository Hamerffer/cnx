import { apiFetch } from "./api";

type BrokerResponse = {
  json: {
    items: any[];
    nextCursor: number | null;
  };
};

export const brokerApi = {
  getAll: async ({
    cursor = 1,
    search = "",
  }: {
    cursor?: number;
    search?: string;
  }) => {
    const res = await apiFetch<BrokerResponse>("/rpc/broker/getAll", {
      data: JSON.stringify({
        json: {
          cursor,
          search,
        },
      }),
    });

    return res.json;
  },
};
