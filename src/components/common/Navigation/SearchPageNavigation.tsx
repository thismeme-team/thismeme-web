import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Title>밈 찾기</Navigation.Title>
    </Navigation>
  );
};
