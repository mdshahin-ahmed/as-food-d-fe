import { useQuery } from "@tanstack/react-query";
import { useClient } from "../hooks/pure/useClient";

function useGetQueryDataList(endpoint, queryParams, queryConfig = {}) {
  const client = useClient();
  const qs = Object.keys(queryParams)
    .map((key) => {
      if (encodeURIComponent(queryParams[key])) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          queryParams[key]
        )}`;
      }
    })
    .join("&");
  return useQuery({
    queryKey: [`${endpoint}-list`, queryParams],
    queryFn: () => client(`${endpoint}?${qs}`),
    ...queryConfig,
  });
}

export { useGetQueryDataList };
