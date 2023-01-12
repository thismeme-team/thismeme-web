import Logo from "/public/icon/logo.svg";
import { Navigation } from "@/components/common/Navigation/Navigation";
import { Profile } from "@/components/common/Navigation/Profile";
import { SideBar } from "@/components/common/Navigation/SideBar";

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
