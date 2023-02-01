import { useDelay } from "@/application/hooks/common/useDelay";
import { ListDropDown } from "@/components/common/DropDown";
import { LongPress } from "@/components/common/LongPress";

interface Props {
  onClose: () => void;
}

export const MemeLongPress = ({ onClose }: Props) => {
  const delayClose = useDelay({ event: onClose, time: 650 });

  return (
    <LongPress onClose={onClose}>
      <div className="m-auto">
        <ListDropDown.Container width="24">
          <ListDropDown.Content text="콜렉션에 저장하기" onPointerDown={delayClose} />
          <ListDropDown.Content text="이미지 다운로드" onPointerDown={delayClose} />
          <ListDropDown.Content text="공유하기" onPointerDown={delayClose} />
        </ListDropDown.Container>
      </div>
    </LongPress>
  );
};
