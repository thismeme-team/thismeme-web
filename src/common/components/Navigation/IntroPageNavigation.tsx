import { UploadButton } from "@/common/components/Navigation/UploadButton";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SearchHeader } from "./SearchHeader";
import { SideBar } from "./SideBar";

export const IntroPageNavigation = () => {
  return (
    <>
      <Navigation>
        <Navigation.Left>
          <Logo />
        </Navigation.Left>
        <Navigation.Right>
          <UploadButton />
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <SearchHeader isBack={false} />
    </>
  );
};
