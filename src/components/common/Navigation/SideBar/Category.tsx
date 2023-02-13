import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import { useDeleteFavoriteTag, useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { useSetDrawerContext } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";

const FAVORITE_ID = "즐겨찾기";

export const Category = () => {
  const { data } = useGetCategoryWithTag({
    select: ({ categories }) => {
      const favoriteItem = {
        name: FAVORITE_ID,
        id: FAVORITE_ID,
        tags: categories.map((category) => category.tags.filter((tag) => tag.isFav)).flat(),
      };

      const restItem = categories.map((category) => ({
        name: category.name,
        id: String(category.categoryId),
        tags: category.tags.filter((tag) => !tag.isFav),
      }));

      return [favoriteItem, ...restItem];
    },
  });

  const { mutate } = useDeleteFavoriteTag();

  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(tagName));
  };

  const handleDeleteItem = (tagId: number) => {
    // TODO mutation
    mutate(tagId);
  };

  return (
    <Root collapsible className="w-full min-w-300" defaultValue={FAVORITE_ID} type="single">
      {data.map((item) => (
        <Item key={item.id} value={item.id}>
          <Header className="py-4">
            <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-16 py-12 text-16-semibold-130 hover:bg-gray-100 data-[state=open]:bg-gray-100 [&>#chevronDown]:data-[state=open]:rotate-180">
              <div className="h-24 w-24 rounded-full bg-light-gray-30"></div>
              <span className="flex-grow text-left">{item.name}</span>
              <Icon
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
                id="chevronDown"
                name="chevronDown"
              />
            </Trigger>
          </Header>
          <Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <ul className="flex flex-col px-50 font-suit text-16-semibold-140">
              {item.tags.map((tag) => (
                <li className="flex w-fit gap-6 py-8 [&>#remove]:hover:visible" key={tag.tagId}>
                  <button onClick={() => onClickItem(tag.name)}>{tag.name}</button>
                  {item.id === FAVORITE_ID && (
                    <button
                      className="invisible"
                      id="remove"
                      onClick={() => handleDeleteItem(tag.tagId)}
                    >
                      <Icon height={24} name="cancel" width={24} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Content>
        </Item>
      ))}
    </Root>
  );
};
