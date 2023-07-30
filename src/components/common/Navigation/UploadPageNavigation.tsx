import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const UploadPageNavigation = () => {
  return (
    <Navigation className="bg-gray-100">
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Right>
        <div>게시</div>
      </Navigation.Right>
    </Navigation>
  );
};
