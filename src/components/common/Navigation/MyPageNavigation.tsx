import Link from "next/link";

import { Icon } from "../Icon";
import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export const MyPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Right>
        <Link href="/setting">
          <Icon name="setting" />
        </Link>
      </Navigation.Right>
    </Navigation>
  );
};
