import Link from "next/link";

import Delete from "/public/icon/cancel.svg";

import { Navigation } from "./Navigation";

export const SearchPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Title>밈 찾기</Navigation.Title>
      <Navigation.Right>
        <Link className="block" href="/">
          <Delete />
        </Link>
      </Navigation.Right>
    </Navigation>
  );
};
