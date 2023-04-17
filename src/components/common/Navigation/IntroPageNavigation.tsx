import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

export const IntroPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <Logo />
      </Navigation.Left>
      <Navigation.Right>
        <SideBar />
      </Navigation.Right>
    </Navigation>
  );
};
