import { CloseButton } from "./CloseButton";
import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left></Navigation.Left>
      <Navigation.Center>밈 찾기</Navigation.Center>
      <Navigation.Right>
        <CloseButton />
      </Navigation.Right>
    </Navigation>
  );
};
