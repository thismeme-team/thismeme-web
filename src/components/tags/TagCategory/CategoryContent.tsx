import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import { useAuth, useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

import { FavoriteCategory } from "./FavoriteCategory";
import { SlotCategory } from "./SlotCategory";

const FAVORITE_ID = "북마크";

export const CategoryContent = () => {
  const router = useRouter();
  const { isLoading } = useAuth();

  const { data } = useGetCategoryWithTag({
    enabled: !isLoading,
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

  const onClickItem = (tagId: number) => {
    router.push(PATH.getExploreByTagPath(tagId));
  };

  return (
    <Root collapsible className="w-full min-w-300" defaultValue={FAVORITE_ID} type="single">
      <FavoriteCategory />
      {data?.map((item) => (
        <>
          {item.name === "사용자" && (
            <div className="py-8 text-18-bold-140">이럴 때 이런 밈은 어때요?</div>
          )}
          {item.name === "콘텐츠" && <div className="py-8 text-18-bold-140">밈 바로 찾기</div>}
          <Item key={item.id} value={item.id}>
            <Header className="py-4">
              <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-4 py-12 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
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
                  <>
                    <div className="py-8 pl-4 text-gray-600">{category.name}</div>
                    {category.tags.map((tag) => (
                      <li className="flex w-full justify-between gap-6 pl-20" key={tag.tagId}>
                        <button
                          className="w-full rounded-8 py-8 pl-16 hover:bg-primary-200"
                          onClick={() => onClickItem(tag.tagId)}
                        >
                          <div className="grow text-left">{tag.name}</div>
                        </button>
                      </li>
                    ))}
                  </>
                ))}
              </ul>
            </Content>
          </Item>
        </>
      ))}
    </Root>
  );
};
