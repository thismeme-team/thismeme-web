import tw from "twin.macro";

import { BackButton } from "@/common/components/Navigation/BackButton";
import { Navigation } from "@/common/components/Navigation/Navigation";

export const UploadNavigation = () => {
  return (
    <Navigation css={tw`bg-gray-100 px-2`}>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Right>
        <button className="p-4 text-18-semibold-140 text-gray-500">게시</button>
      </Navigation.Right>
    </Navigation>
  );
};
