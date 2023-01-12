import { BackButton } from "@/components/common/Navigation/BackButton";
import { Navigation } from "@/components/common/Navigation/Navigation";
import { Profile } from "@/components/common/Navigation/Profile";
import { SideBar } from "@/components/common/Navigation/SideBar";

interface Props {
  title?: string;
}
export const ExplorePageNavigation = ({ title }: Props) => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Title>{title}</Navigation.Title>
      <Navigation.Right>
        <Profile />
        <SideBar />
      </Navigation.Right>
    </Navigation>
  );
};
