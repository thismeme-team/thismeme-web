import type { MouseEvent } from "react";
import { useCallback, useState } from "react";

import { Icon } from "../Icon";

export const DropDown = () => {
  const menus = ["@nickname이 찾는 그 밈", "공유가 많이 된 밈", "최신 업로드가 된 밈"];
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string>(menus[0]);

  const handleDropMenu = useCallback((e: MouseEvent<HTMLLIElement>) => {
    setMenu((e.target as HTMLElement).innerText);
    setOpen(false);
  }, []);

  return (
    <>
      <div className="flex">
        <header className="text-18-bold-140">{menu}</header>
        <Icon
          className="cursor-pointer overflow-visible transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
          css={{ transform: open ? `rotate(180deg)` : "" }}
          name="chevronDown2"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="absolute z-[900] mt-[50rem] block w-[39rem] rounded-10 border-[1px] border-[#D7D7DD] bg-white">
          <ul>
            <li
              className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
              onPointerDown={(e) => {
                handleDropMenu(e);
              }}
            >
              @nickname 이 찾는 메뉴
            </li>
            <li
              className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
              onPointerDown={(e) => {
                handleDropMenu(e);
              }}
            >
              공유가 많이 된 그 밈
            </li>
            <li
              className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
              onPointerDown={(e) => {
                handleDropMenu(e);
              }}
            >
              최신 업로드가 된 그 밈
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
