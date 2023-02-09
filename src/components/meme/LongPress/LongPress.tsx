import { Actions, ActionsButton, ActionsGroup } from "konsta/react";
import { css } from "twin.macro";

interface Props {
  open: boolean;
  onClose: () => void;
}
export const LongPress = ({ open, onClose }: Props) => {
  return (
    <>
      <Actions opened={open} onBackdropClick={onClose}>
        <ActionsGroup>
          <ActionsButton
            css={css`
              height: 48px;
            `}
            onClick={onClose}
          >
            <span className="text-ios-primary">콜렉션 모아보기</span>
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
            `}
            onClick={onClose}
          >
            <span className="text-ios-primary">이미지 저장하기</span>
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
            `}
            onClick={onClose}
          >
            <span className="text-ios-primary">공유하기</span>
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
            `}
            onClick={onClose}
          >
            <span className="text-ios-primary">취소하기</span>
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
};
