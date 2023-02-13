import { useRouter } from "next/router";
import type { ComponentProps } from "react";

import { useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer";

type CategoryItem = ComponentProps<typeof Accordion>["items"] extends (infer I)[] ? I : never;

export const Category = () => {
  const { data } = useGetCategoryWithTag({
    select: ({ categories }) => {
      const favorite = {
        name: "즐겨찾기",
        id: "즐겨찾기",
        children: categories
          .map((category) => category.tags.filter((tag) => tag.isFav).map((tag) => tag.name))
          .flat(),
      };

      const another = categories.map(
        (category) =>
          ({
            name: category.name,
            id: String(category.categoryId),
            children: category.tags.filter((tag) => !tag.isFav).map((tag) => tag.name),
          } as CategoryItem), // NOTE: webstorm이 아직 satisfies 키워드를 지원하지 않음
      );

      return [favorite, ...another];
    },
  });

  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(tagName));
  };

  return <Accordion items={data} onClickItem={onClickItem} />;
};
