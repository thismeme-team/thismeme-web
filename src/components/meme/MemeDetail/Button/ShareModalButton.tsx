import { useModal } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { MemeShareModal } from "@/components/meme/MemeDetail/Modal";

export const ShareModalButton = ({ src }: { src: string }) => {
  const { open, onOpen, onClose } = useModal();

  return (
    <>
      <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900" onClick={onOpen}>
        <Icon name="memeShare" />
      </Button>
      {open && <MemeShareModal src={src} onClose={onClose} />}
    </>
  );
};
