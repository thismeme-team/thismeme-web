import { useCallback } from "react";

import { delay } from "@/application/util";

import { ListDropDown } from "../DropDown/ListDropDown";
import { LongPressBase } from "./LongPressBase";

interface Props {
  onClose: () => void;
}

export const MemeLongPress = ({ onClose }: Props) => {
  const delayClose = useCallback(async () => {
    await delay(650);
    onClose();
  }, [onClose]);

  return (
    <LongPressBase onClose={onClose}>
      <div className="m-auto">
        <ListDropDown.Container width="24">
          <ListDropDown.Content text="콜렉션에 저장하기" onPointerDown={delayClose} />
          <ListDropDown.Content text="이미지 다운로드" onPointerDown={delayClose} />
          <ListDropDown.Content text="공유하기" onPointerDown={delayClose} />
        </ListDropDown.Container>
      </div>
    </LongPressBase>
  );
};
