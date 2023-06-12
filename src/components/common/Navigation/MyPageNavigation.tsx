import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const MyPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
    </Navigation>
  );
};
