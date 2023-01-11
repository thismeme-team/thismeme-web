import Link from "next/link";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { SideBar } from "@/components/common/SideBar";
import { SearchInput } from "@/components/search";

export const Menu = () => {
  // TODO SideBar Category API fetching
  return (
    <Drawer>
      <Drawer.Trigger close={<Icon name="cancel" />} open={<Icon name="menu" />} />
      <Drawer.Content className="mt-50">
        <Link className="mb-8 block py-12" href="/search">
          <SearchInput placeholder="당신이 찾는 밈, 여기 있다." />
        </Link>
        <SideBar />
      </Drawer.Content>
    </Drawer>
  );
};
