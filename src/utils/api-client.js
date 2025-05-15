import { logout } from "./auth/auth-methods";

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

async function client(
  endpoint,
  {
    apiURL = baseUrl,
    data,
    token,
    headers: customHeaders,
    ...customConfig
  } = {}
) {
  const headers = {};
  if (token) {
    headers.Authorization = token;
  }
  if (data) {
    headers["content-type"] = "application/json";
  }
  const config = {
    method: data ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customHeaders,
    },
  };
  if (data) {
    config.body = JSON.stringify(data);
  }

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // || response.status === 403
        await logout();
        // refresh the page for them
        window.location.assign(window.location);
        return Promise.reject({ message: "Please re-authenticate." });
      }
      if (response.status === 204) {
        return Promise.resolve("Delete Successfully");
      }

      const responseData = await response.json();
      if (response.ok) {
        return responseData?.data || responseData;
      }
      return Promise.reject(responseData);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { client };
