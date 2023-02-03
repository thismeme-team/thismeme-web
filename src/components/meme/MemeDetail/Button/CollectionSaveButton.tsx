import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

export const CollectionSaveButton = () => {
  return (
    <Button className="flex h-52 w-full items-center gap-8 rounded-10 bg-gray-900">
      <Icon name="collection" />
      <span className="font-suit text-16-semibold-140 text-white">콜렉션에 저장</span>
    </Button>
  );
};
