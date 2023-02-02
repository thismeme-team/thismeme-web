import { useClickOutside } from "@/application/hooks";
import { withDelay } from "@/application/util/delay";
import { ListDropDown } from "@/components/common/DropDown";

interface Props {
  onClose: () => void;
}

export const MemeLongPress = ({ onClose }: Props) => {
  const delayClose = withDelay(onClose, 200);
  const ref = useClickOutside({ onClose: delayClose });

  return (
    <div className="absolute z-10 m-auto" ref={ref}>
      <ListDropDown.Container width="24">
        <ListDropDown.Content text="콜렉션에 저장하기" onPointerDown={delayClose} />
        <ListDropDown.Content text="이미지 다운로드" onPointerDown={delayClose} />
        <ListDropDown.Content text="공유하기" onPointerDown={delayClose} />
      </ListDropDown.Container>
    </div>
  );
};
