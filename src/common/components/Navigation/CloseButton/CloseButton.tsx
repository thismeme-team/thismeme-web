import { useRouter } from "next/router";

import { Icon } from "../../Icon";

export const CloseButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <Icon height={16} name="delete2" width={16} />
    </button>
  );
};
