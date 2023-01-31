import axios, { isAxiosError } from "axios";

export const axiosBasic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

/**
 * FIX
 * 검색 API만 서버 endpoint가 다름.
 * 추후에 다른 API와 endpoint 통일될 예정.
 */
export const axiosSearchBasic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SEARCH_API_URL}`,
});

axiosBasic.interceptors.response.use(null, (error) => {
  if (!isAxiosError(error)) return Promise.reject(error);
});
