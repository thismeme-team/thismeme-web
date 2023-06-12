import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

import { useGetCategoryWithTag } from "@/application/hooks";
import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { PATH } from "@/common/utils";

import { CategoryTitle } from "./CategoryTitle";
import { useTagCategoryContext } from "./context";
import { FavoriteCategory } from "./FavoriteCategory";
import { SlotCategory } from "./SlotCategory";

const gtmTrigger: { [key: string]: string } = {
  "OOO이 사용하는 밈": "ga-tag-category-people-click",
  "OOO을 느낄 때": "ga-tag-category-feel-click",
  "OOO할 때": "ga-tag-category-act-click",
  콘텐츠: "ga-tag-category-content-click",
  캐릭터: "ga-tag-category-character-click",
  기타: "ga-tag-category-etc-click",
} as const;

export const CategoryContent = () => {
  const router = useRouter();

  const [, setIsOpenTagCategory] = useTagCategoryContext();
  const { data } = useGetCategoryWithTag({
    select: ({ mainCategories, mainTags }) => {
      const restItem = mainCategories.map((maincategory) => ({
        name: maincategory.name,
        id: String(maincategory.mainCategoryId),
        icon: maincategory.icon,
        categories: maincategory.categories,
        mainTags: mainTags[maincategory.mainCategoryId - 1] || [],
      }));

      return restItem;
    },
  });

  const onClickItem = (tagId: number, tagName: string) => {
    setIsOpenTagCategory(false);
    router.push(PATH.getExploreByTagPath(tagId, tagName));
  };

  return (
    <Root collapsible className="w-full min-w-300" defaultValue="북마크" type="single">
      <FavoriteCategory />
      {data?.map((item) => (
        <Fragment key={item.id}>
          <CategoryTitle title={item.name} />
          <Item value={item.id}>
            <Header className="py-4">
              <Trigger
                className={`${
                  gtmTrigger[item.name]
                } flex w-full items-center justify-between gap-8 rounded-full px-4 py-12 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180`}
              >
                <Photo className="h-24 w-24 p-2" loading="eager" src={item.icon} />
                <span className="flex-grow text-left text-16-semibold-140">
                  {item.mainTags.length ? (
                    <SlotCategory name={item.name} tags={item.mainTags} />
                  ) : (
                    item.name
                  )}
                </span>
                <span className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100">
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
              <ul className="flex flex-col pr-16 font-suit text-16-semibold-140">
                {item.categories.map((category) => (
                  <Fragment key={category.categoryId}>
                    <div className="py-8 pl-4 text-gray-600">{category.name}</div>
                    {category.tags.map((tag) => (
                      <li className="flex w-full justify-between gap-6 pl-20" key={tag.tagId}>
                        <button
                          className="ga-tag-category-tags-click w-full rounded-8 py-8 pl-16 hover:bg-primary-200"
                          onClick={() => onClickItem(tag.tagId, tag.name)}
                        >
                          <div className="grow text-left">{tag.name}</div>
                        </button>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            </Content>
          </Item>
        </Fragment>
      ))}
    </Root>
  );
};
