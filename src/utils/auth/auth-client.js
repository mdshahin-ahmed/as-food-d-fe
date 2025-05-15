import { authURL } from "./auth-utils";

async function authClient(endpoint, data) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const responseData = await response.json();
      if (response.ok) {
        return responseData?.data;
      }
      return Promise.reject(responseData);
    });
}

export { authClient };
