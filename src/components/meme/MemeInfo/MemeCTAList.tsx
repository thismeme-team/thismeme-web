import { useModal, useToast } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CollectionSaveButton } from "@/components/meme/MemeInfo/Button/CollectionSaveButton";
import { MemeShareModal } from "@/components/meme/MemeInfo/Modal";

interface Props {
  id: string;
}
export const MemeCTAList = ({ id }: Props) => {
  const { show } = useToast();
  const modalProps = useModal();

  const handleCollectionClick = () => show("콜렉션에 저장했습니다!");

  return (
    <div className="flex w-full gap-10 py-40">
      <Button
        className="h-52 w-52 shrink-0 rounded-10 bg-gray-900 active:bg-black"
        onClick={modalProps.onOpen}
      >
        <Icon color="stroke-white" name="memeShare" />
      </Button>
      <MemeShareModal id={id} {...modalProps} />
      <CollectionSaveButton onClick={handleCollectionClick} />
    </div>
  );
};
