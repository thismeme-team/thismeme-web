import { useRouter } from "next/router";

import { Icon } from "@/components/common/Icon";

export const Logo = () => {
  const router = useRouter();
  const handleClick = () => {
    if (router.asPath === "/") location.reload();
    else router.push("/");
  };

  return (
    <button onClick={handleClick}>
      <Icon name="logo" />
    </button>
  );
};
