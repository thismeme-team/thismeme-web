import type { NextPage } from "next";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeListContainer, UserSharedMemeList } from "@/components/home";
import { SkeletonMeme } from "@/components/home/Skeleton";

const HomePage: NextPage = () => {
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
