import { SearchHeader } from "@/components/common/Navigation/SearchHeader";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";
import { UploadButton } from "./UploadButton";

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
