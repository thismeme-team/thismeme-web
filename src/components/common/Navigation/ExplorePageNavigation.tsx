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
        <div className="max-w-200 truncate font-suit text-18-bold-140">{title}</div>
      </Navigation.Left>
      <Navigation.Right>
        <Profile />
        <SideBar />
      </Navigation.Right>
    </Navigation>
  );
};
