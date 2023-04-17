import { useRouter } from "next/router";

import { useScrollDirection } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { SearchInput } from "@/components/search";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

export const IntroPageNavigation = () => {
  const direction = useScrollDirection();
  const router = useRouter();

  return (
    <div
      className={`sticky z-40 bg-white transition-[top] ${
        direction === "DOWN" ? "top-0" : "-top-54"
      }`}
    >
      <Navigation css={{ position: "static" }}>
        <Navigation.Left>
          <Logo />
        </Navigation.Left>
        <Navigation.Right>
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <section className="z-40 flex gap-7 transition-transform">
        <SearchInput
          inputMode="none"
          placeholder="당신이 생각한 '그 밈' 검색하기"
          onClick={() => {
            router.push("/search");
          }}
        />
        <button>
          <span className="text-18-bold-140 text-primary-500">Tag</span>
          <span className="flex w-full justify-center">
            <Icon color="primary-500" name="chevronDown" />
          </span>
        </button>
      </section>
    </div>
  );
};
