import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { SideBar } from "@/components/common/SideBar";

export const Menu = () => {
  // TODO SideBar Category API fetching
  return (
    <Drawer>
      <Drawer.Trigger close={<Icon name="cancel" />} open={<Icon name="menu" />} />
      <Drawer.Content>
        <SideBar />
      </Drawer.Content>
    </Drawer>
  );
};
