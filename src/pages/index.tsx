import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeList, PopularTagList, SharedMemeList } from "@/components/home";
import { MemeSortDropDown } from "@/components/home/DropDown";
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
        <SSRSuspense fallback={<div className="h-84" />}>
          <PopularTagList />
        </SSRSuspense>
        {isLogin && <SharedMemeList name={user?.name} />}
        <MemeSortDropDown />
        <SSRSuspense>
          <MemeList />
        </SSRSuspense>
      </PullToRefresh>
    </>
  );
};

export default HomePage;
