import { useRouter } from "next/router";

import { useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";

const FAVORITE_ID = "즐겨찾기";

export const Category = () => {
  const { data } = useGetCategoryWithTag({
    select: ({ categories }) => {
      const favoriteItem = {
        name: FAVORITE_ID,
        id: FAVORITE_ID,
        children: categories
          .map((category) => category.tags.filter((tag) => tag.isFav).map((tag) => tag.name))
          .flat(),
      };

      const restItem = categories.map((category) => ({
        name: category.name,
        id: String(category.categoryId),
        children: category.tags.filter((tag) => !tag.isFav).map((tag) => tag.name),
      }));

      return [favoriteItem, ...restItem];
    },
  });

  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(tagName));
  };

  const handleDeleteItem = (tagName: string) => {
    // TODO mutation
  };

  return (
    <Accordion
      defaultValue={FAVORITE_ID}
      items={data}
      render={(item) => (
        <ul className="flex flex-col px-50 font-suit text-16-semibold-140">
          {item.children.map((child) => (
            <li className="flex w-fit gap-6 py-8 [&>#remove]:hover:visible" key={child}>
              <button onClick={() => onClickItem(child)}>{child}</button>
              {item.id === FAVORITE_ID && (
                <button className="invisible" id="remove" onClick={() => handleDeleteItem(child)}>
                  <Icon height={24} name="cancel" width={24} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    />
  );
};
