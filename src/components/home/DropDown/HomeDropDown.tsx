import type { PointerEvent } from "react";
import { useState } from "react";
import { css } from "twin.macro";

import { DropDown } from "@/components/common/DropDown/DropDown";
import { Icon } from "@/components/common/Icon";

export const HomeDropDown = () => {
  const [menu, setMenu] = useState<string>("@nickname이 찾는 밈");

  const handleDropMenu = (e: PointerEvent<HTMLLIElement>) => {
    setMenu((e.target as HTMLElement).innerText);
  };

  return (
    <DropDown>
      <div className="flex items-center py-16">
        <header className="font-suit text-22-bold-140">{menu}</header>
        <DropDown.Trigger>
          {({ isOpen }) => (
            <span className="flex h-40 w-40">
              <Icon
                name="chevronDown2"
                css={css`
                  cursor: pointer;
                  overflow: visible;
                  margin: auto;
                  transition-duration: 300ms;
                  transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
                  ${isOpen && "transform: rotate(180deg)"}
                `}
              />
            </span>
          )}
        </DropDown.Trigger>
      </div>
      <DropDown.Contents width="34">
        <DropDown.Content>
          <li
            className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
            onPointerDown={handleDropMenu}
          >
            @nickname 이 찾는 그 밈
          </li>
        </DropDown.Content>
        <DropDown.Content>
          <li
            className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
            onPointerDown={handleDropMenu}
          >
            공유가 많이 된 그 밈
          </li>
        </DropDown.Content>
        <DropDown.Content>
          <li
            className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
            onPointerDown={handleDropMenu}
          >
            최신 업로드 된 밈
          </li>
        </DropDown.Content>
      </DropDown.Contents>
    </DropDown>
  );
};
