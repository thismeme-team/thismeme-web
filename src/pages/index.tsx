import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { PopularTagList, UserSharedMemeList } from "@/components/home";
import { MemeContext } from "@/components/home/MemeContext";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLogin, user } = useAuth();
  return (
    <>
      <NextSeo description={DEFAULT_DESCRIPTION} title={TITLE.home} />
      <IntroPageNavigation />
      <PullToRefresh>
        <section className="pt-16" />
        <SearchInput
          placeholder="당신이 생각한 '그 밈' 검색하기"
          onClick={() => {
            router.push("/search");
          }}
        />
        <Suspense>
          <PopularTagList />
        </Suspense>
        {isLogin && <UserSharedMemeList name={user?.name} />}
        <MemeContext />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
