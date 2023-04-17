import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useScrollDirection } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE, Z_INDEX } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeListContainer } from "@/components/home";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const direction = useScrollDirection();

  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        openGraph={{ imageUrl: "/open-graph/home.png" }}
        title={TITLE.default}
      />
      <IntroPageNavigation />

      <PullToRefresh>
        <section
          className={`sticky ${Z_INDEX.header} flex gap-7 bg-white transition-[top] ${
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
          <button>
            <span className="text-18-bold-140 text-primary-500">Tag</span>
            <span className="flex w-full justify-center">
              <Icon color="primary-500" name="chevronDown" />
            </span>
          </button>
        </section>
        <MemeListContainer />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
