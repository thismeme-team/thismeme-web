import { Suspense } from "react";

import { useOverlay } from "@/application/hooks";
import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { MemeShareModal } from "@/components/meme/MemeInfo/Modal";

import { CollectionSaveButton } from "./Button";

interface Props {
  id: string;
}

export const MemeCTAList = ({ id }: Props) => {
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
