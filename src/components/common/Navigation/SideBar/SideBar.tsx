import { useAuth } from "@/application/hooks";
import { instagramUrl, twitterUrl } from "@/application/util";
import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";

import { LoginSideBarContent } from "./LoginSideBarContent";
import { LogoutSideBarContent } from "./LogoutSideBarContent";

export const SideBar = () => {
  const auth = useAuth();

  return (
    <>
      <Drawer>
        <Drawer.Trigger>
          {({ isOpen }) => (isOpen ? <Icon name="cancel" /> : <Icon name="menu" />)}
        </Drawer.Trigger>
        <Drawer.Content direction="right">
          <div className="flex h-full flex-col pt-9 pb-30">
            {auth.isLogin ? <LoginSideBarContent {...auth} /> : <LogoutSideBarContent {...auth} />}

            <div className="relative">
              <div className="mb-8 flex justify-center gap-8">
                <a href={twitterUrl} rel="noreferrer" target="_blank">
                  <Icon name="twitter" />
                </a>
                <a href={instagramUrl} rel="noreferrer" target="_blank">
                  <Icon name="instagram" />
                </a>
              </div>
              <div className="text-center text-12-bold-160 text-gray-600">&copy; thismeme.me</div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  );
};
