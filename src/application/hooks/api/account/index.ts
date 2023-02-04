import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

export const useGetMyAccount = ({ enabled }: UseQueryOptions) =>
  useQuery({
    suspense: false,
    queryKey: QUERY_KEYS.getMyAccount,
    queryFn: api.account.getMyAccount,
    enabled,
    staleTime: Infinity,
  });
