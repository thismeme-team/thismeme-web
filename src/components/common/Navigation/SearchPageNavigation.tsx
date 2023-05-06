import { Logo } from "@/components/common/Navigation/Logo";

import { CloseButton } from "./CloseButton";
import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <Logo />
      </Navigation.Left>
      <Navigation.Right>
        <CloseButton />
      </Navigation.Right>
    </Navigation>
  );
};
