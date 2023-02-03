import { useToast } from "@/application/hooks";
import { CollectionSaveButton } from "@/components/meme/MemeDetail/Button/CollectionSaveButton";
import { MemeShareModal } from "@/components/meme/MemeDetail/Modal";

interface Props {
  id: string;
}
export const MemeCTAList = ({ id }: Props) => {
  const { show } = useToast();

  const handleCollectionClick = () => show("콜렉션에 저장했습니다!");

  return (
    <div className="flex w-full gap-10 py-40">
      <MemeShareModal id={id} />
      <CollectionSaveButton onClick={handleCollectionClick} />
    </div>
  );
};
