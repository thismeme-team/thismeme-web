import Link from "next/link";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { Category } from "@/components/common/Navigation/SideBar/Category";
import { SSRSuspense } from "@/components/common/Suspense";
import { SearchInput } from "@/components/search";

export const SideBar = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        {({ isOpen }) => (isOpen ? <Icon name="cancel" /> : <Icon name="menu" />)}
      </Drawer.Trigger>
      <Drawer.Content className="mt-54" direction="right">
        <Link className="mt-8 mb-4 block py-8" href="/search">
          <SearchInput placeholder="당신이 생각한 '그 밈' 검색하기" />
        </Link>
        <SSRSuspense>
          <div className="px-14">
            <Category />
          </div>
        </SSRSuspense>
      </Drawer.Content>
    </Drawer>
  );
};
