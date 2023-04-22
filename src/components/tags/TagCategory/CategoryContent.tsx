import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import {
  useAuth,
  useDeleteFavoriteTag,
  useGetCategoryWithTag,
  useGetFavoriteTags,
  useToast,
} from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

const FAVORITE_ID = "북마크";
const TAG_DELETE_DELAY = 1500;

export const CategoryContent = () => {
  const router = useRouter();
  const { isLoading, isLogin } = useAuth();
  const { show, close } = useToast();

  const { favoriteCategory, favoriteTags } = useGetFavoriteTags({ enabled: isLogin });

  const favoriteItem = {
    name: FAVORITE_ID,
    id: FAVORITE_ID,
    icon: "/icon/star.svg",
    categories: favoriteCategory,
    maintags: [],
  };

  const { data } = useGetCategoryWithTag({
    enabled: !isLoading,
    select: ({ mainCategories, mainTags }) => {
      const restItem = mainCategories.map((maincategory) => ({
        name: maincategory.name,
        id: String(maincategory.mainCategoryId),
        icon: maincategory.icon,
        categories: maincategory.categories,
        maintags: mainTags[maincategory.mainCategoryId - 1] || [],
      }));

      return restItem;
    },
  });

  if (favoriteTags?.length && isLogin) data?.unshift(favoriteItem);

  const onClickItem = (tagId: number) => {
    router.push(PATH.getExploreByTagPath(tagId));
  };

  const { mutate: deleteFavoriteTag, onCancel } = useDeleteFavoriteTag(TAG_DELETE_DELAY);

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
        <>
          {item.id === "북마크" && (
            <div className="py-8 text-18-bold-140">당신이 즐겨찾는 태그</div>
          )}
          {item.id === "1" && (
            <div className="py-8 text-18-bold-140">이럴 때 이런 밈은 어때요?</div>
          )}
          {item.id === "4" && <div className="py-8 text-18-bold-140">밈 바로 찾기</div>}
          <Item key={item.id} value={item.id}>
            <Header className="py-4">
              <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-4 py-12 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
                <Photo className="h-24 w-24 p-2" loading="eager" src={item.icon} />
                <span className="flex-grow text-left text-16-semibold-140">{item.name}</span>
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
                        {item.id === FAVORITE_ID && (
                          <button
                            className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100 [&_*]:stroke-gray-600 [&_*]:hover:stroke-black"
                            onClick={() => handleDeleteItem(tag.tagId)}
                          >
                            <Icon height={24} name="cancel" width={24} />
                          </button>
                        )}
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
