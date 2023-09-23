import { UploadButton } from "@/common/components/Navigation/UploadButton";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SearchHeader } from "./SearchHeader";
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
          <UploadButton />
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <SearchHeader searchValue={title} />
    </>
  );
};
