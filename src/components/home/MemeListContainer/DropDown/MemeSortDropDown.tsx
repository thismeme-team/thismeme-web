import type { Dispatch, SetStateAction } from "react";
import { startTransition, useCallback, useEffect } from "react";
import { css } from "twin.macro";

import { useAuth } from "@/application/hooks";
import { DropDown } from "@/components/common/DropDown";
import { Icon } from "@/components/common/Icon";

import type { MemeListType } from "../type";

interface Props {
  sortBy: MemeListType;
  onClickItem: Dispatch<SetStateAction<MemeListType>>;
}

export const MemeSortDropDown = ({ sortBy, onClickItem }: Props) => {
  const { isLogin, user } = useAuth();

  const dropDownText: { [key in MemeListType]: string } = {
    user: `${user?.name}이(가) 찾는 그 밈`,
    recent: "최신 업로드 된 그 밈",
    share: "공유가 많이 된 그 밈",
  };

  const handleSortBy = useCallback(
    (type: MemeListType) => {
      // NOTE: 화면 변경 완료될 때까지 이전 UI를 유지하게 하여 MemeList 높이가 0이 되지 않도록 함
      // MemeList 높이가 0이 되면 스크롤이 상단으로 튀는 문제 발생
      startTransition(() => onClickItem(type));
    },
    [onClickItem],
  );

  useEffect(() => {
    // NOTE: 로그인 & 로그아웃 상태 변경 시 드롭다운 상태 재설정
    handleSortBy(isLogin ? "user" : "share");
  }, [isLogin, handleSortBy]);

  return (
    <DropDown>
      <div className="flex items-center gap-4 py-8">
        <header className="text-16-semibold-140 text-gray-600">{dropDownText[sortBy]}</header>
        <DropDown.Trigger>
          {({ isOpen }) => (
            <span className="h-24 w-24">
              <Icon
                color="gray"
                name="chevronDown"
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
            onClick={() => {
              handleSortBy("user");
            }}
          >
            {dropDownText.user}
          </DropDown.Content>
        )}
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={() => {
            handleSortBy("share");
          }}
        >
          {dropDownText.share}
        </DropDown.Content>
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={() => {
            handleSortBy("recent");
          }}
        >
          {dropDownText.recent}
        </DropDown.Content>
      </DropDown.Contents>
    </DropDown>
  );
};
