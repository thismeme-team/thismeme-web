import * as Accordion from "@radix-ui/react-accordion";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { useAuth } from "@/features/common";

import { TagsInput } from "./TagsInput";
import { TitleInput } from "./TitleInput";

interface Props {
  index: number;
}
export const UploadMemeData = ({ index }: Props) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-24 pt-24 pb-6">
      <div className="flex items-center gap-8 py-8 px-16">
        {user && (
          <>
            <Photo className="h-24 w-24 rounded-12 bg-gray-300" src={user?.imageUrl} />
            <span className="text-14-semibold-140 text-gray-900">{user?.name}</span>
          </>
        )}
      </div>
      <TitleInput name={`memes.${index}.title`} />
      <Accordion.Root className="w-full border-t border-gray-100 " type="multiple">
        <Accordion.Item value="밈 출처">
          <Accordion.Header className="border-b border-gray-100">
            <Accordion.Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-24 py-16 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
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
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="flex flex-col gap-16 py-24">
              <TagsInput
                description="이 밈에 등장한 캐릭터를 작성해보세요!"
                name={`memes.${index}.tags1`}
                placeholder="박명수, 홍진경"
                rightDecoration="이(가)"
              />
              <TagsInput
                description="이 밈의 출처를 작성해보세요!"
                name={`memes.${index}.tags2`}
                placeholder="무한도전, 에반게리온"
                rightDecoration="에 출연해요"
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="밈 사용상황">
          <Accordion.Header className="border-b border-gray-100">
            <Accordion.Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-24 py-16 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
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
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="flex flex-col gap-16 py-24">
              <TagsInput
                description="이 밈을 쓸 것 같은 사람을 작성해보세요!"
                name={`memes.${index}.tags3`}
                placeholder="ISTJ, 직장인"
                rightDecoration="은(는)"
              />
              <TagsInput
                description="이 밈에서 느껴지는 감정을 작성해보세요!"
                name={`memes.${index}.tags4`}
                placeholder="미안함, 부끄러움"
                rightDecoration="을(를) 느끼고"
              />
              <TagsInput
                description="이 밈을 사용하는 상황을 작성해보세요!"
                name={`memes.${index}.tags5`}
                placeholder="씁쓸할때, 일하기 싫을때"
                rightDecoration="은(는)"
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
