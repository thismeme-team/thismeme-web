import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

export const ShareButton = () => {
  return (
    <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900">
      <Icon name="memeShare" />
    </Button>
  );
};
