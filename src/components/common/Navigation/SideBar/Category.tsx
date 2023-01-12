import { useRouter } from "next/router";

import { useGetCategoryWithTag } from "@/application/hooks";
import { Accordion } from "@/components/common/Accordion";
import { useSetDrawerContext } from "@/components/common/Drawer/context";

export const Category = () => {
  const { data } = useGetCategoryWithTag();
  const setDrawerOpen = useSetDrawerContext();
  const router = useRouter();

  const onClickItem = (tagName: string) => {
    setDrawerOpen(false);
    router.push(`/explore/tags?q=${tagName}`);
  };

  return <Accordion items={data} onClickItem={onClickItem} />;
};
