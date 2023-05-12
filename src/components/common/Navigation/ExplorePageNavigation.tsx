import { useRouter } from "next/router";
import tw from "twin.macro";

import { useScrollDirection } from "@/application/hooks";
import { Logo } from "@/components/common/Navigation/Logo";
import { SearchInput } from "@/components/search";
import { TagCategory } from "@/components/tags";

import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

interface Props {
  title?: string;
}
export const ExplorePageNavigation = ({ title }: Props) => {
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
          css={tw`placeholder:text-gray-900`}
          inputMode="none"
          placeholder={title}
          onClick={() => {
            router.push("/search");
          }}
        />
        <TagCategory />
      </section>
    </>
  );
};
