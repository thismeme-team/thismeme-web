import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";
import { Profile } from "./Profile";
import { SideBar } from "./SideBar";

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
