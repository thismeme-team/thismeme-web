import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Center>밈 찾기</Navigation.Center>
    </Navigation>
  );
};
