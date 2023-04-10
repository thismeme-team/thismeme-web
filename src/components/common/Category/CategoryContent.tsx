import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import {
  useAuth,
  useDeleteFavoriteTag,
  useGetCategoryWithTag,
  useToast,
} from "@/application/hooks";
import { PATH } from "@/application/util";
import { useSetDrawerContext } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

import { SlotCateogry } from "./SlotCateogry";

const FAVORITE_ID = "즐겨찾기";
const TAG_DELETE_DELAY = 1500;

export const CategoryContent = () => {
  const router = useRouter();
  const { isLoading } = useAuth();
  const setDrawerOpen = useSetDrawerContext();
  const { show, close } = useToast();

  const { data } = useGetCategoryWithTag({
    enabled: !isLoading,
    select: ({ categories }) => {
      const favoriteItem = {
        name: FAVORITE_ID,
        id: FAVORITE_ID,
        icon: "/icon/star.svg",
        tags: categories.map((category) => category.tags.filter((tag) => tag.isFav)).flat(),
      };

      const restItem = categories.map((category) => ({
        name: category.name,
        id: String(category.categoryId),
        icon: category.icon,
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
      {data?.map((item) => (
        <Item key={item.id} value={item.id}>
          <Header className="py-4">
            <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-4 py-12 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
              <Photo className="h-24 w-24 p-2" loading="eager" src={item.icon} />
              <span className="flex-grow text-left text-16-semibold-140">
                {item.name.includes("0") ? (
                  <SlotCateogry name={item.name} tags={item.tags} />
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
              {Array.from(new Set(item.tags.map((tag) => tag.categoryName))).map((category) => (
                <>
                  <div key={category}>
                    <div className="py-8 pl-4 text-gray-600">{category}</div>
                    {item.tags
                      .filter((tag) => tag.categoryName === category)
                      .map((tag) => (
                        <>
                          <li className="pl-20" key={tag.tagId}>
                            <section className="flex w-full justify-between gap-6 rounded-8 py-8 pl-16 hover:bg-gray-100">
                              <button
                                className="grow text-left"
                                onClick={() => onClickItem(tag.tagId)}
                              >
                                {tag.name}
                              </button>
                              {item.id === FAVORITE_ID && (
                                <button
                                  className="[&_*]:stroke-gray-600 [&_*]:hover:stroke-black"
                                  onClick={() => handleDeleteItem(tag.tagId)}
                                >
                                  <Icon height={24} name="cancel" width={24} />
                                </button>
                              )}
                            </section>
                          </li>
                        </>
                      ))}
                  </div>
                </>
              ))}
            </ul>
          </Content>
        </Item>
      ))}
    </Root>
  );
};
