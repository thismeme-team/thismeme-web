import { axiosBasic } from "./client";

export const getRecentSearch = (value: string) => {
  if (value === "") {
    return new Error("No Query");
  }
  return axiosBasic.get(`/tags/search?word=${value}`).then((response) => response.data);
};
