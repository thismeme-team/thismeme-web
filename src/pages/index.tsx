import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeListContainer, UserSharedMemeList } from "@/components/home";
import { SkeletonMeme } from "@/components/home/Skeleton";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLoading, isLogin, user } = useAuth();

  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        openGraph={{ imageUrl: "/open-graph/home.png" }}
        title={TITLE.default}
      />
      <IntroPageNavigation />
      <PullToRefresh>
        <section className="pt-8" />
        <section className="flex gap-7">
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
              <Icon color="primary" name="chevronDown" />
            </span>
          </button>
        </section>
        {isLogin && (
          <>
            <SSRSuspense fallback={<SkeletonMeme />}>
              <UserSharedMemeList name={user?.name} sharedId={user?.sharedCollectionId} />
              <MemeListContainer />
            </SSRSuspense>
          </>
        )}
        {!isLogin && !isLoading && <MemeListContainer />}
      </PullToRefresh>
    </>
  );
};

export default HomePage;
