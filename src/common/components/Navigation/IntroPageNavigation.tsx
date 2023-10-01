import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SearchHeader } from "./SearchHeader";
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
