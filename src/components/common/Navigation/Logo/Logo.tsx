import { Icon } from "@/components/common/Icon";

export const Logo = () => {
  return (
    <button onClick={() => location.reload()}>
      <Icon name="logo" />
    </button>
  );
};
