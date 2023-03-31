import type { Dispatch, SetStateAction } from "react";
import { startTransition, useCallback } from "react";
import { css } from "twin.macro";

import { DropDown } from "@/components/common/DropDown";
import { Icon } from "@/components/common/Icon";

import type { MemeListType } from "../type";

interface Props {
  sortBy: MemeListType;
  onClickItem: Dispatch<SetStateAction<MemeListType>>;
}

export const MemeSortDropDown = ({ sortBy, onClickItem }: Props) => {
  const dropDownText: { [key in MemeListType]: string } = {
    recent: "최신 순",
    share: "공유 순",
  };

  const handleSortBy = useCallback(
    (type: MemeListType) => {
      // NOTE: 화면 변경 완료될 때까지 이전 UI를 유지하게 하여 MemeList 높이가 0이 되지 않도록 함
      // MemeList 높이가 0이 되면 스크롤이 상단으로 튀는 문제 발생
      startTransition(() => onClickItem(type));
    },
    [onClickItem],
  );

  return (
    <DropDown>
      <div className="flex items-center gap-4 py-8">
        <header className="text-16-semibold-140 text-gray-600">
          {dropDownText[sortBy].replace(/\s/g, "")}
        </header>
        <DropDown.Trigger>
          {({ isOpen }) => (
            <Icon
              color="gray-600"
              height={24}
              name="chevronDown"
              width={24}
              css={css`
                cursor: pointer;
                overflow: visible;
                margin: auto;
                transition-duration: 300ms;
                transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
                ${isOpen && "transform: rotate(180deg)"}
              `}
            />
          )}
        </DropDown.Trigger>
      </div>
      <DropDown.Contents css={{ width: "13.2rem" }}>
        <DropDown.Content
          className={`group h-56 cursor-pointer p-8 text-16-semibold-140 ${
            sortBy === "share" ? "text-gray-900" : "text-gray-600"
          }`}
          onClick={() => {
            handleSortBy("share");
          }}
        >
          <section className="flex h-full items-center gap-4 rounded-8 px-4 py-8 group-active:bg-primary-200 group-active:text-gray-900">
            <Icon height={22} name="shareSort" width={22} />
            {dropDownText.share}
          </section>
        </DropDown.Content>
        <DropDown.Content
          className={`group h-56 cursor-pointer p-8 text-16-semibold-140 ${
            sortBy === "recent" ? "text-gray-900" : "text-gray-600"
          }`}
          onClick={() => {
            handleSortBy("recent");
          }}
        >
          <section className="flex h-full items-center gap-4 rounded-8 px-4 py-8 group-active:bg-primary-200 group-active:text-gray-900">
            <Icon height={22} name="recentSort" width={22} />
            {dropDownText.recent}
          </section>
        </DropDown.Content>
      </DropDown.Contents>
    </DropDown>
  );
};
