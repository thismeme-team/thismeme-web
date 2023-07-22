import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../core";

export const useGetMyAccount = () => {
  const queryClient = useQueryClient();
  return useQuery({
    suspense: false,
    queryKey: useGetMyAccount.queryKey,
    queryFn: useGetMyAccount.queryFn,
    onError: () => {
      queryClient.setQueryData(useGetMyAccount.queryKey, null);
    },
  });
};

useGetMyAccount.queryKey = ["getMyAccount"] as const;

useGetMyAccount.queryFn = () => api.account.getMyAccount();
