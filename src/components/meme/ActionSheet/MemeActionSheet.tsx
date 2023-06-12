import { Suspense } from "react";
import tw from "twin.macro";

import { useAuth, useCollection, useOverlay } from "@/application/hooks";
import { channelUrl } from "@/application/util";
import { ActionSheet } from "@/common/components/ActionSheet";
import type { Meme } from "@/types";

import { MemeShareModal } from "../MemeInfo/Modal";

interface Props {
  meme: Meme;
  onClose: () => void;
  isOpen: boolean;
}

export const MemeActionSheet = ({ meme, onClose, isOpen }: Props) => {
  const { validate, isLogin } = useAuth();
  const { onUpdateCollection } = useCollection({ memeId: meme.memeId, isLogin });
  const overlay = useOverlay();

  /**
   * NOTE
   * SummarizedCollection, Collection, SearchedCollection 컴포넌트 주석 참고
   */
  return (
    <>
      <ActionSheet isOpen={isOpen} onClose={onClose}>
        <ActionSheet.Button
          className="ga-meme-item-add-save-click"
          onClick={() => {
            onClose();
            validate(onUpdateCollection)();
          }}
        >
          콜렉션에 저장하기
        </ActionSheet.Button>
        <ActionSheet.Button
          className="ga-meme-item-add-share-click"
          onClick={() => {
            onClose();
            overlay.open(({ isOpen, close }) => (
              <Suspense>
                <MemeShareModal id={String(meme.memeId)} isOpen={isOpen} onClose={close} />
              </Suspense>
            ));
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
