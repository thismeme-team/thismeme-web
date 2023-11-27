import tw from "twin.macro";

import { BackButton } from "@/common/components/Navigation/BackButton";
import { Navigation } from "@/common/components/Navigation/Navigation";

export const UploadNavigation = () => {
  return (
    <Navigation css={tw`bg-gray-100 px-2`}>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Right></Navigation.Right>
    </Navigation>
  );
};
