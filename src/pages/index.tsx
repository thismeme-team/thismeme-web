import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useAuth } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
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
      <section className="pt-16" />
      <SearchInput
        placeholder="당신이 찾는 밈 여기 있다."
        onClick={() => {
          router.push("/search");
        }}
      />
      <Suspense>
        <PopularTagList />
      </Suspense>
      {isLogin && <SharedMemeList name={user?.name} />}
      <MemeSortDropDown />
      <Suspense>
        <MemeList />
      </Suspense>
    </>
  );
};

export default HomePage;
