import tw from "twin.macro";

import { useAuth, useCollection } from "@/application/hooks";
import { channelUrl } from "@/application/util";
import { ActionSheet } from "@/components/common/ActionSheet";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
  onClose: () => void;
  isOpen: boolean;
  isCollection: boolean;
}
export const MemeActionSheet = ({ meme, onClose, isOpen, isCollection = false }: Props) => {
  const { validate, isLogin } = useAuth();
  const { onUpdateCollection } = useCollection({ memeId: meme.memeId, isLogin });

  return (
    <>
      <ActionSheet isOpen={isOpen}>
        {!isCollection && (
          <ActionSheet.Button
            onClick={() => {
              onClose();
              validate(onUpdateCollection)();
            }}
          >
            콜렉션에 저장하기
          </ActionSheet.Button>
        )}
        <ActionSheet.Button
          onClick={() => {
            onClose();
          }}
        >
          친구에게 공유하기
        </ActionSheet.Button>
        <ActionSheet.Button>
          <a
            className="flex h-full w-full items-center justify-center"
            href={channelUrl}
            rel="noreferrer"
            target="_blank"
          >
            게시물 신고하기
          </a>
        </ActionSheet.Button>
        <ActionSheet.Button css={tw`text-secondary-900`} onClick={onClose}>
          취소
        </ActionSheet.Button>
      </ActionSheet>
    </>
  );
};
