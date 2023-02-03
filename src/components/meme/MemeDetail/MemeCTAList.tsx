import { useMemeDetailById, useToast } from "@/application/hooks";
import { ShareModalButton } from "@/components/meme/MemeDetail/Button";
import { CollectionSaveButton } from "@/components/meme/MemeDetail/Button/CollectionSaveButton";

interface Props {
  id: string;
}
export const MemeCTAList = ({ id }: Props) => {
  const {
    viewCount,
    createdDate,
    shareCount,
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);
  const { show } = useToast();

  const handleCollectionClick = () => show("콜렉션에 저장했습니다!");

  return (
    <div className="flex w-full gap-10 py-40">
      <ShareModalButton src={images[0].imageUrl} />
      <CollectionSaveButton onClick={handleCollectionClick} />
    </div>
  );
};
