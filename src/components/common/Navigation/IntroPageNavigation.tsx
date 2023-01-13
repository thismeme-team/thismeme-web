import Logo from "/public/icon/logo.svg";

import { Navigation } from "./Navigation";
import { Profile } from "./Profile";
import { SideBar } from "./SideBar";

export const IntroPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <Logo />
      </Navigation.Left>
      <Navigation.Right>
        <Profile />
        <SideBar />
      </Navigation.Right>
    </Navigation>
  );
};
