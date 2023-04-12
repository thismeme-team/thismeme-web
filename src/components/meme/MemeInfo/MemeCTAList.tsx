import { useOverlay } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { MemeShareModal } from "@/components/meme/MemeInfo/Modal";
import type { Meme } from "@/types";

import { CollectionSaveButton } from "./Button";

interface Props {
  id: string;
  meme: Meme;
}

export const MemeCTAList = ({ id, meme }: Props) => {
  const overlay = useOverlay();

  return (
    <div className="flex w-full gap-10 py-40">
      <Button
        className="h-52 w-52 shrink-0 rounded-10 bg-gray-900 active:bg-black"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <MemeShareModal id={id} isOpen={isOpen} meme={meme} onClose={close} />
          ));
        }}
      >
        <Icon height={24} name="memeShare" stroke="white" width={24} />
      </Button>

      <CollectionSaveButton id={id} />
    </div>
  );
};
