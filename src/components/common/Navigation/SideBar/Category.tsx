import { useRouter } from "next/router";

import { useGetCategoryWithTag } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer";

export const Category = () => {
  const { data } = useGetCategoryWithTag();
  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(PATH.getExploreByTagPath(1));
  };

  return <Accordion items={data} onClickItem={onClickItem} />;
};
