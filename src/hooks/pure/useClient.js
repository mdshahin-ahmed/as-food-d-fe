import React from "react";
import { getToken } from "../../utils/auth/auth-utils";
import { client } from "../../utils/api-client";

function useClient() {
  const token = getToken();
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { useClient };
