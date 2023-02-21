import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeListContainer, PopularTagList, UserSharedMemeList } from "@/components/home";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLogin, user } = useAuth();

  return (
    <>
      <NextSeo description={DEFAULT_DESCRIPTION} title={TITLE.home} />
      <IntroPageNavigation />
      <PullToRefresh>
        <section className="pt-8" />
        <SearchInput
          inputMode="none"
          placeholder="당신이 생각한 '그 밈' 검색하기"
          onClick={() => {
            router.push("/search");
          }}
        />
        <SSRSuspense fallback={<div className="h-84" />}>
          <PopularTagList />
        </SSRSuspense>
        {isLogin && (
          <SSRSuspense>
            <UserSharedMemeList name={user?.name} sharedId={user?.shareCollectionId} />
          </SSRSuspense>
        )}
        <MemeListContainer />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
