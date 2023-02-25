import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const BackButtonNavigation = ({ title }: { title: string }) => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Center>{title}</Navigation.Center>
    </Navigation>
  );
};
