import { CloseButton } from "./CloseButton";
import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left></Navigation.Left>
      <Navigation.Title>밈 찾기</Navigation.Title>
      <Navigation.Right>
        <CloseButton />
      </Navigation.Right>
    </Navigation>
  );
};
