import { useModal } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { MemeShareModal } from "@/components/meme/MemeInfo/Modal";

import { CollectionSaveButton } from "./Button";

interface Props {
  id: string;
}

export const MemeCTAList = ({ id }: Props) => {
  const memeShareModalProps = useModal();

  return (
    <div className="flex w-full gap-10 py-40">
      <Button
        className="h-52 w-52 shrink-0 rounded-10 bg-gray-900 active:bg-black"
        onClick={memeShareModalProps.onOpen}
      >
        <Icon color="stroke-white" height="24" name="memeShare" width="24" />
      </Button>
      <MemeShareModal id={id} {...memeShareModalProps} />

      <CollectionSaveButton id={id} />
    </div>
  );
};
