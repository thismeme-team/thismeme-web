import { Actions, ActionsButton, ActionsGroup } from "konsta/react";
import { css } from "twin.macro";

import { android } from "@/application/util";

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
              color: ${!android && "#007aff"};
            `}
            onClick={onClose}
          >
            콜렉션에 저장하기
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
              color: ${!android && "#007aff"};
            `}
            onClick={onClose}
          >
            이미지 다운로드
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
              color: ${!android && "#007aff"};
            `}
            onClick={onClose}
          >
            공유하기
          </ActionsButton>
          <ActionsButton
            css={css`
              height: 48px;
              color: ${!android && "#007aff"};
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
