import { useRouter } from "next/router";

import { useScrollDirection } from "@/application/hooks";
import { SearchInput } from "@/components/search";
import { TagCategory } from "@/components/tags";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

export const IntroPageNavigation = () => {
  const router = useRouter();
  const direction = useScrollDirection();

  return (
    <>
      <Navigation>
        <Navigation.Left>
          <Logo />
        </Navigation.Left>
        <Navigation.Right>
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <section
        className={`sticky z-10 flex items-center gap-7 bg-white transition-[top] ${
          direction === "DOWN" ? "top-54" : "top-0"
        }`}
      >
        <SearchInput
          inputMode="none"
          placeholder="당신이 생각한 '그 밈' 검색하기"
          onClick={() => {
            router.push("/search");
          }}
        />
        <TagCategory topOffset="14.2rem" />
      </section>
    </>
  );
};
