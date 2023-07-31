import { instagramUrl, twitterUrl } from "@/common/utils";
import { useAuth, useTagCategoryContext } from "@/features/common";

import { Drawer } from "../../Drawer";
import { Icon } from "../../Icon";
import { LoginSideBarContent } from "./LoginSideBarContent";
import { LogoutSideBarContent } from "./LogoutSideBarContent";

export const SideBar = () => {
  const auth = useAuth();
  const [, setIsOpenTagCategory] = useTagCategoryContext();

  return (
    <>
      <Drawer>
        <Drawer.Trigger>
          {({ isOpen }) =>
            isOpen ? (
              <Icon className="ga-common-category-click" name="cancel" />
            ) : (
              <Icon name="menu" onClick={() => setIsOpenTagCategory(false)} />
            )
          }
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
