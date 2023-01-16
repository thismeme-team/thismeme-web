import Link from "next/link";
import { Suspense } from "react";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { Category } from "@/components/common/Navigation/SideBar/Category";
import { SearchInput } from "@/components/search";

export const SideBar = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        {({ isOpen }) => (isOpen ? <Icon name="cancel" /> : <Icon name="menu" />)}
      </Drawer.Trigger>
      <Drawer.Content className="mt-50" direction="right">
        <Link className="mb-8 block py-12" href="/search">
          <SearchInput placeholder="당신이 찾는 밈, 여기 있다." />
        </Link>
        <Suspense>
          <Category />
        </Suspense>
      </Drawer.Content>
    </Drawer>
  );
};
