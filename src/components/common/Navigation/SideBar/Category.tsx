import { useRouter } from "next/router";
import type { ComponentProps } from "react";

import { useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer";

type AccordionItem = ComponentProps<typeof Accordion>["items"] extends (infer I)[] ? I : never;
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

      const accordionItems = categories.map(
        (category) =>
          ({
            name: category.name,
            id: String(category.categoryId),
            children: category.tags.filter((tag) => !tag.isFav).map((tag) => tag.name),
          } as AccordionItem), // NOTE: webstorm이 아직 satisfies 키워드를 지원하지 않음
      );

      // 즐겨찾기 한 태그가 있을 때만 아코디언에 추가
      if (favoriteItem.children.length) accordionItems.unshift(favoriteItem);

      return accordionItems;
    },
  });

  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(tagName));
  };

  return <Accordion defaultValue={FAVORITE_ID} items={data} onClickItem={onClickItem} />;
};
