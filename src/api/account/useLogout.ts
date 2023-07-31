import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../core";
import { useGetMyAccount } from "./useGetMyAccount";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(api.auth.logout, {
    onSuccess: () => {
      api.auth.deleteAccessToken();
      queryClient.setQueryData(useGetMyAccount.queryKey, null);
    },
  });
};
