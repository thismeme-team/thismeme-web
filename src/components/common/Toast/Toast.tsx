import type { Toast as Props } from "@/components/common/Toast/types";

export const Toast = ({ message }: Props) => {
  return <output>{message}</output>;
};
