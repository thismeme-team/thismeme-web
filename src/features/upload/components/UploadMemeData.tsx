import type { CSSInterpolation } from "@emotion/serialize";
import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";

import { TagsInput } from "./TagsInput";

interface Props {
  src?: string;
  className?: string;
  css?: CSSInterpolation;
}

export const UploadMemeData = ({ src, className }: Props) => {
  return (
    <div className={`flex flex-col gap-24 pt-24 pb-6 ${className}`}>
      <div className="flex items-center gap-8 py-8 px-16">
        <Photo className="h-24 w-24 rounded-12 bg-gray-300" src={src} />
        <span className="text-14-semibold-140 text-gray-900">분노하는 ISTJ</span>
      </div>
      <div className="relative w-full px-16 text-18-semibold-140 leading-[160%]">
        <input
          className="peer w-full border-b border-gray-200 px-4 pb-4 placeholder:text-gray-500 focus:outline-none"
          placeholder=" "
          type="text"
        />
        <span className="pointer-events-none absolute inset-y-0 left-20 text-gray-500 peer-[:not(:placeholder-shown)]:opacity-0">
          제목 작성 <span className="text-secondary-700">*</span>
        </span>
      </div>
      <Root className="w-full border-t border-gray-100 " type="multiple">
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
          <Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="h-24" />
            <TagsInput
              description="이 밈에 등장한 캐릭터를 작성해보세요!"
              placeholder="박명수, 홍진경"
              word="이(가)"
            />
            <div className="h-16" />
            <TagsInput
              description="이 밈의 출처를 작성해보세요!"
              placeholder="무한도전, 에반게리온"
              word="에 출연해요"
            />
            <div className="h-24" />
          </Content>
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
          <Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="h-24" />
            <TagsInput
              description="이 밈을 쓸 것 같은 사람을 작성해보세요!"
              placeholder="ISTJ, 직장인"
              word="은(는)"
            />
            <div className="h-16" />
            <TagsInput
              description="이 밈에서 느껴지는 감정을 작성해보세요!"
              placeholder="미안함, 부끄러움"
              word="을(를) 느끼고"
            />
            <div className="h-16" />
            <TagsInput
              description="이 밈을 사용하는 상황을 작성해보세요!"
              placeholder="씁쓸할때, 일하기 싫을때"
              word="은(는)"
            />
          </Content>
        </Item>
      </Root>
    </div>
  );
};
