import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import type { ChangeEventHandler } from "react";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { UploadImage } from "@/features/upload/components/UploadImage";

interface Props {
  handleUploadImage?: ChangeEventHandler<HTMLInputElement>;
}
export const UploadInitialForm = ({ handleUploadImage }: Props) => {
  return (
    <div className="w-full rounded-24 border bg-white pt-16 pb-24 ">
      <div className="flex flex-col gap-24 px-16 pb-24">
        <button className="w-24">
          <Icon color="gray-600" name="meatball" />
        </button>
        <UploadImage />
        <div className="flex items-center gap-8 py-8">
          <Photo className="h-24 w-24 rounded-12 bg-gray-300" />
          <span className="text-14-semibold-140 text-gray-900">분노하는 ISTJ</span>
        </div>
        <div className="relative w-full text-18-semibold-140">
          <input
            className="peer w-full border-b border-gray-200 px-4 pb-4 placeholder:text-gray-500 focus:outline-none"
            placeholder="제목 작성"
            type="text"
          />
          <span className="absolute inset-y-0 left-[7.5rem] text-secondary-700 peer-[:not(:placeholder-shown)]:opacity-0">
            *
          </span>
        </div>
      </div>
      <Root className="w-full border-t border-gray-100" type="multiple">
        <Item value="밈 출처">
          <Header className="border-b border-gray-100">
            <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-24 py-16 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
              <Photo className="h-24 w-24 rounded-12" />
              <span className="flex-grow text-left text-16-semibold-140">밈 출처</span>
              <span className="flex h-24 w-24 items-center justify-center rounded-full hover:bg-gray-100">
                <Icon
                  aria-hidden
                  className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
                  id="chevronDown"
                  name="chevronDown"
                />
              </span>
            </Trigger>
          </Header>
          <Content>hello</Content>
        </Item>
        <Item value="밈 사용상황">
          <Header className="border-b border-gray-100">
            <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-24 py-16 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
              <Photo className="h-24 w-24 rounded-12" />
              <span className="flex-grow text-left text-16-semibold-140">밈 사용상황</span>
              <span className="flex h-24 w-24 items-center justify-center rounded-full hover:bg-gray-100">
                <Icon
                  aria-hidden
                  className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
                  id="chevronDown"
                  name="chevronDown"
                />
              </span>
            </Trigger>
          </Header>
          <Content>hello</Content>
        </Item>
      </Root>
    </div>
  );
};
