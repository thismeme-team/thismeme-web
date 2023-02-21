import { useCollection } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { WithAuthHandlers } from "@/components/common/WithAuthHandlers";

interface Props {
  id: string;
}

export const CollectionSaveButton = ({ id }: Props) => {
  const { isAdded, onUpdateCollection } = useCollection({ memeId: Number(id) });

  return (
    <WithAuthHandlers handlers={["onClick"]}>
      <Button
        className={`flex h-52 w-full items-center gap-8 rounded-10 ${
          isAdded ? "bg-gray-300" : "bg-gray-900 active:bg-black"
        }`}
        onClick={onUpdateCollection}
      >
        <Icon
          className={`${isAdded ? "[&_*]:fill-gray-800" : "[&_*]:fill-secondary-1000"}`}
          name="collection"
        />
        <span
          className={`font-suit text-16-semibold-140 ${isAdded ? "text-gray-800" : "text-white"}`}
        >
          콜렉션에 저장
        </span>
      </Button>
    </WithAuthHandlers>
  );
};
