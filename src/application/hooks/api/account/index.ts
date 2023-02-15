import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

export const useGetMyAccount = ({ enabled }: UseQueryOptions) => {
  const queryClient = useQueryClient();
  return useQuery({
    suspense: false,
    queryKey: QUERY_KEYS.getMyAccount,
    queryFn: api.account.getMyAccount,
    enabled,
    onError: () => {
      queryClient.setQueryData(QUERY_KEYS.getMyAccount, null);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(api.auth.logout, {
    onSuccess: () => {
      api.auth.deleteAccessToken();
      queryClient.setQueryData(QUERY_KEYS.getMyAccount, null);
    },
  });
};
