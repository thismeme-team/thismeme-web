import { Suspense } from "react";

import { useAuth } from "@/application/hooks";
import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { useOverlay } from "@/common/hooks";
import { useCollection } from "@/features/common";

import { MemeShareModal } from "./MemeShareModal";

interface MemeCTAListProps {
  id: string;
}

export const MemeCTAList = ({ id }: MemeCTAListProps) => {
  const overlay = useOverlay();

  return (
    <div className="flex w-full gap-10 py-40">
      <Button
        className="ga-meme-share-click h-52 w-52 shrink-0 rounded-10 bg-gray-900 active:bg-black"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Suspense>
              <MemeShareModal id={id} isOpen={isOpen} onClose={close} />
            </Suspense>
          ));
        }}
      >
        <Icon height={24} name="memeShare" stroke="white" width={24} />
      </Button>

      <CollectionSaveButton id={id} />
    </div>
  );
};

interface CollectionSaveButtonProps {
  id: string;
}
const CollectionSaveButton = ({ id }: CollectionSaveButtonProps) => {
  const { validate, isLogin } = useAuth();
  const { isAdded, onUpdateCollection } = useCollection({ memeId: Number(id), isLogin });

  return (
    <Button
      className={`ga-meme-save-click h-52 w-full items-center gap-8 rounded-10 ${
        isAdded ? "bg-gray-300" : "bg-gray-900 active:bg-black"
      }`}
      onClick={validate(onUpdateCollection)}
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
  );
};
