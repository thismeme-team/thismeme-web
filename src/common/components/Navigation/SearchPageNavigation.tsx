import { CloseButton } from "./CloseButton";
import { Logo } from "./Logo";
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
