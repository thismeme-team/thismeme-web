import { Actions, ActionsButton, ActionsGroup } from "konsta/react";
import { css } from "twin.macro";

import { useCollection, usePostMemeToSharedCollection, useToast } from "@/application/hooks";
import { android } from "@/application/util";
import { WithAuthHandlers } from "@/components/common/WithAuthHandlers";
import type { Meme } from "@/types";

interface Props {
  meme?: Meme;
  isOpen: boolean;
  onClose: () => void;
}

export const MemeLongPress = ({ isOpen, onClose, meme }: Props) => {
  const { show } = useToast();
  const { onUpdateCollection } = useCollection({ memeId: Number(meme?.memeId) });
  const { mutate: postMemeToSharedCollection } = usePostMemeToSharedCollection({
    memeId: meme?.memeId as number,
  });

  const name = meme?.name || "";
  const description = meme?.description || "";
  const url = meme?.image?.images[0].imageUrl || "";

  const handleNaviteShare = async () => {
    if (!navigator.share) return show("공유하기가 지원되지 않는 브라우저 입니다");
    await navigator.share({ title: name, text: description, url });
  };

  return (
    <Actions
      opened={isOpen}
      css={[
        !android &&
          css`
            max-width: calc(min(48rem, 100%) - 3.6rem);
            padding-inline: 0;
            padding-bottom: 4rem;
          `,
        android &&
          css`
            max-width: calc(min(48rem, 100%));
            border-radius: 0 0 1.3rem 1.3rem;
            padding: 0;
          `,
      ]}
      onBackdropClick={onClose}
    >
      <ActionsGroup>
        <WithAuthHandlers handlers={["onClick"]}>
          <ActionsButton
            css={css`
              height: 6.2rem;
              padding-inline: 1.8rem;
              color: ${!android && "#007aff"};
              font-size: ${android ? "1.65" : "2"}rem;
            `}
            onClick={() => {
              onClose();
              onUpdateCollection();
            }}
          >
            콜렉션에 저장하기
          </ActionsButton>
        </WithAuthHandlers>
        <ActionsButton
          css={css`
            height: 6.2rem;
            padding-inline: 1.8rem;
            color: ${!android && "#007aff"};
            font-size: ${android ? "1.65" : "2"}rem;
          `}
          onClick={() => {
            onClose();
            handleNaviteShare();
            postMemeToSharedCollection();
          }}
        >
          공유하기
        </ActionsButton>
        <ActionsButton
          css={css`
            height: 6.2rem;
            padding-inline: 1.8rem;
            color: #eb4e3d;
            font-size: ${android ? "1.65" : "2"}rem;
          `}
          onClick={onClose}
        >
          취소하기
        </ActionsButton>
      </ActionsGroup>
    </Actions>
  );
};
