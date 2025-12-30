import { ENV } from "@/constants/env";

type ApiFetchOptions = {
  method?: "GET" | "POST";
  params?: Record<string, any>; // for GET (old behavior)
  body?: any; // for POST (new behavior)
};

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions | Record<string, any>
): Promise<T> {
  const isLegacyParams =
    options && !("method" in options) && !("body" in options);

  const method = isLegacyParams ? "GET" : options?.method ?? "GET";

  const url = new URL(`${ENV.API_URL}${path}`);

  // ✅ OLD STYLE SUPPORT (query params)
  if (isLegacyParams && options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // ✅ NEW STYLE SUPPORT (params key)
  if (!isLegacyParams && options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body:
      method !== "GET" && !isLegacyParams && options?.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }

  return json;
}
