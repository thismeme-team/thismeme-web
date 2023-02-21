import { useModal } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Skeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";
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
        <Icon color="stroke-white" name="memeShare" />
      </Button>
      <MemeShareModal id={id} {...memeShareModalProps} />

      <SSRSuspense
        fallback={
          <Skeleton
            animation="wave"
            style={{ width: "100%", height: "5.2rem", borderRadius: "1rem" }}
            variant="rectangular"
          />
        }
      >
        <CollectionSaveButton id={id} />
      </SSRSuspense>
    </div>
  );
};
