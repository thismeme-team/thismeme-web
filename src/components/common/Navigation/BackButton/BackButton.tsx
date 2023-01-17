import { useRouter } from "next/router";

import { Icon } from "@/components/common/Icon";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <Icon name="back" />
    </button>
  );
};
export {};
