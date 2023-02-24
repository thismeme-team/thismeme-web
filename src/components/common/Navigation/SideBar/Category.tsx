import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import { useDeleteFavoriteTag, useGetCategoryWithTag, useToast } from "@/application/hooks";
import { PATH } from "@/application/util";
import { useSetDrawerContext } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

const FAVORITE_ID = "즐겨찾기";
const TAG_DELETE_DELAY = 1500;

export const Category = () => {
  const router = useRouter();
  const setDrawerOpen = useSetDrawerContext();
  const { show, close } = useToast();

  const { data } = useGetCategoryWithTag({
    select: ({ categories }) => {
      const favoriteItem = {
        name: FAVORITE_ID,
        id: FAVORITE_ID,
        icon: "", // TODO: svg url 연동 필요
        tags: categories.map((category) => category.tags.filter((tag) => tag.isFav)).flat(),
      };

      const restItem = categories.map((category) => ({
        name: category.name,
        id: String(category.categoryId),
        icon: "",
        tags: category.tags.filter((tag) => !tag.isFav),
      }));

      if (favoriteItem.tags.length) restItem.unshift(favoriteItem);

      return restItem;
    },
  });
  const { mutate: deleteFavoriteTag, onCancel } = useDeleteFavoriteTag(TAG_DELETE_DELAY);

  const onClickItem = (tagId: number) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(tagId));
  };

  const handleDeleteItem = async (tagId: number) => {
    show(
      (id) => (
        <>
          <div className="grow">태그가 삭제 되었습니다.</div>
          <button
            className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
            onClick={() => {
              onCancel();
              close({ id, duration: 0 });
              show("태그 삭제를 취소 하였습니다.");
            }}
          >
            삭제 취소
          </button>
        </>
      ),
      { duration: TAG_DELETE_DELAY },
    );

    deleteFavoriteTag(tagId, {
      onError: (err) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        show("태그 삭제가 실패하였습니다.");
      },
    });
  };

  return (
    <Root collapsible className="w-full min-w-300" defaultValue={FAVORITE_ID} type="single">
      {data.map((item) => (
        <Item key={item.id} value={item.id}>
          <Header className="py-4">
            <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-16 py-12 text-16-semibold-130 hover:bg-gray-100 data-[state=open]:bg-gray-100 [&>#chevronDown]:data-[state=open]:rotate-180">
              <Photo className="h-24 w-24" src={item.icon} />
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
            <ul className="flex flex-col pl-50 pr-16 font-suit text-16-semibold-140">
              {item.tags.map((tag) => (
                <li
                  className="flex w-full justify-between gap-6 py-8 [&>#remove_*]:stroke-gray-600 [&>#remove_*]:hover:stroke-black"
                  key={tag.tagId}
                >
                  <button onClick={() => onClickItem(tag.tagId)}>{tag.name}</button>
                  {item.id === FAVORITE_ID && (
                    <button id="remove" onClick={() => handleDeleteItem(tag.tagId)}>
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
