import type { MouseEvent, PointerEvent } from "react";
import { useState } from "react";
import { css } from "twin.macro";

import { DropDownBase, ListDropDown } from "@/components/common/DropDown";
import { DropDown } from "@/components/common/DropDown/DropDown";
import { Icon } from "@/components/common/Icon";

export const HomeDropDown = () => {
  const [menu, setMenu] = useState<string>("@nickname이 찾는 밈");

  const handleDropMenu = (e: MouseEvent<HTMLLIElement>) => {
    setMenu((e.target as HTMLElement).innerText);
  };

  return (
    <>
      <DropDown>
        <div className="flex">
          <header className="font-suit text-22-bold-140">{menu}</header>
          <DropDown.Trigger>
            {({ isOpen }) => (
              <Icon
                name="chevronDown2"
                css={css`
                  cursor: pointer;
                  overflow: visible;
                  transition-duration: 300ms;
                  transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
                  ${isOpen && "transform: rotate(180deg)"}
                `}
              />
            )}
          </DropDown.Trigger>
        </div>
        <DropDownBase top="51">
          <DropDown.Container>
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
          </DropDown.Container>
        </DropDownBase>
      </DropDown>
    </>
  );
};
