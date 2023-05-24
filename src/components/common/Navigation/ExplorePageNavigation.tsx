import { Logo } from "@/components/common/Navigation/Logo";
import { SearchHeader } from "@/components/common/Navigation/SearchHeader";

import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

interface Props {
  title?: string;
}

export const ExplorePageNavigation = ({ title }: Props) => {
  return (
    <>
      <Navigation>
        <Navigation.Left>
          <Logo />
        </Navigation.Left>
        <Navigation.Right>
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <SearchHeader searchValue={title} />
    </>
  );
};
