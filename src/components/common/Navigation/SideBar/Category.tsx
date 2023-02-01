import { useRouter } from "next/router";

import { useGetCategoryWithTag } from "@/application/hooks";
import { getExploreByTagPath } from "@/application/util";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer";
import { useGlobalScrollContext } from "@/components/common/Layout";

export const Category = () => {
  const { data } = useGetCategoryWithTag();
  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();
  const ref = useGlobalScrollContext();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router
      .push(getExploreByTagPath(tagName))
      .then(() => ref.current?.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return <Accordion items={data} onClickItem={onClickItem} />;
};
