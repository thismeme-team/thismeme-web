import type { MouseEvent } from "react";
import { useState } from "react";
import { css } from "twin.macro";

import { useAuth } from "@/application/hooks";
import { DropDown } from "@/components/common/DropDown/DropDown";
import { Icon } from "@/components/common/Icon";

export const MemeSortDropDown = () => {
  const { isLogin, user } = useAuth();
  const [menu, setMenu] = useState<string>(
    user?.name ? `@${user?.name}이 찾는 그 밈` : `공유가 많이 된 그 밈`,
  );

  const handleDropMenu = (e: MouseEvent<HTMLLIElement>) => {
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
      <DropDown.Contents css={{ width: "34rem" }}>
        {isLogin && (
          <DropDown.Content
            className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
            onClick={handleDropMenu}
          >
            {`@${user?.name}이 찾는 그 밈`}
          </DropDown.Content>
        )}
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={handleDropMenu}
        >
          공유가 많이 된 그 밈
        </DropDown.Content>
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={handleDropMenu}
        >
          최신 업로드 된 그 밈
        </DropDown.Content>
      </DropDown.Contents>
    </DropDown>
  );
};
