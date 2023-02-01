import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useState } from "react";

import { useModal } from "@/application/hooks";
import { useDelay } from "@/application/hooks/common/useDelay";
import { Icon } from "@/components/common/Icon";

import { DropDownBase } from "../DropDownBase";
import { ListDropDown } from "./ListDropDown";

export const HomeDropDown = () => {
  const [menu, setMenu] = useState<string>("@nickname이 찾는 밈");
  const { open, onOpen, onClose } = useModal();
  const delayClose = useDelay({ event: onClose, time: 650 });

  const handleDropMenu = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      setMenu((e.target as HTMLElement).innerText);
      delayClose();
    },
    [delayClose],
  );

  return (
    <>
      <div className="flex">
        <header className="font-suit text-22-bold-140">{menu}</header>
        <Icon
          className="cursor-pointer overflow-visible transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
          css={{ transform: open ? "rotate(180deg)" : "" }}
          name="chevronDown2"
          onClick={() => (open ? onClose() : onOpen())}
        />
      </div>
      {open && (
        <DropDownBase top="51">
          <ListDropDown.Container width="34">
            <ListDropDown.Content
              text="@nickname 이 찾는 메뉴"
              onPointerDown={(e: PointerEvent<HTMLLIElement>) => {
                handleDropMenu(e);
              }}
            />
            <ListDropDown.Content
              text="공유가 많이 된 그 밈"
              onPointerDown={(e: PointerEvent<HTMLLIElement>) => {
                handleDropMenu(e);
              }}
            />
            <ListDropDown.Content
              text="최신 업로드가 된 밈"
              onPointerDown={(e: PointerEvent<HTMLLIElement>) => {
                handleDropMenu(e);
              }}
            />
          </ListDropDown.Container>
        </DropDownBase>
      )}
    </>
  );
};
