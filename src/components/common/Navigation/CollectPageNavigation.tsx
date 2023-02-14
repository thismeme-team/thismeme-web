import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const CollectPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Center>나의 콜렉션</Navigation.Center>
    </Navigation>
  );
};
