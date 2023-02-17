import { Actions, ActionsButton, ActionsGroup } from "konsta/react";
import { css } from "twin.macro";

import { useAuth, useDownload, useModal, useToast } from "@/application/hooks";
import { usePostMemeToSharedCollection } from "@/application/hooks/api/collection";
import { android } from "@/application/util";
import { SignUpModal } from "@/components/common/Modal";
import type { Image } from "@/types";

interface Props {
  name: string;
  description: string;
  image: Image;
  open: boolean;
  onClose: () => void;
}

export const MemeLongPress = ({ name, description, image, open, onClose }: Props) => {
  const { download } = useDownload();
  const modalProps = useModal();
  const { show } = useToast();
  const { isLogin } = useAuth();
  const { mutate: postMemeToSharedCollection } = usePostMemeToSharedCollection({ memeId: 1 });

  const url = image.images[0].imageUrl;

  const handleImageDownload = () =>
    download({
      target: url,
      name,
      onSuccess: () => show("이미지를 다운로드 했습니다!"),
    });

  const handleCollectionSave = () => show("콜렉션에 저장했습니다!");

  const handleNaviteShare = async () => {
    if (!navigator.share) return show("공유하기가 지원되지 않는 브라우저 입니다");
    await navigator.share({ title: name, text: description, url });
  };

  return (
    <>
      <Actions
        opened={open}
        css={[
          !android &&
            css`
              max-width: calc(min(48rem, 100%) - 3.6rem);
              padding-bottom: 4rem;
            `,
          android &&
            css`
              max-width: calc(min(48rem, 100%));
              border-radius: 0 0 1.3rem 1.3rem;
            `,
        ]}
        onBackdropClick={onClose}
      >
        <SignUpModal {...modalProps} />
        <ActionsGroup>
          <ActionsButton
            css={css`
              height: 6.2rem;
              padding-inline: 1.8rem;
              color: ${!android && "#007aff"};
              font-size: ${android ? "1.65" : "2"}rem;
            `}
            onClick={() => {
              onClose();
              isLogin ? handleCollectionSave() : modalProps.onOpen();
            }}
          >
            콜렉션에 저장하기
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 6.2rem;
              padding-inline: 1.8rem;
              color: ${!android && "#007aff"};
              font-size: ${android ? "1.65" : "2"}rem;
            `}
            onClick={() => {
              onClose();
              handleImageDownload();
            }}
          >
            이미지 다운로드
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 6.2rem;
              padding-inline: 1.8rem;
              color: ${!android && "#007aff"};
              font-size: ${android ? "1.65" : "2"}rem;
            `}
            onClick={() => {
              onClose();
              postMemeToSharedCollection();
              handleNaviteShare();
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
    </>
  );
};
